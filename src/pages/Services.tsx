import React from 'react';
import {
  Code2,
  Smartphone,
  Cloud,
  Settings,
  ShieldCheck,
  Lightbulb,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SlaMatrix } from '../components/services/SlaMatrix';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';

interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  description: string;
  deliverables: string[];
  sla: string;
}

const detailedServices: ServiceDetail[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    category: 'Full-Stack & Frontend Engineering',
    icon: <Code2 size={24} />,
    iconBg: '#EDE9FE',
    iconColor: '#7C3AED',
    description: 'Custom, responsive and scalable websites tailored for your business needs. Built on modern reactive frameworks with fast performance and SEO architecture.',
    deliverables: [
      'Next.js & React SPA micro-frontends',
      'High-concurrency GraphQL & RESTful APIs',
      'Core Web Vitals optimization and accessibility',
      'Headless CMS & automated CI/CD pipelines',
    ],
    sla: 'High-Availability Architecture',
  },
  {
    id: 'mobile-applications',
    title: 'Mobile Applications',
    category: 'Cross-Platform & Native Mobile',
    icon: <Smartphone size={24} />,
    iconBg: '#D1FAE5',
    iconColor: '#059669',
    description: 'Feature-rich and user-friendly apps for Android and iOS platforms. Intuitive touch navigation, offline data synchronization, and biometric security integration.',
    deliverables: [
      'React Native & Flutter unified codebases',
      'Native biometric authentication & encryption',
      'Real-time WebSocket notifications & sockets',
      'App Store & Google Play automated release cycle',
    ],
    sla: 'Controlled OTA Release Cycles',
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    category: 'Cloud Infrastructure & DevOps',
    icon: <Cloud size={24} />,
    iconBg: '#E0F2FE',
    iconColor: '#0284C7',
    description: 'Secure, scalable and flexible cloud infrastructure for your business. Containerized microservice mesh, multi-region Kubernetes deployments, and cloud cost optimization.',
    deliverables: [
      'Multi-region Kubernetes & Docker mesh',
      'Terraform & Infrastructure as Code (IaC)',
      'Automated disaster recovery & data backups',
      'FinOps audits & cloud resource optimization',
    ],
    sla: 'Structured Incident Response Protocols',
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    category: 'Strategic Technology Advisory',
    icon: <Settings size={24} />,
    iconBg: '#FFE4E6',
    iconColor: '#B80F2E',
    description: 'Strategic technology consulting to drive efficiency and growth. Modernizing legacy monolithic architectures into decoupled, cloud-native services with minimal operational disruption.',
    deliverables: [
      'Monolith-to-microservices decoupling roadmaps',
      'Enterprise database architecture & sharding',
      'Technical debt audits & refactoring plans',
      'Fractional architectural steering & reviews',
    ],
    sla: 'Transparent Milestone Delivery',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    category: 'Zero-Trust Security & Auditing',
    icon: <ShieldCheck size={24} />,
    iconBg: '#EDE9FE',
    iconColor: '#6D28D9',
    description: 'Protect your data and business with advanced security solutions. Comprehensive penetration testing, air-gapped data policies, and continuous vulnerability scans.',
    deliverables: [
      'OWASP Top 10 automated vulnerability scanning',
      'Role-based access control (RBAC) & OAuth hardening',
      'Data encryption at rest (AES-256) & in transit',
      'SOC2 / ISO27001 compliance readiness audits',
    ],
    sla: 'Proactive Security Audits & Patch Management',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'Design Systems & Product Design',
    icon: <Lightbulb size={24} />,
    iconBg: '#E0F2FE',
    iconColor: '#0284C7',
    description: 'Intuitive and engaging experiences that users love. Human-centered design systems, interactive prototypes, and accessible WCAG 2.1 AA interfaces designed for conversions.',
    deliverables: [
      'Enterprise Figma component libraries & tokens',
      'Wireframing, clickable prototypes & user testing',
      'Information architecture & conversion funnel mapping',
      'Responsive design across mobile, tablet & desktop',
    ],
    sla: 'Accessible Design System Handoff',
  },
];

