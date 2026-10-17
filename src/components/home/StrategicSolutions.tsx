import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { 
  ecommercePlatformImg, 
  mobileBankingAppImg, 
  analyticsDashboardImg, 
  creativePortfolioImg 
} from '../../assets/images';

interface ProjectItem {
  id: string;
  title: string;
  categories: string;
  image: string;
  description: string;
  link: string;
}

const projects: ProjectItem[] = [
  {
    id: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    categories: 'Web Development \u00B7 E-Commerce',
    image: ecommercePlatformImg,
    description: 'High-concurrency headless digital storefront with sub-second checkout and real-time inventory synchronization.',
    link: '/portfolio#e-commerce-platform',
  },
  {
    id: 'mobile-banking-app',
    title: 'Mobile Banking App',
    categories: 'Mobile Apps \u00B7 Fintech',
    image: mobileBankingAppImg,
    description: 'Biometric-secured iOS and Android banking app featuring instant payments, budget analytics, and multi-currency accounts.',
    link: '/portfolio#mobile-banking-app',
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    categories: 'Web App \u00B7 Business Intelligence',
    image: analyticsDashboardImg,
    description: 'Real-time telemetry and executive data warehouse dashboard processing millions of events per minute.',
    link: '/portfolio#analytics-dashboard',
  },
  {
    id: 'creative-portfolio',
    title: 'Creative Portfolio',
    categories: 'UI/UX Design \u00B7 Branding',
    image: creativePortfolioImg,
    description: 'Bespoke design portfolio and digital asset exhibition engineered with fluid micro-interactions and spatial design.',
    link: '/portfolio#creative-portfolio',
  },
];

const AUTOPLAY_INTERVAL = 4000; // 4 seconds (configurable 3-5 seconds)
const TOTAL_PROJECTS = projects.length; // 4

// 3 clones sets ensure seamless continuous forward & backward loop without jump/shift
const extendedProjects = [...projects, ...projects, ...projects];

