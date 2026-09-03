'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How long does it take to deliver a full website?',
    answer: 'We deliver all standard website packages in 7 days or less from the date you complete our intake brief. Express 3-day delivery is also available as an add-on.',
  },
  {
    question: 'How much does BrandME cost?',
    answer: 'Packages start at $150 one-time setup + $20/month ongoing hosting & maintenance. We have zero hidden fees or agency markups.',
  },
  {
    question: 'Do I need technical skills or coding knowledge?',
    answer: 'None at all! BrandME is a done-for-you service. You simply answer a quick brief about your business, and our expert engineering team builds and deploys everything for you.',
  },
  {
    question: 'What is included in the monthly maintenance fee?',
    answer: 'Monthly maintenance covers high-performance cloud hosting, security SSL certificates, domain management, regular software updates, and ongoing edit requests so your site never breaks.',
  },
  {
    question: 'Can I request edits or revisions during the build?',
    answer: 'Yes! All plans come with revision rounds to ensure you are 100% satisfied with the outcome before final launch.',
  },
];

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <HelpCircle size={22} color="var(--gold)" />
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Frequently Asked Questions</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="glass-card"
              style={{ padding: '1.25rem 1.5rem', cursor: 'pointer' }}
              onClick={() => toggleFaq(idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: isOpen ? 'var(--gold)' : 'var(--text-main)' }}>
                  {faq.question}
                </h4>
                <div
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    color: isOpen ? 'var(--gold)' : 'var(--text-muted)',
                  }}
                >
                  <ChevronDown size={20} />
                </div>
              </div>

              {isOpen && (
                <p style={{ marginTop: '0.8rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem' }}>
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
