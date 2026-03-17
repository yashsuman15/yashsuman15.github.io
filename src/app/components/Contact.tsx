import { useState, type FormEvent } from 'react';
import { CONTACT_LINKS } from '@/data/contact';
import { trackForm, trackClick } from '@/lib/analytics';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const formspreeId = 'xaqdkzwe';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Client-side validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMsg('All fields are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');
    trackForm('submitted', 'contact');

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        trackForm('success', 'contact');
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMsg(data?.errors?.[0]?.message || 'Failed to send message. Please try again.');
        trackForm('error', 'contact', { error: data?.errors?.[0]?.message });
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection.');
      trackForm('error', 'contact', { error: 'network_error' });
    }
  }

  return (
    <section id="contact" className="section section-alt">
      <div className="section-header">
        <h2>Get in Touch</h2>
        <p className="section-sub">Have a project in mind? Let's talk.</p>
      </div>

      <div className="contact-grid">
        {/* Contact Info */}
        <div className="contact-info">
          <h3>Let's build something together.</h3>
          <p>
            Whether you need computer vision pipelines, LLM-powered agents, RAG systems,
            or end-to-end AI infrastructure — I'm ready to help bring your ideas to life.
          </p>
          <div className="contact-links">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="contact-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick(`contact_${link.label.toLowerCase()}`)}
              >
                <span className="contact-link-icon">{link.icon}</span>
                <span className="contact-link-text">{link.displayText}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className="form-textarea"
              placeholder="Tell me about your project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>

          {status === 'error' && (
            <div className="form-status form-status-error">
              {errorMsg}
            </div>
          )}

          {status === 'success' && (
            <div className="form-status form-status-success">
              Message sent successfully! I'll get back to you within 24 hours.
            </div>
          )}

          <button
            type="submit"
            className="btn-primary form-btn"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