export const StrategicSolutions: React.FC = () => {
  // Start at index 4 (the beginning of the middle project set)
  const [displayIndex, setDisplayIndex] = useState(TOTAL_PROJECTS);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const viewportRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Math.min(window.innerWidth - 64, 1200);
    }
    return 1200;
  });

  const isAnimating = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Active dot index (0..3) synchronized with currently displayed lead project
  const currentIndex = ((displayIndex % TOTAL_PROJECTS) + TOTAL_PROJECTS) % TOTAL_PROJECTS;

  // Reduced motion preference detection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Responsive container width tracking via ResizeObserver
  useEffect(() => {
    const updateWidth = () => {
      if (viewportRef.current) {
        const rect = viewportRef.current.getBoundingClientRect();
        if (rect.width > 0) {
          setContainerWidth(rect.width);
        }
      }
    };

    updateWidth();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && viewportRef.current) {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0) {
            setContainerWidth(entry.contentRect.width);
          }
        }
      });
      ro.observe(viewportRef.current);
    }

    window.addEventListener('resize', updateWidth);
    window.addEventListener('orientationchange', updateWidth);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateWidth);
      window.removeEventListener('orientationchange', updateWidth);
    };
  }, []);

  // Responsive cards per view
  const getCardsPerView = (width: number) => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  const cardsPerView = getCardsPerView(containerWidth);
  const gapPx = containerWidth < 640 ? 16 : 24;
  const cardWidth = Math.max(0, (containerWidth - (cardsPerView - 1) * gapPx) / cardsPerView);
  const offsetPx = displayIndex * (cardWidth + gapPx);

  // Re-enable CSS transitions on next frame after instant boundary snap
  useEffect(() => {
    if (!isTransitioning) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isTransitioning]);

  // Safety unlock in case onTransitionEnd doesn't fire
  useEffect(() => {
    if (isAnimating.current) {
      const timer = setTimeout(() => {
        isAnimating.current = false;
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [displayIndex]);

  // Handle instant boundary snap when transitions complete
  const handleTransitionEnd = () => {
    isAnimating.current = false;
    setDisplayIndex((prev) => {
      if (prev >= TOTAL_PROJECTS * 2) {
        setIsTransitioning(false);
        return prev - TOTAL_PROJECTS;
      }
      if (prev < TOTAL_PROJECTS) {
        setIsTransitioning(false);
        return prev + TOTAL_PROJECTS;
      }
      return prev;
    });
  };

  // Immediate snap when reduced motion is preferred
  useEffect(() => {
    if (prefersReducedMotion) {
      isAnimating.current = false;
      setDisplayIndex((prev) => {
        if (prev >= TOTAL_PROJECTS * 2) return prev - TOTAL_PROJECTS;
        if (prev < TOTAL_PROJECTS) return prev + TOTAL_PROJECTS;
        return prev;
      });
    }
  }, [displayIndex, prefersReducedMotion]);

  // Next Slide
  const nextSlide = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev + 1);
  }, []);

  // Previous Slide
  const prevSlide = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev - 1);
  }, []);

  // Direct Pagination Dot Navigation
  const goToSlide = useCallback((targetIdx: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsTransitioning(true);
    setDisplayIndex(TOTAL_PROJECTS + targetIdx);
  }, []);

  // Autoplay with pause-on-hover & reduced motion support
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, nextSlide, displayIndex]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      id="projects"
      style={{
        backgroundColor: '#F8FAFC',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Featured Projects"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.25rem auto' }}>
          <h2
            style={{
              fontSize: 'clamp(2.25rem, 4.2vw, 3.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #7A0C16 0%, #99152B 50%, #D3163C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Featured Projects
            </span>
          </h2>

          <p
            style={{
              fontSize: '1.0625rem',
              color: '#64748B',
              lineHeight: 1.6,
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Explore some of our latest projects and see how we turn ideas into impactful digital solutions.
          </p>
        </div>

        {/* Slider Outer Wrapper */}
        <div 
          style={{ 
            position: 'relative', 
            width: '100%',
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured Projects Slider"
        >
          {/* Manual Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Project"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 6px 16px rgba(122, 12, 22, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1E293B',
              transition: 'all 200ms ease-out',
            }}
            className="slider-nav-btn slider-nav-btn-prev hidden sm:flex"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Manual Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Project"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 6px 16px rgba(122, 12, 22, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1E293B',
              transition: 'all 200ms ease-out',
            }}
            className="slider-nav-btn slider-nav-btn-next hidden sm:flex"
          >
            <ChevronRight size={20} />
          </button>

          {/* Slider Viewport (overflow hidden, touch enabled) */}
          <div
            ref={viewportRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              overflow: 'hidden',
              width: '100%',
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              marginTop: '-0.75rem',
              marginBottom: '-0.75rem',
            }}
          >
            {/* Sliding Track */}
            <div
              onTransitionEnd={handleTransitionEnd}
              style={{
                display: 'flex',
                gap: `${gapPx}px`,
                transform: `translate3d(-${offsetPx}px, 0, 0)`,
                transition: prefersReducedMotion
                  ? 'none'
                  : isTransitioning
                    ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)'
                    : 'none',
                willChange: 'transform',
              }}
            >
              {extendedProjects.map((proj, extendedIdx) => {
                const isCurrent = extendedIdx === displayIndex;

                return (
                  <div
                    key={`${proj.id}-${extendedIdx}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${proj.title} (${(extendedIdx % TOTAL_PROJECTS) + 1} of ${TOTAL_PROJECTS})`}
                    style={{
                      flex: `0 0 ${cardWidth}px`,
                      width: `${cardWidth}px`,
                      maxWidth: `${cardWidth}px`,
                      boxSizing: 'border-box',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '1.25rem',
                        overflow: 'hidden',
                        border: isCurrent 
                          ? '1.5px solid rgba(184, 15, 46, 0.4)' 
                          : '1px solid rgba(226, 232, 240, 0.9)',
                        boxShadow: isCurrent
                          ? '0 12px 28px -4px rgba(184, 15, 46, 0.12)'
                          : '0 4px 16px -2px rgba(15, 23, 42, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transition: 'all 260ms cubic-bezier(0.16, 1, 0.3, 1)',
                        position: 'relative',
                      }}
                      className="hover:-translate-y-1.5 hover:shadow-xl hover:border-rose-400 group"
                    >
                      {/* Active Indicator Top Tag */}
                      {isCurrent && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '0.75rem',
                            left: '0.75rem',
                            zIndex: 10,
                            background: 'linear-gradient(135deg, #7A0C16 0%, #B80F2E 50%, #F02B4F 100%)',
                            color: '#FFFFFF',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.65rem',
                            borderRadius: '9999px',
                            boxShadow: '0 2px 8px rgba(184, 15, 46, 0.3)',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Featured Now
                        </div>
                      )}

                      {/* Image Container with 16:9 ratio */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '190px',
                          overflow: 'hidden',
                          backgroundColor: '#0F172A',
                        }}
                      >
                        <img
                          src={proj.image}
                          alt={proj.title}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 350ms ease-out',
                          }}
                          className="group-hover:scale-105"
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.35) 0%, transparent 60%)',
                            pointerEvents: 'none',
                          }}
                        />
                      </div>

                      {/* Card Content */}
                      <div
                        style={{
                          padding: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flex: 1,
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontSize: '1.125rem',
                              fontWeight: 700,
                              color: '#1E293B',
                              marginBottom: '0.35rem',
                            }}
                          >
                            {proj.title}
                          </h3>
                          <p
                            style={{
                              fontSize: '0.8125rem',
                              color: '#99152B',
                              fontWeight: 600,
                              margin: 0,
                            }}
                          >
                            {proj.categories}
                          </p>
                        </div>

                        {/* Circular Arrow Button with Crimson Gradient Hover */}
                        <Link
                          to={proj.link}
                          aria-label={`View ${proj.title}`}
                          style={{
                            width: '2.35rem',
                            height: '2.35rem',
                            borderRadius: '50%',
                            backgroundColor: isCurrent ? '#7A0C16' : '#F4F4F5',
                            color: isCurrent ? '#FFFFFF' : '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 200ms ease-out',
                            textDecoration: 'none',
                            boxShadow: isCurrent ? '0 4px 12px rgba(184, 15, 46, 0.35)' : 'none',
                          }}
                          className="slider-card-action hover:scale-110"
                        >
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slider Pagination Controls (Interactive dots synchronized with active lead project) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.625rem',
              marginTop: '2.25rem',
            }}
          >
            {projects.map((proj, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to project ${idx + 1}: ${proj.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  style={{
                    height: '8px',
                    width: isActive ? '2.5rem' : '8px',
                    borderRadius: '9999px',
                    background: isActive
                      ? 'linear-gradient(135deg, #7A0C16 0%, #B80F2E 50%, #F02B4F 100%)'
                      : '#E2E8F0',
                    border: 'none',
                    cursor: 'pointer',
                    transition: prefersReducedMotion ? 'none' : 'all 300ms ease-out',
                    boxShadow: isActive ? '0 2px 6px rgba(184, 15, 46, 0.4)' : 'none',
                    padding: 0,
                  }}
                  className="hover:opacity-80"
                />
              );
            })}
          </div>
        </div>

        {/* View All Projects Button */}
        <div style={{ textAlign: 'center', marginTop: '2.75rem' }}>
          <Link
            to="/portfolio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.85rem 1.85rem',
              borderRadius: '9999px',
              border: '1.5px solid #99152B',
              color: '#99152B',
              backgroundColor: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.9375rem',
              textDecoration: 'none',
              transition: 'all 200ms ease-out',
              boxShadow: '0 2px 8px rgba(122, 12, 22, 0.04)',
            }}
            className="hover:bg-rose-50 hover:border-rose-700 hover:text-rose-800 hover:shadow-md"
          >
            <span>Explore All Projects &amp; Platforms</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .slider-nav-btn:hover {
          background: linear-gradient(135deg, #7A0C16 0%, #B80F2E 50%, #F02B4F 100%) !important;
          color: #FFFFFF !important;
          border-color: #B80F2E !important;
          box-shadow: 0 6px 20px rgba(184, 15, 46, 0.35) !important;
          transform: translateY(-50%) scale(1.08) !important;
        }
        .slider-card-action:hover {
          background: linear-gradient(135deg, #7A0C16 0%, #B80F2E 50%, #F02B4F 100%) !important;
          color: #FFFFFF !important;
          box-shadow: 0 4px 14px rgba(184, 15, 46, 0.4) !important;
        }
        @media (max-width: 639px) {
          .slider-nav-btn-prev {
            left: 0.25rem !important;
          }
          .slider-nav-btn-next {
            right: 0.25rem !important;
          }
        }
        @media (min-width: 640px) {
          .slider-nav-btn-prev {
            left: -1.25rem !important;
          }
          .slider-nav-btn-next {
            right: -1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default StrategicSolutions;
