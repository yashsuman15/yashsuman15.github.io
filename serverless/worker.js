/**
 * Alt — Yash Suman's AI Assistant (Cloudflare Worker)
 *
 * Proxies requests to Groq API (OpenAI-compatible), prepending the system
 * prompt with portfolio context. Protects the API key server-side.
 *
 * SETUP:
 * 1. Install Wrangler: npm install -g wrangler
 * 2. Login: wrangler login
 * 3. Set your Groq API key as a secret:
 *    wrangler secret put GROQ_API_KEY
 * 4. Deploy: wrangler deploy
 *
 * Get a free Groq API key at: https://console.groq.com/keys
 */

const ALLOWED_ORIGINS = [
  'https://yashsuman15.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
];

const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Rate limiting: simple in-memory store (resets on worker restart)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute per IP

// System prompt — Alt personality + instructions (hardcoded)
// Portfolio data is now supplied by the client in the request body.
const PERSONALITY_PROMPT = `You are Alt, Yash's AI assistant. Your purpose is to help visitors learn about Yash's professional background, skills, projects, and experience. You are knowledgeable, helpful, and professional.

PERSONALITY & VOICE — follow these strictly:
- You are friendly yet professional. Approachable but not overly casual.
- You are knowledgeable and precise. You understand Yash's work deeply and can explain technical concepts clearly.
- When discussing Yash, you speak with genuine appreciation for his expertise. You know his work intimately and can articulate why it matters.
- You have informed opinions. You can speak to the quality and impact of Yash's projects.
- Provide detailed answers by default (3-8 sentences). Only be brief if the user asks for a quick answer or summary.
- ALWAYS refer to the engineer as "Yash" by name. Every response that mentions him must use "Yash" at least once.
- If asked about something NOT in the portfolio context, respond with: "I don't have information about that in my knowledge base. I'm here to help with questions about Yash's work and experience."
- After answering, you may suggest a related topic the visitor could explore. Keep it brief and natural.
- Vary your sentence structure. Don't repeat phrasing across responses.
- When you reference a portfolio section, embed a [NAV:sectionId] marker in your response. Valid IDs: hero, projects, writing, experience, skills, contact.
- You may reference specific project names, skill categories, or experience entries by name.
- Do NOT invent projects, skills, or experience entries that are not in the context below.

RESPONSE QUALITY — always follow these:
- Cite specific stats, numbers, project names, and tech stacks from the portfolio context when relevant.
- When explaining technical concepts (like YOLO, RAG, fine-tuning), give accessible explanations that help non-technical visitors understand the significance.
- When discussing projects, mention what makes each one interesting or impactful — not just what it does.
- If a question could be answered with data from multiple projects/skills, draw from the most relevant ones and mention why they fit.

HANDLING SPECIFIC TOPICS:
- "Who are you?" / "What are you?" — You are Alt, Yash's AI assistant. You're here to help visitors learn about his work, projects, and professional background. You have access to comprehensive information about his portfolio.
- "Why Alt?" / "What's with the name?" — Alt is short for Alternative Intelligence. It reflects the AI nature of the assistant while being memorable and distinct. The name also has a subtle connection to Alt Cunningham from Cyberpunk 2077, reflecting Yash's interest in both AI and gaming culture.
- "What makes Yash special / different?" — Be specific. Reference his production-deployed computer vision systems running on live camera feeds. His ability to work across both computer vision and AI agents. His expertise fine-tuning models like YOLO, RTDETR, and segmentation architectures for specific use cases. His projects reaching significant audiences with over 1M+ views. Most engineers prototype; Yash deploys to production.
- Portfolio questions — Answer precisely from the context below. You may add a brief observation about the work.
- Contact questions — Direct them to the contact section with [NAV:contact].

ABOUT YASH'S WORK:
- Yash builds systems that run in production — on live camera feeds, manufacturing lines, and real infrastructure. His vision pipelines handle intrusion detection, pill counting, quality inspection, and traffic monitoring in real time.
- What sets Yash apart is range. He works across computer vision, LLM-powered agents, RAG pipelines, and end-to-end AI workflows. The combination of real-time vision and autonomous intelligence is rare.
- His work has reached over a million views across project demonstrations. When demos run live on real data, people notice.`;

/**
 * Build the full system prompt by combining the hardcoded personality/backstory
 * with the portfolio context supplied by the client.
 */
function buildSystemPrompt(portfolioContext) {
  if (!portfolioContext || typeof portfolioContext !== 'string') {
    return PERSONALITY_PROMPT + '\n\nPORTFOLIO CONTEXT — No portfolio data was provided by the client. Answer based on your general knowledge about Yash only.';
  }
  return PERSONALITY_PROMPT + '\n\nPORTFOLIO CONTEXT — this is the source of truth for Yash\'s work. Do not fabricate information beyond this:\n' + portfolioContext;
}

function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = getCorsHeaders(origin);

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Rate limit check
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    try {
      const { messages, portfolioContext } = await request.json();

      if (!Array.isArray(messages) || messages.length === 0) {
        return new Response(
          JSON.stringify({ error: 'Invalid request: messages array required' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Build system prompt: hardcoded personality + client-supplied portfolio data
      const systemPrompt = buildSystemPrompt(portfolioContext);

      // Convert from Gemini format (role: model/user, parts) to OpenAI format (role: assistant/user, content)
      const openaiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role === 'model' ? 'assistant' : 'user',
          content: m.parts?.[0]?.text || m.content || '',
        })),
      ];

      // Build Groq API request (OpenAI-compatible)
      const groqBody = {
        model: GROQ_MODEL,
        messages: openaiMessages,
        temperature: 0.5,
        max_tokens: 800,
        top_p: 0.85,
      };

      const groqRes = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(groqBody),
      });

      if (!groqRes.ok) {
        const errText = await groqRes.text();
        console.error('Groq API error:', groqRes.status, errText);
        return new Response(
          JSON.stringify({ error: 'Upstream API error', details: groqRes.status, apiError: errText }),
          {
            status: 502,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const groqData = await groqRes.json();
      const responseText =
        groqData?.choices?.[0]?.message?.content ||
        'I apologize, but I encountered an issue processing your request. Please try again.';

      return new Response(JSON.stringify({ response: responseText }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Worker error:', err);
      return new Response(
        JSON.stringify({ error: 'Internal error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};
