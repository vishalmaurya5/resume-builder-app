import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ATSTemplate from '../assets/templates/ATSTemplate'
import ClassicTemplate from '../assets/templates/ClassicTemplate'
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate'
import MinimalTemplate from '../assets/templates/MinimalTemplate'
import ModernTemplate from '../assets/templates/ModernTemplate'

const sampleData = {
  template: 'ats',
  personal_info: {
    full_name: 'Alex Johnson',
    profession: 'Senior Software Engineer',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
  },
  professional_summary:
    'Results-driven Software Engineer with 6+ years of experience building scalable web applications. Passionate about clean code, performance optimization, and delivering exceptional user experiences.',
  skills: [
    'React & Next.js', 'Node.js & Express', 'TypeScript', 'PostgreSQL & MongoDB',
    'AWS & Docker', 'System Design', 'REST & GraphQL APIs', 'CI/CD Pipelines',
  ],
  experience: [
    {
      _id: '1',
      position: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      start_date: '2021-03',
      is_current: true,
      description:
        'Led development of microservices architecture serving 2M+ users.\nReduced API response time by 40% through caching strategies.\nMentored team of 5 junior developers.',
    },
    {
      _id: '2',
      position: 'Software Engineer',
      company: 'StartupXYZ',
      start_date: '2019-06',
      end_date: '2021-02',
      description:
        'Built full-stack features using React and Node.js.\nImplemented CI/CD pipelines reducing deployment time by 60%.',
    },
  ],
  project: [
    {
      _id: '1',
      name: 'E-Commerce Platform',
      type: 'Full Stack',
      description: 'Scalable platform with 50K+ active users built with Next.js and PostgreSQL.',
    },
  ],
  education: [
    {
      _id: '1',
      degree: 'B.S. Computer Science',
      field: 'Software Engineering',
      institution: 'University of California, Berkeley',
      graduation_date: '2019-05',
      gpa: '3.8',
    },
  ],
  certificates: [
    {
      _id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issue_date: '2022-08',
    },
  ],
}

const TEMPLATES = [
  {
    id: 'ats',
    name: 'ATS Optimized',
    description: 'Clean, machine-readable layout designed to pass Applicant Tracking Systems.',
    badge: 'Most Popular',
    badgeColor: 'bg-green-500',
    Component: ATSTemplate,
    accentColor: '#16a34a',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless professional layout with elegant typography and balanced structure.',
    badge: 'Professional',
    badgeColor: 'bg-blue-500',
    Component: ClassicTemplate,
    accentColor: '#2563eb',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with accent colors and a sleek two-column layout.',
    badge: 'Creative',
    badgeColor: 'bg-purple-500',
    Component: ModernTemplate,
    accentColor: '#7c3aed',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Distraction-free, whitespace-focused layout that lets your content shine.',
    badge: 'Elegant',
    badgeColor: 'bg-slate-500',
    Component: MinimalTemplate,
    accentColor: '#475569',
  },
  {
    id: 'minimal-image',
    name: 'Minimal with Photo',
    description: 'Minimal style enhanced with a professional headshot section.',
    badge: 'With Photo',
    badgeColor: 'bg-orange-500',
    Component: MinimalImageTemplate,
    accentColor: '#ea580c',
  },
]

