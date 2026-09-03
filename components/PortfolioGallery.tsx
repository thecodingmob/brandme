'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Eye, Loader2 } from 'lucide-react';
import { getProjects, Project } from '@/lib/projects';

export default function PortfolioGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects from Firestore:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section 
      id="portfolio" 
      style={{ 
        padding: '3rem 1rem', 
        background: 'rgba(255, 255, 255, 0.01)', 
        width: '100%', 
        maxWidth: '100vw', 
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
    >
      <style jsx global>{`
        /* Responsive Grid via Pure CSS to bypass parent overrides */
        .portfolio-gallery-grid {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 1.5rem !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        @media (max-width: 1024px) {
          .portfolio-gallery-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 640px) {
          .portfolio-gallery-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
          }
        }

        /* Action Buttons Flex Layout */
        .card-action-bar {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 0.5rem !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        .card-action-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.35rem !important;
          white-space: nowrap !important;
          box-sizing: border-box !important;
        }

        @media (max-width: 420px) {
          .card-action-bar {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .card-action-btn {
            width: 100% !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', fontWeight: '800' }}>
            Featured <span className="gradient-text-flame">Client Work</span>
          </h2>
          <p className="section-desc" style={{ maxWidth: '600px', margin: '0.5rem auto 0', color: 'var(--text-muted, #888)' }}>
            Explore recent websites designed, developed, and deployed in 7 days or less.
          </p>

          {!loading && categories.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '9999px',
                    background: activeCategory === cat ? 'var(--flame, #ff4500)' : '#101118',
                    color: activeCategory === cat ? '#ffffff' : 'var(--text-muted, #888)',
                    border: '1px solid var(--border-color, #222)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="portfolio-gallery-grid">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                style={{
                  height: '350px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-color, #222)',
                }}
              >
                <Loader2 className="animate-spin" size={28} style={{ color: 'var(--text-muted, #888)' }} />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted, #888)' }}>
            No projects found in this category.
          </div>
        ) : (
          <div className="portfolio-gallery-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                style={{
                  background: '#0d0e15',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color, #222)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {/* Image Container */}
                <div style={{ position: 'relative', height: '200px', width: '100%', background: '#050508', flexShrink: 0 }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(13, 14, 21, 0.95) 0%, transparent 60%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '0.75rem',
                      pointerEvents: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {project.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.7rem',
                            background: 'rgba(0, 0, 0, 0.8)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted, #a0a0a0)', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="card-action-bar" style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-color, #222)' }}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-btn-primary card-action-btn"
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', flex: '1 1 auto', textDecoration: 'none' }}
                    >
                      View Live <ExternalLink size={13} />
                    </a>
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn-secondary card-action-btn"
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', textDecoration: 'none' }}
                      >
                        <Github size={13} /> <span>Code</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="admin-btn-secondary card-action-btn"
                      style={{ padding: '0.5rem 0.6rem', fontSize: '0.8rem', cursor: 'pointer' }}
                      title="Quick Preview"
                    >
                      <Eye size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Quick Preview */}
        {selectedProject && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
            onClick={() => setSelectedProject(null)}
          >
            <div
              style={{
                maxWidth: '650px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#0d0e15',
                border: '1px solid var(--border-color, #222)',
                padding: '1.25rem',
                borderRadius: '12px',
                boxSizing: 'border-box',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>{selectedProject.title}</h3>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  style={{ fontSize: '1.25rem', color: '#888', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', background: '#050508' }}>
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 650px"
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>

              <p style={{ color: '#a0a0a0', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                {selectedProject.description}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn-primary card-action-btn"
                  style={{ textDecoration: 'none', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                >
                  Open Live Website <ExternalLink size={15} />
                </a>
                {selectedProject.codeUrl && (
                  <a
                    href={selectedProject.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn-secondary card-action-btn"
                    style={{ textDecoration: 'none', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                  >
                    Source Code <Github size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}