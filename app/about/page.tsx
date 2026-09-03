import Link from 'next/link';
import { Sparkles, Check, X, ArrowRight, Target, HeartHandshake, ShieldCheck } from 'lucide-react';
import StatsCounter from '@/components/StatsCounter';

export default function AboutPage() {
  return (
    <>
      <section className="about-hero" style={{ padding: '4rem 0 2rem', textAlign: 'center' }}>
        <div className="wrapper" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
            Learn More About Brand<span className="title">ME</span>
          </h1>

          <div
            className="glass-card"
            style={{
              background: '#111111',
              border: '1px solid #262626',
              padding: '2.5rem',
              textAlign: 'left',
              marginBottom: '2rem',
            }}
          >
            <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--cream)', opacity: '0.95' }}>
              We at BrandME build fast, clean and professional websites in 7 days or less. We specialize in creating websites that speak a thousand words about our clients&apos; brands or businesses and also deliver within 7 days at prices that can be well afforded. We have a vision to help small brands and businesses escape the flaws of freelancers, web agencies, and DIY tools. We are always available for your service 24/7.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/#pricing" className="btn" style={{ padding: '0.9rem 2rem' }}>
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE VALUES / FEATURE CARDS */}
      <section style={{ padding: '3rem 0' }}>
        <div className="wrapper">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="glass-card" style={{ background: '#111111', border: '1px solid #262626', padding: '2rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  background: 'rgba(255, 77, 28, 0.15)',
                  color: 'var(--flame)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Target size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.6rem' }}>The Problem We Solve</h3>
              <p style={{ color: 'var(--mist)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Most small business owners get stuck choosing between expensive traditional agencies charging thousands of dollars, unreliable freelancers who drag timelines for months, or overwhelming DIY website builders.
              </p>
            </div>

            <div className="glass-card" style={{ background: '#111111', border: '1px solid #262626', padding: '2rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  background: 'rgba(255, 184, 0, 0.15)',
                  color: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <HeartHandshake size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.6rem' }}>The BrandME Promise</h3>
              <p style={{ color: 'var(--mist)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                We provide a completely done-for-you service. Submit your business info via a brief, and within 7 days, we deliver a polished, high-converting website ready to accept client inquiries and generate sales.
              </p>
            </div>

            <div className="glass-card" style={{ background: '#111111', border: '1px solid #262626', padding: '2rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  background: 'rgba(255, 77, 28, 0.15)',
                  color: 'var(--flame)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.6rem' }}>Long-Term Peace of Mind</h3>
              <p style={{ color: 'var(--mist)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Launching your site is just the beginning. Our ongoing monthly hosting and maintenance plan keeps your website secure, updated, and continuously optimized while you focus on growing your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON MATRIX */}
      <section style={{ padding: '4rem 0' }}>
        <div className="wrapper">
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <h2>
              Why Choose <span className="gold">BrandME</span>?
            </h2>
            <p style={{ color: 'var(--mist)', marginTop: '0.4rem' }}>See how we compare against traditional options in the market.</p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '600px',
                background: '#111111',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #262626',
              }}
            >
              <thead>
                <tr style={{ background: '#1a1a1a', borderBottom: '1px solid #333333' }}>
                  <th style={{ padding: '1.2rem', textAlign: 'left', fontSize: '1rem', fontWeight: '700' }}>Feature</th>
                  <th style={{ padding: '1.2rem', textAlign: 'center', fontSize: '1rem', fontWeight: '700', color: 'var(--flame)' }}>BrandME</th>
                  <th style={{ padding: '1.2rem', textAlign: 'center', fontSize: '1rem', fontWeight: '600', color: 'var(--mist)' }}>Freelancers</th>
                  <th style={{ padding: '1.2rem', textAlign: 'center', fontSize: '1rem', fontWeight: '600', color: 'var(--mist)' }}>Web Agencies</th>
                  <th style={{ padding: '1.2rem', textAlign: 'center', fontSize: '1rem', fontWeight: '600', color: 'var(--mist)' }}>DIY Site Builders</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ padding: '1rem 1.2rem', fontWeight: '600' }}>Turnaround Time</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: 'var(--gold)', fontWeight: '700' }}>7 Days Guaranteed</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: 'var(--mist)' }}>3 to 8 Weeks</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: 'var(--mist)' }}>2 to 4 Months</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: 'var(--mist)' }}>Requires hours of DIY work</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ padding: '1rem 1.2rem', fontWeight: '600' }}>Upfront Price</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: 'var(--gold)', fontWeight: '700' }}>Starting $150</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: 'var(--mist)' }}>$500 - $2,000</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: 'var(--mist)' }}>$3,000 - $10,000+</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: 'var(--mist)' }}>$20 - $50/mo subscription</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ padding: '1rem 1.2rem', fontWeight: '600' }}>Technical Skills Needed</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold)', fontWeight: '700' }}>
                      Zero Skills Required
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: 'var(--mist)' }}>None</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: 'var(--mist)' }}>None</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: '#ef4444' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <X size={18} /> High Learning Curve
                    </span>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #222222' }}>
                  <td style={{ padding: '1rem 1.2rem', fontWeight: '600' }}>Ongoing Maintenance & Edits</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold)', fontWeight: '700' }}>
                     Done-For-You Monthly
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: '#ef4444' }}>Uncertain availability</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: 'var(--mist)' }}>Expensive retainer fees</td>
                  <td style={{ padding: '1rem 1.2rem', textAlign: 'center', color: '#ef4444' }}>DIY Edits yourself</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <StatsCounter />
    </>
  );
}
