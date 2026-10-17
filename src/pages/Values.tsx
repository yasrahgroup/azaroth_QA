import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lightbulb, ShieldCheck, Maximize2, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { ourValuesPrinciples } from '../data/companyData';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { useCMS } from '../context/CMSContext';

export const Values: React.FC = () => {
  const { pages } = useCMS();
  const pageData = pages['values'];
  const content = pageData?.content || {};

  const badge = content.badge || '— OUR PRINCIPLES —';
  const heading = content.heading || pageData?.title || 'Principles That Shape Every Solution';
  const description = content.description || pageData?.meta_description || 'The foundational values that guide our engineering decisions, client partnerships, and continuous pursuit of excellence in every solution we build.';
  const principles = (content.principles && Array.isArray(content.principles) && content.principles.length > 0)
    ? content.principles
    : ourValuesPrinciples;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Lightbulb': return <Lightbulb size={26} />;
      case 'ShieldCheck': return <ShieldCheck size={26} />;
      case 'Maximize2': return <Maximize2 size={26} />;
      case 'CheckCircle': return <CheckCircle size={26} />;
      case 'Users': return <Users size={26} />;
      case 'TrendingUp': return <TrendingUp size={26} />;
      default: return <Lightbulb size={26} />;
    }
  };

  return (
    <div>
      <SEOHead
        title={pageData?.title ? `${pageData.title} — Azaroth Tech-Hive` : 'Our Values — Azaroth Tech-Hive'}
        description={pageData?.meta_description || "The principles that guide our engineering decisions, client partnerships, and delivery of dependable software solutions for every engagement and long-term relationship."}
        canonicalPath="/values"
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
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
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
            {heading.includes('Every Solution') ? (
              <>
                {heading.replace('Every Solution', '').trim()}{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #7A0C16 0%, #99152B 50%, #D3163C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Every Solution
                </span>
              </>
            ) : (
              heading
            )}
          </h1>
          <p style={{ fontSize: '1.1875rem', color: '#64748B', lineHeight: 1.7, margin: '0 auto', maxWidth: '720px' }}>
            {description}
          </p>
        </div>
      </section>

      {/* Who We Are / Values: In-Page Navigation Bar */}
      <nav
        aria-label="Values In-Page Navigation"
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
            Our Values
          </span>
          <Link
            to="/delivery-framework"
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
            Delivery Framework
          </Link>
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

      {/* Values Grid */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <h2 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
            Our Core Values
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}>
            {principles.map((val: any, index: number) => (
              <motion.div
                key={val.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card
                  variant="glass"
                  padding="lg"
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 180ms ease-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 30px -4px rgba(184, 15, 46, 0.12)';
                    e.currentTarget.style.borderColor = '#B80F2E';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(184, 15, 46, 0.08) 0%, rgba(211, 22, 60, 0.12) 100%)',
                      color: '#99152B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(184, 15, 46, 0.2)',
                    }}>
                      {getIcon(val.iconName)}
                    </div>

                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: '#FFF1F2',
                      color: '#99152B',
                      border: '1px solid #FFE4E6',
                    }}>
                      {val.number}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
                    {val.title}
                  </h3>

                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, flexGrow: 1 }}>
                    {val.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <Button to="/connect-with-us" variant="primary" size="lg">
              Engage an Engineering Pod Backed by These Values
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
