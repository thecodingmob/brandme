'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Star, Sparkles, ArrowRight, Calculator, ArrowLeftCircleIcon } from 'lucide-react';

export default function PricingCalculator() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Custom Quote State
  const [pages, setPages] = useState<number>(5);
  const [hasEcommerce, setHasEcommerce] = useState<boolean>(false);
  const [hasBooking, setHasBooking] = useState<boolean>(false);
  const [expressDelivery, setExpressDelivery] = useState<boolean>(false);

  // Dynamic Price Calculation
  const calculateCustomPrice = () => {
    let baseSetup = 150 + (pages - 4) * 25;
    let baseMonthly = 20 + Math.floor((pages - 4) / 3) * 5;

    if (hasEcommerce) {
      baseSetup += 150;
      baseMonthly += 15;
    }
    if (hasBooking) {
      baseSetup += 50;
      baseMonthly += 5;
    }
    if (expressDelivery) {
      baseSetup += 100;
    }

    if (billingCycle === 'annual') {
      baseMonthly = Math.round(baseMonthly * 0.85); // 15% off
    }

    return { setup: Math.max(150, baseSetup), monthly: Math.max(20, baseMonthly) };
  };

  const customEstimate = calculateCustomPrice();

  const getMonthlyRate = (rate: number) => {
    return billingCycle === 'annual' ? Math.round(rate * 0.85) : rate;
  };

  return (
    <section id="pricing" style={{ padding: '6rem 0' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Simple, Affordable <span className="gradient-text-flame">Pricing</span>
          </h2>
          <p className="section-desc">
            No hidden setup fees. Pick a package or customize a plan built specifically for your brand.
          </p>

          {/* Billing Toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'black',
              padding: '0.35rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              marginTop: '2rem',
              gap: '0.5rem',
            }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                background: billingCycle === 'monthly' ? 'var(--flame)' : 'transparent',
                color: billingCycle === 'monthly' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}
            >
              Monthly Hosting
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                background: billingCycle === 'annual' ? 'var(--gold)' : 'transparent',
                color: billingCycle === 'annual' ? '#08090d' : 'var(--text-muted)',
                fontWeight: '700',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              Annual Hosting <span style={{ fontSize: '0.75rem', background: '#08090d', color: '#ffb800', padding: '0.1rem 0.4rem', borderRadius: '10px' }}>15% OFF</span>
            </button>
          </div>
        </div>

{/* Pricing Cards Grid */}
<div
  className="pricing-grid"
>
  {/* CARD 1 */}
  <div className="pricing-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div>
      <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
        STARTER
      </span>
      <div style={{ margin: '1rem 0 1.5rem' }}>
        <span style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-main)' }}>$150</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}> + ${getMonthlyRate(20)}/mo hosting</span>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> 4-Page Custom Website
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> Mobile Responsive Design
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> Contact Form Integration
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> Guaranteed 7-Day Delivery
        </li>
      </ul>
    </div>
    <Link href="/contact?plan=Starter" className="admin-btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
      Get Started
    </Link>
  </div>

  {/* CARD 2 - GROWTH */}
  <div
    className="pricing-card growth-plan"
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
    }}
  >
    <div style={{ position: 'absolute', top: '12px', right: '16px' }}>
      <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
        RECOMMENDED
      </span>
    </div>
    <div>
      <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--gold)' }}>
        GROWTH
      </span>
      <div style={{ margin: '1rem 0 1.5rem' }}>
        <span style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-main)' }}>$300</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}> + ${getMonthlyRate(35)}/mo hosting</span>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)' }}>
          <Check size={18} color="var(--gold)" /> 7-Page Custom Website
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)' }}>
          <Check size={18} color="var(--gold)" /> Advanced SEO Optimization
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)' }}>
          <Check size={18} color="var(--gold)" /> Booking & Scheduling Setup
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)' }}>
          <Check size={18} color="var(--gold)" /> Contact Form + WhatsApp Button
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)' }}>
          <Check size={18} color="var(--gold)" /> 2 Iterative Revision Rounds
        </li>
      </ul>
    </div>
    <Link
      href="/contact?plan=Growth"
      className="growth-btn-primary"
      style={{
        width: '100%',
        background: 'linear-gradient(135deg, var(--gold) 0%, #d49500 100%)',
        color: '#08090d',
        fontWeight: '700',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
      }}
    >
      Select Growth Plan <ArrowRight size={16} />
    </Link>
  </div>

  {/* CARD 3 - PRO */}
  <div className="pricing-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div>
      <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
        PRO
      </span>
      <div style={{ margin: '1rem 0 1.5rem' }}>
        <span style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-main)' }}>$600</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}> + ${getMonthlyRate(60)}/mo hosting</span>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> Unlimited Custom Pages
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> E-commerce & Payments Ready
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> Priority 24/7 Support
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> Unlimited Edits & Updates
        </li>
      </ul>
    </div>
    <Link href="/contact?plan=Pro" className="admin-btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
      Select Pro Plan
    </Link>
  </div>

  {/* CARD 4 - ENTERPRISE (Wraps to Row 2 automatically) */}
  <div className="pricing-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div>
      <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
        ENTERPRISE
      </span>
      <div style={{ margin: '1rem 0 1.5rem' }}>
        <span style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-main)' }}>Custom</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}> Tailored plan</span>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> Multi-location Architecture
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> Custom API & Backend Integration
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> Dedicated Account Manager
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
          <Check size={18} color="var(--flame)" /> White-label Agency Option
        </li>
      </ul>
    </div>
    <Link href="/contact?plan=Enterprise" className="admin-btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
      Contact Sales
    </Link>
  </div>
</div>
        {/* Interactive Custom Quote Calculator */}
        <div
          className="glass-card"
          style={{
            background: '#111111',
            border: '1px solid rgba(255, 77, 28, 0.3)',
            padding: '2.5rem 2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Calculator size={24} color="var(--flame)" />
            <h3 style={{ fontSize: '1.6rem', fontWeight: '700' }}>
              Interactive <span className="gradient-text-flame">Quote Builder</span>
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            {/* Options Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  Number of Pages: <span style={{ color: 'var(--flame)', fontWeight: '700' }}>{pages} Pages</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="20"
                  value={pages}
                  onChange={(e) => setPages(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: 'var(--flame)',
                    cursor: 'pointer',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={hasEcommerce}
                    onChange={(e) => setHasEcommerce(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--flame)' }}
                  />
                  <span>E-Commerce / Online Store (+ $150 upfront, + $15/mo)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={hasBooking}
                    onChange={(e) => setHasBooking(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--flame)' }}
                  />
                  <span>Booking & Appointment Calendar (+ $50 upfront, + $5/mo)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={expressDelivery}
                    onChange={(e) => setExpressDelivery(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--gold)' }}
                  />
                  <span style={{ color: 'var(--gold)', fontWeight: '600' }}>Express 3-Day Delivery (+ $100 upfront)</span>
                </label>
              </div>
            </div>

            {/* Price Output */}
            <div
              style={{
                background: 'var(--bg-dark)',
                padding: '2rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                textAlign: 'center',
              }}
            >
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Estimated Instant Quote</p>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  ${customEstimate.setup}
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--flame)', fontWeight: '600' }}> upfront</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                + <strong style={{ color: 'var(--gold)' }}>${customEstimate.monthly}/mo</strong> hosting & ongoing updates
              </p>
              <Link
                href={`/contact?customQuote=true&pages=${pages}&setup=${customEstimate.setup}&monthly=${customEstimate.monthly}`}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Claim This Quote Now <ArrowLeftCircleIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
