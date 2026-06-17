/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { projectsData, formatEnglishDate, Project } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<"works" | "about">("works");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  
  // Refs for video components to handle scroll-into-view
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Detect scroll state for shrinking header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Copy email helper
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // Switch tab helper
  const handleTabChange = (tab: "works" | "about") => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    // Un-expand any videos on tab switch
    setExpandedProjectId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Find the single absolute freshest project (the one loaded latest/closest to current date)
  // We sort projects latest to oldest based on "date" string (YYYY-MM)
  const latestProject = [...projectsData]
    .filter(p => !p.isAward) // only standard works
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  // Helper to open latest work (triggered by sidebar)
  const handleOpenLatestWork = () => {
    if (!latestProject) return;
    setActiveTab("works");
    setExpandedProjectId(latestProject.id);
    
    // Smooth scroll to the card
    setTimeout(() => {
      const el = projectRefs.current[latestProject.id];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 200);
  };

  // Filter regular works and award works from data array
  const regularWorks = projectsData.filter((p) => !p.isAward);
  const awardProject = projectsData.find((p) => p.isAward);

  return (
    <div className="container min-h-screen">
      {/* HEADER */}
      <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-left">
          <div className="logo">
            <img 
              src="img/logo.png" 
              alt="Lizai Art" 
              onError={(e) => {
                // simple fallback placeholder if real logo image is not present
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <h1 className="page-title">
            {activeTab === "works" ? "VIDEO WORKS" : "ABOUT ME"}
          </h1>
        </div>

        {/* HAMBURGER TOGGLE */}
        <div 
          className="menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          id="hamburger-btn"
        >
          <span style={{ transform: mobileMenuOpen ? "rotate(45deg) translate(6px, 6px)" : "" }}></span>
          <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
          <span style={{ transform: mobileMenuOpen ? "rotate(-45deg) translate(6px, -6px)" : "" }}></span>
        </div>

        {/* NAVIGATION MENUS */}
        <nav className={`main-nav ${mobileMenuOpen ? "active" : ""}`} id="mobileMenu">
          <ul className="nav-links">
            <li>
              <button 
                onClick={() => handleTabChange("about")} 
                className={activeTab === "about" ? "active" : ""}
              >
                О СЕБЕ
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabChange("works")} 
                className={activeTab === "works" ? "active" : ""}
              >
                РАБОТЫ
              </button>
            </li>
          </ul>
          <div className="mobile-contacts">
            <h3>КОНТАКТЫ</h3>
            <p onClick={() => copyEmail("me@ee3e.ru")} className="cursor-pointer">me@ee3e.ru</p>
            <p>@lizai_art</p>
          </div>
        </nav>
      </header>

      {/* CORE LAYOUT */}
      <div className="layout">
        
        {/* SIDEBAR FOR DESKTOP */}
        <aside className="sidebar-contacts">
          
          {/* LATEST WORK - Replaced standard Coming Soon showreel */}
          {latestProject && (
            <div className="showreel-box" onClick={handleOpenLatestWork}>
              <h4>✦ LATEST WORK</h4>
              <div className="showreel-video group relative">
                <img 
                  src={latestProject.img} 
                  alt={latestProject.title} 
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" 
                  onError={(e) => {
                    // Fallback visual background
                    e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=640&auto=format&fit=crop";
                  }}
                />
                <video 
                  className="absolute inset-0 w-full h-full object-fit-cover hover-video opacity-0 group-hover:opacity-100" 
                  src={latestProject.hoverVideo} 
                  loop 
                  muted 
                  autoPlay 
                  playsInline 
                />
              </div>
              <div className="showreel-meta">
                <div className="showreel-title">{latestProject.title}</div>
                <div className="showreel-date">
                  {formatEnglishDate(latestProject.date)}
                </div>
              </div>
            </div>
          )}

          {/* STARS ANIMATION DECOR */}
          <div className="stars-container">
            <div className="star-anim s1">✦</div>
            <div className="star-anim s2">✦</div>
            <div className="star-anim s3">✦</div>
          </div>

          {/* CONTACTS CARD */}
          <div className="contacts-box">
            <h3>КОНТАКТЫ</h3>
            
            <div 
              className="contact-item" 
              onClick={() => copyEmail("me@ee3e.ru")}
            >
              <p>✦ EMAIL</p>
              <small>me@ee3e.ru</small>
              <span className={`copy-status ${emailCopied ? "visible" : ""}`}>
                Скопировано!
              </span>
            </div>

            <a 
              href="https://t.me/lizai_art" 
              target="_blank" 
              rel="noreferrer" 
              className="block"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="contact-item">
                <p>✦ TELEGRAM</p>
                <small>@lizai_art</small>
              </div>
            </a>
          </div>
        </aside>

        {/* CORE MAIN STAGE */}
        <main className="content">
          
          {/* TAB 1: VIDEO WORKS */}
          {activeTab === "works" && (
            <div>
              <div className="video-grid" id="videoGrid">
                {regularWorks.map((item, index) => {
                  const displayNum = String(index + 1).padStart(2, "0");
                  const isExpanded = expandedProjectId === item.id;
                  
                  return (
                    <VideoCard 
                      key={item.id}
                      project={item}
                      displayNumber={displayNum}
                      isExpanded={isExpanded}
                      refEl={(el) => {
                        projectRefs.current[item.id] = el;
                      }}
                      onExpand={() => {
                        if (isExpanded) return;
                        setExpandedProjectId(item.id);
                        // Smooth scroll to card
                        setTimeout(() => {
                          projectRefs.current[item.id]?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                        }, 300);
                      }}
                      onClose={(e) => {
                        e.stopPropagation();
                        setExpandedProjectId(null);
                      }}
                    />
                  );
                })}
              </div>
              <p className="footer-note">More coming soon :)</p>
            </div>
          )}

          {/* TAB 2: ABOUT ME */}
          {activeTab === "about" && (
            <div>
              {/* Profile Intro Section */}
              <div className="about-top animate-fade-in">
                <div className="about-photo">
                  <img 
                    src="img/my-photo.png" 
                    alt="Liza Main" 
                    className="photo-main"
                    onError={(e) => {
                      // fallback nicely
                      e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop";
                    }}
                  />
                  <img 
                    src="img/my-photo2.png" 
                    alt="Liza Hover" 
                    className="photo-hover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop";
                    }}
                  />
                </div>
                <div className="intro-text">
                  <h2>ПРИВЕТ, Я ЛИЗА</h2>
                  <p>
                    Мне 20 лет, и последние два года я занимаюсь созданием визуального контента с помощью искусственного интеллекта. Я AI-артист, который любит сочетать художественный подход с новыми технологиями. В прошлом я окончила художественную школу, что дало мне отличную базу для работы с цветом, светом и композицией. Всё это помогает мне создавать нечто уникальное, где искусство и технологии переплетаются в единую структуру.
                  </p>
                </div>
              </div>

              {/* FEATURED PROJECT & AWARD */}
              {awardProject && (
                <div className="mb-20">
                  <h3 className="section-title">FEATURED PROJECT & AWARD</h3>
                  <VideoCard 
                    project={awardProject}
                    displayNumber="FEATURED"
                    isExpanded={expandedProjectId === awardProject.id}
                    isAwardStyle={true}
                    refEl={(el) => {
                      projectRefs.current[awardProject.id] = el;
                    }}
                    onExpand={() => {
                      if (expandedProjectId === awardProject.id) return;
                      setExpandedProjectId(awardProject.id);
                    }}
                    onClose={(e) => {
                      e.stopPropagation();
                      setExpandedProjectId(null);
                    }}
                  />
                </div>
              )}

              {/* SKILLS */}
              <div className="skills-section">
                <h3 className="section-title">HARD SKILLS</h3>
                <div className="skills-grid">
                  <span className="skill-tag">COMFY UI</span>
                  <span className="skill-tag">AFTER EFFECTS</span>
                  <span className="skill-tag">PHOTOSHOP</span>
                  <span className="skill-tag">PREMIERE PRO</span>
                  <span className="skill-tag">MIRO / FIGMA</span>
                </div>
              </div>

              {/* BRANDS LISTS */}
              <h3 className="section-title">CREATED PROJECTS FOR:</h3>
              <div className="logos-grid brands-grid">
                {Array.from({ length: 15 }, (_, i) => i + 1).map((idx) => (
                  <img 
                    key={`brand-${idx}`}
                    src={`img/brend${idx}.png`} 
                    alt={`BrandLogo ${idx}`} 
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ))}
              </div>

              {/* STUDIOS LIST */}
              <h3 className="section-title">I WORK WITH:</h3>
              <div className="logos-grid studios-grid">
                {Array.from({ length: 6 }, (_, i) => i + 1).map((idx) => (
                  <img 
                    key={`studio-${idx}`}
                    src={`img/studio${idx}.png`} 
                    alt={`StudioLogo ${idx}`} 
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

/**
 * A reusable VideoCard component to play hover movies & handle YouTube style collapsible previews
 */
interface VideoCardProps {
  project: Project;
  displayNumber: string;
  isExpanded: boolean;
  isAwardStyle?: boolean;
  onExpand: () => void;
  onClose: (e: React.MouseEvent) => void;
  refEl: (node: HTMLDivElement | null) => void;
}

function VideoCard({ 
  project, 
  displayNumber, 
  isExpanded, 
  isAwardStyle = false, 
  onExpand, 
  onClose,
  refEl
}: VideoCardProps) {
  const hoverVideoRef = useRef<HTMLVideoElement | null>(null);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);

  // Play hover video when cursor approaches CARD
  const handleMouseEnter = () => {
    if (isExpanded) return;
    if (hoverVideoRef.current) {
      hoverVideoRef.current.play().catch(() => {});
    }
  };

  // Pause hover video when cursor leaves CARD
  const handleMouseLeave = () => {
    if (hoverVideoRef.current) {
      hoverVideoRef.current.pause();
      hoverVideoRef.current.currentTime = 0;
    }
  };

  // Autoplay or pause expanded video based on state
  useEffect(() => {
    if (mainVideoRef.current) {
      if (isExpanded) {
        mainVideoRef.current.play().catch(() => {});
      } else {
        mainVideoRef.current.pause();
        mainVideoRef.current.currentTime = 0;
      }
    }
  }, [isExpanded]);

  // Award vs standard classes
  const customCardClass = isAwardStyle 
    ? `video-card expanded-award ${isExpanded ? "expanded" : ""}` 
    : `video-card ${isExpanded ? "expanded" : ""}`;

  return (
    <div 
      ref={refEl}
      className={customCardClass}
      onClick={onExpand}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic index number */}
      {!isAwardStyle && <span className="video-number">{displayNumber}</span>}

      {/* Mini preview for works grid list */}
      <div className="video-preview">
        <img 
          src={project.img} 
          alt={project.title} 
          className="thumb-img" 
          onError={(e) => {
            // fallback gracefully with a beautiful pattern
            e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=640&auto=format&fit=crop";
          }}
        />
        <video 
          ref={hoverVideoRef}
          className="hover-video" 
          src={project.hoverVideo} 
          loop 
          muted 
          playsInline 
        />
      </div>

      {/* YouTube Style player on click expand */}
      <div className="full-player">
        <video 
          ref={mainVideoRef}
          className="main-video" 
          src={project.fullVideo} 
          controls 
          playsInline 
          preload="auto" 
        />
        <div className="close-btn" onClick={onClose}>
          × ЗАКРЫТЬ
        </div>
      </div>

      {/* Info under the thumbnail & player */}
      {isAwardStyle ? (
        <div className="video-info award-info">
          <h4 className="award-tag">{project.title}</h4>
          <p dangerouslySetInnerHTML={{ __html: project.desc }}></p>
        </div>
      ) : (
        <div className="video-info">
          <h2>{project.title}</h2>
          <p>{project.desc}</p>
        </div>
      )}
    </div>
  );
}
