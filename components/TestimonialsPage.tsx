"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { getTestimonials, Testimonial } from "@/lib/testimonials";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    let isMounted = true;

    getTestimonials()
      .then((items) => {
        if (isMounted) {
          setTestimonials(items);
        }
      })
      .catch((error) => {
        console.error("Failed to load testimonials:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="testimonials" style={{ padding: "6rem 0" }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Client <span className="gradient-text-gold">Stories</span>
          </h2>
          <p className="section-desc">
            Real feedback from businesses building a sharper online presence.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {testimonials.map((item, index) => (
            <article className="testimonial-card" key={item.id ?? `${item.name}-${index}`}>
              <div style={{ display: "flex", gap: "0.25rem", color: "#f59e0b", marginBottom: "1rem" }}>
                {Array.from({ length: Math.max(1, Math.min(item.rating || 5, 5)) }).map((_, starIndex) => (
                  <Star key={starIndex} size={18} fill="currentColor" />
                ))}
              </div>

              <p style={{ color: "var(--cream)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                "{item.quote}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {item.avatar ? (
                  <div
                    style={{
                      position: "relative",
                      width: "2.75rem",
                      height: "2.75rem",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "1px solid var(--charcoal)",
                      flexShrink: 0,
                    }}
                  >
                    <Image src={item.avatar} alt={item.name} fill style={{ objectFit: "cover" }} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                      borderRadius: "50%",
                      background: "var(--flame)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {item.name.charAt(0)}
                  </div>
                )}

                <div>
                  <strong style={{ display: "block", color: "var(--white)", lineHeight: 1.2 }}>{item.name}</strong>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                    {item.role}
                    {item.company ? `, ${item.company}` : ""}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