const TemplateCard = ({ template, isSelected, onSelect }) => {
  const { Component, accentColor, name, description, badge, badgeColor } = template
  const data = { ...sampleData, template: template.id }

  return (
    <div
      className={`template-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(template.id)}
    >
      {/* Badge */}
      <div className={`template-badge ${badgeColor}`}>{badge}</div>

      {/* Resume Preview */}
      <div className="preview-wrapper">
        <div className="preview-scale-container">
          <Component data={data} accentColor={accentColor} />
        </div>
        <div className="preview-overlay">
          <Link to="/app" className="use-template-btn">
            Use This Template
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Card Info */}
      <div className="card-info">
        <div className={`selected-indicator ${isSelected ? 'visible' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div>
          <h3 className="template-name">{name}</h3>
          <p className="template-desc">{description}</p>
        </div>
      </div>
    </div>
  )
}

const Templates = () => {
  const [selected, setSelected] = useState('ats')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }

        .templates-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0f9ff 100%);
        }

        /* ── Navbar ── */
        .t-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 40px; background: white;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0,0,0,.05);
          position: sticky; top: 0; z-index: 50;
        }
        .t-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .t-nav-logo img { height: 40px; }
        .t-nav-links { display: flex; align-items: center; gap: 24px; }
        .t-nav-link { color: #475569; text-decoration: none; font-size: 14px; font-weight: 500; transition: color .2s; }
        .t-nav-link:hover { color: #16a34a; }
        .t-nav-cta {
          background: #16a34a; color: white; padding: 8px 22px; border-radius: 999px;
          text-decoration: none; font-size: 14px; font-weight: 600;
          transition: background .2s, transform .15s;
        }
        .t-nav-cta:hover { background: #15803d; transform: scale(1.03); }

        /* ── Hero ── */
        .t-hero {
          text-align: center; padding: 72px 24px 48px;
          background: linear-gradient(180deg, #f0fdf4 0%, transparent 100%);
        }
        .t-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: #dcfce7; color: #15803d; border-radius: 999px;
          padding: 6px 16px; font-size: 13px; font-weight: 600;
          margin-bottom: 20px;
        }
        .t-hero h1 {
          font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800;
          color: #0f172a; line-height: 1.15; margin: 0 auto 16px;
          max-width: 750px;
        }
        .t-hero h1 span { color: #16a34a; }
        .t-hero-sub {
          color: #64748b; font-size: 17px; max-width: 540px; margin: 0 auto 36px; line-height: 1.7;
        }
        .t-hero-stats { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; }
        .t-stat { text-align: center; }
        .t-stat-num { font-size: 28px; font-weight: 800; color: #16a34a; }
        .t-stat-label { font-size: 13px; color: #64748b; font-weight: 500; }

        /* ── Filter Tabs ── */
        .t-filter-bar {
          display: flex; justify-content: center; gap: 10px;
          padding: 20px 24px 32px; flex-wrap: wrap;
        }
        .t-filter-btn {
          padding: 8px 20px; border-radius: 999px; border: 1.5px solid #e2e8f0;
          background: white; color: #475569; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all .2s;
        }
        .t-filter-btn:hover { border-color: #16a34a; color: #16a34a; }
        .t-filter-btn.active { background: #16a34a; color: white; border-color: #16a34a; }

        /* ── Grid ── */
        .t-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px; padding: 0 40px 80px;
          max-width: 1400px; margin: 0 auto;
        }

        /* ── Card ── */
        .template-card {
          background: white; border-radius: 16px; overflow: hidden;
          border: 2px solid #e2e8f0; cursor: pointer;
          transition: transform .25s, box-shadow .25s, border-color .25s;
          position: relative;
        }
        .template-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,.1); }
        .template-card.selected { border-color: #16a34a; box-shadow: 0 0 0 4px rgba(22,163,74,.15), 0 20px 40px rgba(0,0,0,.1); }

        .template-badge {
          position: absolute; top: 12px; left: 12px; z-index: 10;
          color: white; font-size: 11px; font-weight: 700; letter-spacing: .5px;
          padding: 4px 10px; border-radius: 999px; text-transform: uppercase;
        }

        /* ── Preview ── */
        .preview-wrapper {
          position: relative; overflow: hidden;
          height: 340px; background: #f8fafc;
          border-bottom: 1px solid #f1f5f9;
        }
        .preview-scale-container {
          position: absolute; top: 0; left: 0;
          width: 795px; /* natural template width */
          transform-origin: top left;
          transform: scale(0.405); /* 320 / 795 ≈ 0.40 */
          pointer-events: none;
        }
        .preview-overlay {
          position: absolute; inset: 0;
          background: rgba(15,23,42,.55); backdrop-filter: blur(2px);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity .25s;
        }
        .template-card:hover .preview-overlay { opacity: 1; }

        .use-template-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #16a34a; color: white;
          padding: 12px 28px; border-radius: 999px;
          font-size: 14px; font-weight: 700; text-decoration: none;
          transition: background .2s, transform .15s;
          box-shadow: 0 4px 16px rgba(22,163,74,.4);
        }
        .use-template-btn:hover { background: #15803d; transform: scale(1.05); }

        /* ── Card Info ── */
        .card-info {
          padding: 16px 18px; display: flex; align-items: flex-start; gap: 12px;
        }
        .selected-indicator {
          flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%;
          background: #16a34a; display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(0.6); transition: opacity .2s, transform .2s;
          margin-top: 2px;
        }
        .selected-indicator.visible { opacity: 1; transform: scale(1); }
        .template-name { font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 4px; }
        .template-desc { font-size: 12px; color: #64748b; margin: 0; line-height: 1.5; }

        /* ── CTA Banner ── */
        .t-cta {
          background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
          color: white; text-align: center; padding: 72px 24px;
          margin: 0 40px 60px; border-radius: 24px;
          max-width: 1320px; margin-left: auto; margin-right: auto;
          margin-bottom: 60px;
        }
        .t-cta h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 800; margin: 0 0 12px; }
        .t-cta p { font-size: 16px; opacity: .85; margin: 0 auto 32px; max-width: 480px; line-height: 1.6; }
        .t-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: white; color: #16a34a;
          padding: 14px 36px; border-radius: 999px;
          font-size: 16px; font-weight: 700; text-decoration: none;
          transition: transform .2s, box-shadow .2s;
          box-shadow: 0 4px 20px rgba(0,0,0,.2);
        }
        .t-cta-btn:hover { transform: scale(1.05); box-shadow: 0 8px 32px rgba(0,0,0,.3); }

        @media (max-width: 768px) {
          .t-nav { padding: 14px 20px; }
          .t-nav-links { display: none; }
          .t-grid { grid-template-columns: 1fr; padding: 0 20px 60px; }
          .t-cta { margin: 0 20px 40px; border-radius: 16px; }
          .t-hero { padding: 48px 20px 32px; }
        }
      `}</style>

      <div className="templates-page">
        {/* Navbar */}
        <nav className="t-nav">
          <Link to="/" className="t-nav-logo">
            <img src="/logo.svg" alt="logo" />
          </Link>
          <div className="t-nav-links">
            <Link to="/" className="t-nav-link">Home</Link>
            <a href="#templates-grid" className="t-nav-link">Templates</a>
            <Link to="/app" className="t-nav-cta">Get Started Free</Link>
          </div>
        </nav>

        {/* Hero */}
        <div className="t-hero">
          <div className="t-hero-eyebrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Professional Resume Templates
          </div>
          <h1>
            Choose Your <span>Perfect</span><br />Resume Template
          </h1>
          <p className="t-hero-sub">
            5 professionally designed templates to help you stand out. ATS-friendly, fully customizable, and print-ready.
          </p>
          <div className="t-hero-stats">
            <div className="t-stat">
              <div className="t-stat-num">5</div>
              <div className="t-stat-label">Templates</div>
            </div>
            <div className="t-stat">
              <div className="t-stat-num">100%</div>
              <div className="t-stat-label">ATS Friendly</div>
            </div>
            <div className="t-stat">
              <div className="t-stat-num">10K+</div>
              <div className="t-stat-label">Resumes Created</div>
            </div>
          </div>
        </div>

        {/* Template Grid */}
        <div className="t-grid" id="templates-grid">
          {TEMPLATES.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selected === template.id}
              onSelect={setSelected}
            />
          ))}
        </div>

        {/* CTA Banner */}
        <div className="t-cta">
          <h2>Ready to Build Your Resume?</h2>
          <p>Start with any template, customize it to your style, and download in seconds.</p>
          <Link to="/app" className="t-cta-btn">
            Start Building for Free
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Templates
