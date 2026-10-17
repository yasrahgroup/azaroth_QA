import React from 'react';
import { Link } from 'react-router-dom';
import { ProcessTimeline } from '../components/framework/ProcessTimeline';
import { FinalCTA } from '../components/home/FinalCTA';
import { SEOHead } from '../components/common/SEOHead';
import { useCMS } from '../context/CMSContext';

export const DeliveryFramework: React.FC = () => {
  const { pages } = useCMS();
  const pageData = pages['delivery-framework'];
  const content = pageData?.content || {};

  const badge = content.badge || '— METHODOLOGY & LIFECYCLE —';
  const heading = content.heading || pageData?.title || 'Our Delivery Framework — A Clear Path from Idea to Impact';
  const description = content.description || pageData?.meta_description || 'A structured, collaborative approach that brings clarity to every stage of software development, ensuring solutions remain aligned with project goals, built on sound engineering practices, and adaptable to evolving needs.';

  return (
    <div>
      <SEOHead
        title={pageData?.title ? `${pageData.title} | Azaroth Tech-Hive` : "How We Work — Delivery Framework | Azaroth Tech-Hive"}
        description={pageData?.meta_description || "A structured, collaborative delivery approach covering discovery, design, development, testing, and deployment to keep solutions aligned with project goals."}
        canonicalPath="/delivery-framework"
      />

      {/* Page Hero with Radial Gradient Background */}
      <section
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(184, 15, 46, 0.08) 0%, transparent 70%), #FFFFFF',
          borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
          paddingTop: '5rem',
          paddingBottom: '5rem',
          position: 'relative',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '840px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: '#99152B',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            {badge}
          </div>
          <h1
            style={{
              marginBottom: '1.25rem',
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 800,
              color: '#1E293B',
              lineHeight: 1.2,
            }}
          >
            {heading.includes('—') ? (
              <>
                {heading.split('—')[0]} &mdash;{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #7A0C16 0%, #99152B 50%, #D3163C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {heading.split('—')[1]}
                </span>
              </>
            ) : (
              heading
            )}
          </h1>
          <p style={{ fontSize: '1.1875rem', color: '#64748B', lineHeight: 1.7, margin: '0 auto', maxWidth: '740px' }}>
            {description}
          </p>
        </div>
      </section>

      {/* Who We Are / Delivery Framework: In-Page Navigation Bar */}
      <nav
        aria-label="Delivery Framework In-Page Navigation"
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E4E4E7',
          padding: '0.85rem 0',
          position: 'sticky',
          top: '4.75rem',
          zIndex: 40,
          boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.12em', marginRight: '0.5rem' }}>
            Who We Are:
          </span>
          <Link
            to="/about"
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              backgroundColor: '#FDF2F4',
              color: '#7A0C16',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(184, 15, 46, 0.25)',
              transition: 'all 140ms ease-out',
            }}
            className="hover:border-rose-400 hover:text-rose-800 hover:bg-rose-50"
          >
            About Us
          </Link>
          <Link
            to="/values"
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              backgroundColor: '#FDF2F4',
              color: '#7A0C16',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(184, 15, 46, 0.25)',
              transition: 'all 140ms ease-out',
            }}
            className="hover:border-rose-400 hover:text-rose-800 hover:bg-rose-50"
          >
            Our Values
          </Link>
          <span
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #7A0C16 0%, #B80F2E 50%, #F02B4F 100%)',
              color: '#FFFFFF',
              fontSize: '0.8125rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(184, 15, 46, 0.35)',
            }}
          >
            Delivery Framework
          </span>
          <Link
            to="/about#global-hubs"
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              backgroundColor: '#FDF2F4',
              color: '#7A0C16',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(184, 15, 46, 0.25)',
              transition: 'all 140ms ease-out',
            }}
            className="hover:border-rose-400 hover:text-rose-800 hover:bg-rose-50"
          >
            Global Hubs
          </Link>
        </div>
      </nav>

      {/* Interactive Process Stepper */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <ProcessTimeline />
        </div>
      </section>

      <FinalCTA />
    </div>
  );
};