export const Services: React.FC = () => {
  const { services: cmsServices } = useCMS();

  const getServiceIcon = (name?: string) => {
    switch (name?.toLowerCase()) {
      case 'code2': case 'web development': case 'web': return <Code2 size={24} />;
      case 'smartphone': case 'mobile applications': case 'mobile': return <Smartphone size={24} />;
      case 'cloud': case 'cloud solutions': return <Cloud size={24} />;
      case 'settings': case 'it consulting': return <Settings size={24} />;
      case 'shieldcheck': case 'cybersecurity': return <ShieldCheck size={24} />;
      case 'lightbulb': case 'ui/ux design': return <Lightbulb size={24} />;
      default: return <Code2 size={24} />;
    }
  };

  const effectiveServices = (cmsServices && cmsServices.length > 0)
    ? cmsServices.map((s, idx) => {
      const match = detailedServices.find(ds => ds.id === s.slug || ds.id === s.id);
      return {
        id: s.slug || s.id || `srv-${idx}`,
        title: s.title,
        category: (s as any).category || match?.category || 'Enterprise Engineering',
        icon: getServiceIcon(s.iconName || s.icon_name || match?.title),
        iconBg: match?.iconBg || (idx % 2 === 0 ? '#EDE9FE' : '#D1FAE5'),
        iconColor: match?.iconColor || (idx % 2 === 0 ? '#7C3AED' : '#059669'),
        description: s.description || s.shortDescription || s.summary || match?.description || '',
        deliverables: s.capabilities && Array.isArray(s.capabilities) && s.capabilities.length > 0
          ? s.capabilities.map((c: any) => typeof c === 'string' ? c : (c.title || c.description || JSON.stringify(c)))
          : (match?.deliverables || ['End-to-end architecture delivery', 'Automated test suite coverage', 'Dedicated sprint cadence']),
        sla: (s as any).sla || match?.sla || 'Standard Enterprise SLA',
      };
    })
    : detailedServices;

  return (
    <div>
      <SEOHead
        title="Comprehensive Digital Solutions &amp; Services — Azaroth Techhive"
        description="We offer end-to-end technology services to help you build, optimize and scale your digital presence: Web Development, Mobile Apps, Cloud Solutions, IT Consulting, Cybersecurity, and UI/UX Design."
        canonicalPath="/services"
      />

      {/* Page Hero Banner */}
      <PageHeader
        kicker="- OUR SERVICES -"
        title="Comprehensive Digital Solutions"
        gradientWords={['Digital', 'Solutions']}
        subtitle="We offer end-to-end technology services to help you build, optimize and scale your digital presence with enterprise performance guarantees."
        actions={
          <>
            <Button to="/connect-with-us" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
              Schedule Technical Discovery
            </Button>
            <Button to="/connect-with-us" variant="outline" size="lg">
              Book Architecture Discovery
            </Button>
          </>
        }
      />

      {/* Services Grid (Organized in 2x2 / 3x2 Grid Matching temp.jpeg) */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '5.5rem 0' }} id="services-catalog">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.75rem)', fontWeight: 800, color: '#1E293B', marginBottom: '1rem' }}>
              Specialized Engineering Practices
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.0625rem', lineHeight: 1.6 }}>
              Each practice is staffed with senior domain specialists, modern toolchains, and verifiable deliverables.
            </p>
          </div>

          {/* 2x2 Grid of Services */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              maxWidth: '1100px',
              margin: '0 auto',
            }}
          >
            {effectiveServices.map((service: any) => (
              <div
                key={service.id}
                id={service.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '1.5rem',
                  padding: '2.5rem 2rem',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-300"
              >
                {/* Header Icon & Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      borderRadius: '14px',
                      backgroundColor: service.iconBg,
                      color: service.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {service.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#059669',
                      backgroundColor: '#ECFDF5',
                      padding: '0.25rem 0.625rem',
                      borderRadius: '9999px',
                      border: '1px solid #A7F3D0',
                    }}
                  >
                    {service.sla}
                  </span>
                </div>

                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#99152B', marginBottom: '0.35rem' }}>
                  {service.category}
                </div>

                <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.875rem' }}>
                  {service.title}
                </h3>

                <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div style={{ marginTop: 'auto', marginBottom: '1.75rem' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Key Deliverables:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {service.deliverables.map((item: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem', color: '#475569' }}>
                        <CheckCircle2 size={15} style={{ color: '#059669', flexShrink: 0, marginTop: '0.15rem' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Link
                    to="/connect-with-us"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#99152B',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                    className="hover:gap-2"
                  >
                    <span>Deploy Practice</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Button to="/connect-with-us" variant="outline" size="sm">
                    Inquire
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA Tier Matrix Section */}
      <SlaMatrix />

      {/* Bottom CTA */}
      <section style={{ backgroundColor: '#0F141D', color: '#FFFFFF', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem' }}>
            Ready to Accelerate Your Digital Transformation?
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '2.25rem' }}>
            Talk to an Azaroth Techhive engineering architect today. We provide fixed-scope estimates, technology audits, and rapid pod kickoffs.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Button to="/connect-with-us" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
              Schedule Consultation
            </Button>
            <Button to="/connect-with-us" variant="outline" size="lg">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
