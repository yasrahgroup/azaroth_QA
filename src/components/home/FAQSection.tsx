import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

const defaultFaqs = [
  {
    question: 'What industries do you build for?',
    answer: 'We build for retail and digital commerce, education and digital learning, healthcare and health technology, supply chain and logistics, and ERP and business management systems. Industry context shapes the architecture, so we begin by learning which constraints apply to your environment before proposing a solution.',
  },
  {
    question: 'How do engagements start?',
    answer: 'Every engagement starts with discovery: your goals, user needs, existing systems, and technical challenges. That stage produces a written requirements and scope specification, an architecture feasibility assessment, and an agreed delivery horizon, so the build begins against a shared definition of the work.',
  },
  {
    question: 'Can you work with our existing systems and vendors?',
    answer: 'Yes. Discovery includes a review of legacy systems, integrations, and API constraints, and we plan around the third-party platforms and vendors you already depend on. Integration mapping and interface contracts are defined during solution design so the new work fits the landscape you have.',
  },
  {
    question: 'How do you keep scope and communication under control?',
    answer: 'Scope is documented at discovery with explicit boundaries, and changes are assessed against that specification rather than absorbed silently. Communication runs through sprint reviews and iterative builds, with progress, blockers, and decisions surfaced as they happen instead of at the end of a phase.',
  },
  {
    question: 'What happens after launch?',
    answer: 'Deployment is followed by a support stage: monitoring and health checks, issue resolution within the agreed operating model, dependency and framework maintenance, performance tuning, and feature iterations prioritized with you. Coverage is defined in the operating model agreed for your engagement.',
  },
  {
    question: 'How is pricing structured?',
    answer: 'Pricing is scoped per engagement after discovery, once the scope, constraints, and delivery approach are clear. Share your requirements through our Connect portal and our engineering leadership will return a scoped proposal.',
  },
];

export const FAQSection: React.FC = () => {
  const { pages } = useCMS();
  const pageData = pages['home'];
  const cmsFaqs = pageData?.content?.faqs;
  const activeFaqs = (Array.isArray(cmsFaqs) && cmsFaqs.length > 0) ? cmsFaqs : defaultFaqs;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{
      backgroundColor: 'var(--color-canvas-bg)',
      padding: '5rem 0',
    }}>
      <div className="container mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}
        >
          <Badge variant="gold" style={{ marginBottom: '1rem' }}>
            FAQ
          </Badge>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}>
            Questions teams ask before starting
          </h2>
          <p style={{
            fontSize: '1.0625rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
          }}>
            Direct answers on how we scope, run, and support enterprise engagements — and where to go when your question is not listed here.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto 3rem',
        }}>
          {activeFaqs.map((faq: any, index: number) => {
            const buttonId = `faq-question-${index}`;
            const panelId = `faq-answer-${index}`;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  marginBottom: '1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-canvas-card)',
                }}
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: isOpen ? 'var(--color-surface-muted)' : 'var(--color-canvas-card)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 180ms ease-out',
                  }}
                  onMouseEnter={(e) => {
                    if (!isOpen) {
                      e.currentTarget.style.backgroundColor = 'var(--color-surface-muted)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isOpen) {
                      e.currentTarget.style.backgroundColor = 'var(--color-canvas-card)';
                    }
                  }}
                >
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    textAlign: 'left',
                    flex: 1,
                  }}>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={20} aria-hidden="true" style={{ color: 'var(--color-brand-violet)' }} />
                  ) : (
                    <ChevronDown size={20} aria-hidden="true" style={{ color: 'var(--color-text-secondary)' }} />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{
                        padding: '1.25rem 1.5rem',
                        borderTop: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-surface-muted)',
                      }}>
                        <p style={{
                          fontSize: '0.9375rem',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 1.7,
                        }}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center' }}
        >
          <Button to="/connect-with-us" variant="gold" size="lg">
            Connect with our team
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
