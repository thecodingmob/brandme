'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Github, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer style={{ background: 'rgba(5, 6, 9, 0.95)', borderTop: '1px solid var(--border-color)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          {/* Brand Info */}
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
              <Image
                src="/images/logo/brandme-logo.svg"
                alt="BrandME Logo"
                width={150}
                height={38}
                style={{ height: 'auto', width: 'auto' }}
              />
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              BrandME builds fast, clean, and professional done-for-you websites for SMEs and brands in 7 days or less.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href="https://x.com/brandme_nigeria"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'black',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-main)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://github.com/thecodingmob/brandme"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'black',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-main)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Github size={18} />
              </a>
              <a
                href="https://wa.me/2349169370962?text=Hi%20I%20need%20a%20Website"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'black',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25D366',
                  transition: 'all 0.2s ease',
                }}
              >
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li>
                <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  About BrandME
                </Link>
              </li>
              <li>
                <Link href="/#services" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Services Offered
                </Link>
              </li>
              <li>
                <Link href="/#pricing" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Pricing Packages
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Portfolio & Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              Direct Contact
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <li>
                WhatsApp:{' '}
                <a href="https://wa.me/2349169370962" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--flame)' }}>
                  +234 916 937 0962
                </a>
              </li>
              <li>
                Email:{' '}
                <a href="mailto:brandmenigeria01@gmail.com" style={{ color: 'var(--flame)' }}>
                  brandmenigeria01@gmail.com
                </a>
              </li>
              <li>Response Time: Within 24 hours</li>
              <li>Delivery Guarantee: 7 Days</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              Stay Updated
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
              Subscribe to get business growth tips and website design insights.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'black',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem', width: '100%' }}>
                {subscribed ? (
                  <>
                    <CheckCircle2 size={18} /> Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            color: 'var(--text-dim)',
            fontSize: '0.9rem',
          }}
        >
          <p>© {new Date().getFullYear()} BrandME Nigeria. All rights reserved.</p>
          <p>Your Brand. Your Web. Delivered in 7 Days.</p>
        </div>
      </div>
    </footer>
  );
}
