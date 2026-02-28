import { useState, type FormEvent } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Client-side validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMsg('ALL FIELDS ARE REQUIRED.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('INVALID EMAIL FORMAT.');
      return;
    }

    if (!formspreeId || formspreeId === 'your_form_id_here') {
      setStatus('error');
      setErrorMsg('CONTACT FORM NOT CONFIGURED. SET VITE_FORMSPREE_ID IN .env.local');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

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
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMsg(data?.errors?.[0]?.message?.toUpperCase() || 'TRANSMISSION FAILED. TRY AGAIN.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('NETWORK ERROR. CHECK YOUR CONNECTION.');
    }
  }

  return (
    <section id="contact">
      <div className="contact-glow" />
      <div className="section-header">
        <span className="section-num">05</span>
        <h2 className="section-title">OPEN A CHANNEL</h2>
        <div className="section-line" />
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          <h3>
            JACK IN &amp;<br />
            LET'S BUILD.
          </h3>
          <p>
            Got a high-risk gig? An AI system that needs cracking, building, or
            bulletproofing? Drop me a ping. I work with corps, startups, and the
            occasional rogue AI collective.
          </p>
          <div className="contact-links">
            <a href="mailto:viktor@nightcity.net" className="contact-link">
              <span className="contact-link-icon">{'\u2709'}</span>
              <span className="contact-link-text">viktor@nightcity.net</span>
              <span className="contact-link-label">EMAIL</span>
            </a>
            <a href="#" className="contact-link">
              <span className="contact-link-icon">{'\u25C8'}</span>
              <span className="contact-link-text">github.com/viktorex</span>
              <span className="contact-link-label">GITHUB</span>
            </a>
            <a href="#" className="contact-link">
              <span className="contact-link-icon">{'\u25C9'}</span>
              <span className="contact-link-text">linkedin.com/in/viktorex</span>
              <span className="contact-link-label">LINKEDIN</span>
            </a>
            <a href="#" className="contact-link">
              <span className="contact-link-icon">{'\u25C6'}</span>
              <span className="contact-link-text">@viktor_ex</span>
              <span className="contact-link-label">TWITTER/X</span>
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">// YOUR HANDLE</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Street name or corp alias..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>
          <div className="form-group">
            <label className="form-label">// ENCRYPTED CHANNEL</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="secure@channel.net"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>
          <div className="form-group">
            <label className="form-label">// MISSION BRIEF</label>
            <textarea
              name="message"
              className="form-textarea"
              placeholder="Describe the gig. No job too strange..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>

          {status === 'error' && (
            <div className="form-status form-status-error">
              <span>[ERROR]</span> {errorMsg}
            </div>
          )}

          {status === 'success' && (
            <div className="form-status form-status-success">
              <span>[OK]</span> MESSAGE TRANSMITTED SUCCESSFULLY. I'LL RESPOND WITHIN 24H.
            </div>
          )}

          <button
            type="submit"
            className="form-btn"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
          </button>
        </form>
      </div>
    </section>
  );
}
