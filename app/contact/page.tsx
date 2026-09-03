'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MessageSquare, Mail, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import FaqAccordion from '@/components/FaqAccordion';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string>('Growth');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [useGoogleForm, setUseGoogleForm] = useState(false);

  useEffect(() => {
    const plan = searchParams.get('plan');
    if (plan) {
      setSelectedPlan(plan);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && phone) {
      setSubmitted(true);
      const text = encodeURIComponent(
        `Hi BrandME! I'd like to start a project.\nName: ${name}\nBusiness: ${businessName}\nPlan: ${selectedPlan}\nPhone: ${phone}\nEmail: ${email}\nNotes: ${message}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/2349169370962?text=${text}`, '_blank');
      }, 1200);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)' }}>
            Project Intake Form
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Takes less than 3 minutes to submit.</p>
        </div>
        <button
          onClick={() => setUseGoogleForm(!useGoogleForm)}
          style={{
            fontSize: '0.8rem',
            color: 'var(--gold)',
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {useGoogleForm ? 'Use Interactive Form' : 'Use Google Form'}
        </button>
      </div>

      {submitted ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            background: 'rgba(34, 197, 94, 0.05)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
          }}
        >
          <CheckCircle2 size={48} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
          <h4 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Brief Submitted Successfully!
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Redirecting you to WhatsApp to confirm your project brief with our design lead...
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
            Submit Another Inquiry
          </button>
        </div>
      ) : useGoogleForm ? (
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSciWKynTlFoTq9rDPHD7LN9vEl2Fn1aQjgi77UhcsGnLtRh5Q/viewform?embedded=true"
          width="100%"
          height="550"
          style={{ border: 'none', borderRadius: 'var(--radius-md)' }}
        >
          Loading intake form…
        </iframe>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-dark)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+234..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Business / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Okeme Solar"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Preferred Package
              </label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  outline: 'none',
                }}
              >
                <option value="Starter">Starter ($150)</option>
                <option value="Growth">Growth ($300 - Recommended)</option>
                <option value="Pro">Pro ($600)</option>
                <option value="Enterprise">Enterprise (Custom)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
              Tell us about your project or business goals
            </label>
            <textarea
              rows={4}
              placeholder="Describe what services you offer, pages you need, or special features..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-dark)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '0.9rem', width: '100%' }}>
            Submit Brief & Chat <Send size={16} />
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="hero-section" style={{ padding: '5rem 0 3rem' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
            Let&apos;s Talk
          </span>
          <h1 className="hero-title">
            Start Your Project <span className="gradient-text-gold">Today</span>
          </h1>
          <p className="hero-subtitle">
            Fill out the quick intake form below or reach out to us directly via WhatsApp. We respond within 24 hours!
          </p>
        </div>
      </section>

      <section style={{ padding: '2rem 0 6rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
            {/* Left: Contact Form wrapped in Suspense */}
            <Suspense fallback={<div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>Loading form...</div>}>
              <ContactFormInner />
            </Suspense>

            {/* Right: Direct Reach Out */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(37, 211, 102, 0.1)',
                    color: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem' }}>WhatsApp Direct</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.6rem' }}>
                    Chat directly with our team for instant replies.
                  </p>
                  <a
                    href="https://wa.me/2349169370962?text=Hi%20i%20want%20to%20get%20a%20website"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#25D366', fontWeight: '700', fontSize: '1.05rem' }}
                  >
                    +234 916 937 0962
                  </a>
                </div>
              </div>

              <div className="glass-card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(255, 77, 28, 0.1)',
                    color: 'var(--flame)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem' }}>Email Us</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.6rem' }}>
                    Send us your project specifications or questions.
                  </p>
                  <a href="mailto:brandmenigeria01@gmail.com" style={{ color: 'var(--flame)', fontWeight: '700', fontSize: '1.05rem' }}>
                    brandmenigeria01@gmail.com
                  </a>
                </div>
              </div>

              <div className="glass-card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(255, 184, 0, 0.1)',
                    color: 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem' }}>Guaranteed Turnaround</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Intake brief review within 24 hours. Full website launch in 7 calendar days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
