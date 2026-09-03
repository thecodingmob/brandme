import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield, Layout, Server, Palette, Layers, Star, CheckCircle, ChartBarIcon, MessageSquare } from 'lucide-react';
import StatsCounter from '@/components/StatsCounter';
import PricingCalculator from '@/components/PricingCalculator';
import PortfolioGallery from '@/components/PortfolioGallery';
import TestimonialsPage from '@/components/TestimonialsPage';
import logo from '@/public/images/logo/brandme-favicon-64.png';
import Image from 'next/image';
import React from 'react';

export default function HomePage() {
  const WORKFLOW_STEPS = [
    {
      stepNumber: '01',
      title: 'Affordable, Fixed Pricing',
      titleColor: 'var(--flame)',
      description:
        'Starting at $150 setup + small monthly fee. No agency markups, no hidden charges. SME-friendly pricing that scales seamlessly with your growth.',
    },
    {
      stepNumber: '02',
      title: 'Done-For-You Service',
      titleColor: 'var(--gold)',
      description:
        'Simply fill out a 5-minute intake brief. Our expert engineering team builds your entire website, organizes copy, and designs high-quality visuals.',
    },
    {
      stepNumber: '03',
      title: '7-Day Guaranteed Launch',
      titleColor: 'var(--flame)',
      description:
        'While traditional agencies take months, BrandME delivers your live website in 7 days, giving your business immediate online credibility and sales momentum.',
    },
  ];
  return (
    <>
      {/* HERO SECTION  IS HERE*/}
      <section className="hero-section">
        {/* Background Glowing Ambient Orbs */}
        <div className="shape hero-glow-1"></div>
        <div className="hero-glow-2"></div>

        {/* Decorative Floating Geometric Shapes */}
        <div className="hero-shape-ring"></div>
        <div className="hero-shape-square"></div>

        {/* Floating Glassmorphic Badges */}
        <div className="hero-floating-card card-left">
          <MessageSquare size={16} color="var(--gold)" />
          <span>Expert support whenever you need it</span>
        </div>

        <div className="hero-floating-card card-right">
          <CheckCircle size={16} color="#ff4d1c" />
          <span>Quality design and fast delivery</span>
        </div>

        <div className="container hero-container">
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span className="badge">
              <Image src={logo} alt="logo" width={20} height={20} />            </span>
          </div>

          <h1 className="hero-title">
            YOUR <span className="title">BRAND</span>,<br />
            YOUR WEB.
          </h1>

          <p className="hero-subtitle">
            A done-for-you web design platform built for SMEs, businesses, and emerging brands who deserve a high-converting, professional online presence without high agency costs.
          </p>

          <div className="hero-ctas">
            <Link href="/contact" className="btn-primary">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link href="#portfolio" className="btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION IS HERE */}
      <section id="services" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              What We <span className="gradient-text-flame">Offer</span>
            </h2>
            <p className="section-desc">
              Everything your business needs to launch, grow, and convert visitors online.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-card">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 77, 28, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  color: 'var(--flame)',
                }}
              >
                <Layout size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-main)' }}>
                Web Design & Development
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                We design and develop clean, ultra-fast, and responsive websites tailored specifically to your brand identity and target audience. Delivered in 7 days or less.
              </p>
            </div>

            <div className="glass-card">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 184, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  color: 'var(--gold)',
                }}
              >
                <Server size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-main)' }}>
                Rapid Deployment
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Instant deployment on high-availability global cloud infrastructure with free SSL encryption, fast CDN caching, and custom domain configuration.
              </p>
            </div>

            <div className="glass-card">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 77, 28, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  color: 'var(--flame)',
                }}
              >
                <Palette size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-main)' }}>
                Product & Brand Design
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                We elevate your brand visuals with cohesive typography, modern color themes, logo optimization, and high-impact digital assets.
              </p>
            </div>

            <div className="glass-card">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 184, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  color: 'var(--gold)',
                }}
              >
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-main)' }}>
                Monthly Hosting & Care
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                After launch, stay stress-free. We handle ongoing hosting, daily backups, continuous edit requests, and security maintenance for a small flat monthly fee.
              </p>
            </div>

            <div className="glass-card">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 77, 28, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  color: 'var(--flame)',
                }}
              >
                <Layers size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-main)' }}>
                SEO & Performance Tuning
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Built-in search engine optimization, fast load speeds, meta tag structures, and mobile responsiveness to maximize Google search rankings.
              </p>
            </div>

            <div className="glass-card">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 184, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  color: 'var(--gold)',
                }}
              >
                <MessageSquare size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-main)' }}>
                Direct Customer Intake
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Integrated lead generation forms, direct WhatsApp chat widgets, and booking scheduling links that convert visitors directly into paying clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS IS HERE */}
      <section style={{ padding: '6rem 0', background: 'rgba(255, 255, 255, 0.015)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            How <span className="gradient-text-gold">BrandME</span> Works
          </h2>
          <p className="section-desc">
            Zero coding or technical knowledge required from you. We do 100% of the heavy lifting.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {WORKFLOW_STEPS.map((step, index) => {
            const stepNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={stepNumber}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2rem',
                }}
              >
                {/* Header row: Title on the left, number on the right without overlapping */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: step.titleColor,
                      lineHeight: '1.3',
                      margin: 0,
                    }}
                  >
                    {step.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: '800',
                      color: 'rgba(255, 255, 255, 0.15)',
                      lineHeight: '1',
                      userSelect: 'none',
                    }}
                  >
                    {stepNumber}
                  </span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

      {/* STATS SECTION */}
      <StatsCounter />

      {/* PRICING SECTION */}
      <PricingCalculator />

      {/* PORTFOLIO SECTION */}
      <PortfolioGallery />

      {/* Testimonial SECTION */}
      <TestimonialsPage />



      {/* CTA BANNER */}
      <section style={{ padding: '4rem 0 6rem' }}>
        <div className="container">
          <div
            className="glass-card"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 77, 28, 0.15) 0%, rgba(255, 184, 0, 0.1) 100%)',
              border: '1px solid rgba(255, 77, 28, 0.3)',
              textAlign: 'center',
              padding: '4rem 2rem',
            }}
          >
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: '700', marginBottom: '1rem' }}>
              Ready to go live in <span className="gradient-text-gold">7 Days</span>?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Tell us about your business and we will build a powerful website you will be proud to share with the world.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">
                Start Your Project <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/2349169370962?text=Hi%20I%20need%20a%20Website"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-whatsapp"
              >
                <MessageSquare size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
