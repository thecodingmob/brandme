'use client';

import React, { useEffect, useState, JSX } from "react";
import { Globe, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent, MotionValue } from "framer-motion";

interface StatItem {
  icon: JSX.Element;
  prefix?: string;
  suffix?: string;
  isAnimated: boolean;
  motionValue?: MotionValue<number>;
  staticValue?: string;
  decimals?: number;
  label: string;
  subtext: string;
}

interface AnimatedNumberProps {
  value: MotionValue<number>;
  decimals?: number;
}

function AnimatedNumber({ value, decimals = 0 }: AnimatedNumberProps): JSX.Element {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useMotionValueEvent(value, "change", (latest: number) => {
    setDisplayValue(latest);
  });

  return <>{displayValue.toFixed(decimals)}</>;
}

export default function StatsCounter(): JSX.Element {

  const countSme = useMotionValue<number>(0);
  const countMarket = useMotionValue<number>(0);
  const countDays = useMotionValue<number>(0);
  const countSatisfaction = useMotionValue<number>(0);

  const roundSme = useTransform(countSme, (latest) => Math.round(latest));
  const roundMarket = useTransform(countMarket, (latest) => Math.round(latest));
  const roundDays = useTransform(countDays, (latest) => Math.round(latest));
  
  const roundSatisfaction = useTransform(countSatisfaction, (latest) => Math.round(latest * 10) / 10);

  useEffect(() => {
    const controls1 = animate(countSme, 3, { duration: 2.5, ease: "easeOut" });
    const controls2 = animate(countMarket, 150, { duration: 2.8, ease: "easeOut" });
    const controls3 = animate(countDays, 7, { duration: 2, ease: "easeOut" });
    const controls4 = animate(countSatisfaction, 99.8, { duration: 3, ease: "easeOut" });

    return () => {
      controls1.stop();
      controls2.stop();
      controls3.stop();
      controls4.stop();
    };
  }, [countSme, countMarket, countDays, countSatisfaction]);

  const stats: StatItem[] = [
    {
      icon: <Globe size={28} color="var(--gold)" />,
      isAnimated: true,
      motionValue: roundSme,
      suffix: 'M+',
      label: 'SMEs GLOBALLY',
      subtext: 'Businesses needing high quality online presence',
    },
    {
      icon: <DollarSign size={28} color="var(--flame)" />,
      isAnimated: true,
      motionValue: roundMarket,
      prefix: '$',
      suffix: '',
      label: 'MARKET SIZE',
      subtext: 'Global small business website & design market',
    },
    {
      icon: <Clock size={28} color="var(--gold)" />,
      isAnimated: true,
      motionValue: roundDays,
      suffix: ' Days',
      label: 'DELIVERY TIME',
      subtext: 'From brief submission to live launch',
    },
    {
      icon: <ShieldCheck size={28} color="var(--flame)" />,
      isAnimated: true,
      motionValue: roundSatisfaction,
      suffix: '%',
      decimals: 1,
      label: 'SATISFACTION RATE',
      subtext: 'On-time delivery and ongoing host maintenance',
    },
  ];

  return (
    <section style={{ padding: '4rem 0', borderBlock: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.02)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {stats.map((stat: StatItem, idx: number) => (
            <motion.div
              key={idx}
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem 1.5rem',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                {stat.icon}
              </div>

              <strong style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.1', marginBottom: '0.4rem' }}>
                {stat.prefix}
                {stat.isAnimated && stat.motionValue ? (
                  <AnimatedNumber value={stat.motionValue} decimals={stat.decimals || 0} />
                ) : (
                  stat.staticValue
                )}
                {stat.suffix}
              </strong>

              <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--gold)', marginBottom: '0.4rem' }}>
                {stat.label}
              </span>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}