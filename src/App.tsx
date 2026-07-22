/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { projectsData, formatDate, Project } from "./data";

export default function App() {
  const [lang, setLang] = useState<"RU" | "EN">("RU"); 
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState<"works" | "about">("works");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const translations: Record<"RU" | "EN", any> = {
    RU: { 
      about: "О СЕБЕ", works: "РАБОТЫ", contacts: "КОНТАКТЫ", 
      latest: "ПОСЛЕДНЯЯ РАБОТА", copied: "Скопировано!", close: "ЗАКРЫТЬ",
      more: "Скоро будет больше :)", hi: "ПРИВЕТ, Я ЛИЗА",
      bio: "Мне 20 лет, и последние два года я занимаюсь созданием визуального контента с помощью искусственного интеллекта. Я AI-артист, который любит сочетать художественный подход с новыми технологиями. В прошлом я окончила художественную школу, что дало мне отличную базу для работы с цветом, светом и композицией. Всё это помогает мне создавать нечто уникальное, где искусство и технологии переплетаются в единую структуру.",
      skillsTitle: "HARD SKILLS",
      projectsFor: "СОЗДАВАЛА ПРОЕКТЫ ДЛЯ:", workWith: "Я РАБОТАЮ С:",
      featured: "ИЗБРАННЫЙ ПРОЕКТ И НАГРАДА"
    },
    EN: { 
      about: "ABOUT", works: "WORKS", contacts: "CONTACTS", 
      latest: "LATEST WORK", copied: "Copied!", close: "CLOSE",
      more: "More coming soon :)", hi: "HI, I'M LIZA",
      bio: "I am 20 years old, and for the last two years I have been creating visual content using AI. I am an AI artist who loves to combine an artistic approach with new technologies. My background in art school gave me a solid foundation in color, light, and composition. This helps me create something unique, where art and technology intertwine into a single structure.",
      skillsTitle: "HARD SKILLS",
      projectsFor: "CREATED PROJECTS FOR:", workWith: "I WORK WITH:",
      featured: "FEATURED PROJECT & AWARD"
    }
  };
  const t = translations[lang];
  
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (theme === "light") document.body.classList.add("light-theme");
    else document.body.classList.remove("light-theme");
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleTabChange = (tab: "works" | "about") => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setExpandedProjectId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const latestProject = [...projectsData]
    .filter(p => !p.isAward)
    .sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return projectsData.indexOf(a) - projectsData.indexOf(b);
    })[0];

  const handleOpenLatestWork = () => {
    if (!latestProject) return;
    setActiveTab("works");
    setExpandedProjectId(latestProject.id);
    setTimeout(() => {
      const el = projectRefs.current[latestProject.id];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  const regularWorks = projectsData.filter((p) => !p.isAward);
  const awardProject = projectsData.find((p) => p.isAward);

  return (
    <div className="container min-h-screen">
      <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-left">
          <div className="logo">
            <img 
              src="img/logoforsite.png" 
              alt="Lizai Art" 
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
      {/* ПОЛЗУНКИ ПЕРЕЕХАЛИ СЮДА: Слева направо сразу после логотипа */}
          <div className="header-controls-notch">
            <div className="toggle-capsule" onClick={() => setLang(lang === "RU" ? "EN" : "RU")}>
              <span className={`text-xs font-black tracking-wider transition-colors duration-300 ${lang === "RU" ? "text-[#bc13fe] drop-shadow-[0_0_8px_rgba(188,19,254,0.8)]" : "text-gray-500"}`}>RU</span>
              <div className={`switch-bg mini ${lang === "EN" ? "on" : ""}`}></div>
              <span className={`text-xs font-black tracking-wider transition-colors duration-300 ${lang === "EN" ? "text-[#bc13fe] drop-shadow-[0_0_8px_rgba(188,19,254,0.8)]" : "text-gray-500"}`}>EN</span>
            </div>

            <div className="toggle-capsule" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Moon size={14} className={theme === "dark" ? "text-[#bc13fe] drop-shadow-[0_0_8px_rgba(188,19,254,0.8)]" : "text-gray-500"} />
              <div className={`switch-bg mini ${theme === "light" ? "on" : ""}`}></div>
              <Sun size={14} className={theme === "light" ? "text-[#bc13fe] drop-shadow-[0_0_8px_rgba(188,19,254,0.8)]" : "text-gray-500"} />
            </div>
          </div>
        </div>

        {/* НАЗВАНИЕ СТРАНИЦЫ В ЦЕНТРЕ С ГЛИТЧЕМ */}
        <h1 className="page-title">
          {activeTab === "works" 
            ? (lang === "RU" ? "ВИДЕО РАБОТЫ" : "VIDEO WORKS") 
            : (lang === "RU" ? "О СЕБЕ" : "ABOUT ME")}
        </h1>

        <nav className="desktop-nav">
          <button onClick={() => handleTabChange("works")} className={`nav-main-btn ${activeTab === "works" ? "active" : ""}`}>{t.works}</button>
          <button onClick={() => handleTabChange("about")} className={`nav-main-btn ${activeTab === "about" ? "active" : ""}`}>{t.about}</button>
        </nav>

        <div className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} id="hamburger-btn">
          <span style={{ transform: mobileMenuOpen ? "rotate(45deg) translate(6px, 6px)" : "" }}></span>
          <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
          <span style={{ transform: mobileMenuOpen ? "rotate(-45deg) translate(6px, -6px)" : "" }}></span>
        </div>

        <nav className={`main-nav ${mobileMenuOpen ? "active" : ""}`} id="mobileMenu">
          <ul className="nav-links">
            <li><button onClick={() => handleTabChange("works")} className={activeTab === "works" ? "active" : ""}>{t.works}</button></li>
            <li><button onClick={() => handleTabChange("about")} className={activeTab === "about" ? "active" : ""}>{t.about}</button></li>
          </ul>
        </nav>
      </header>

      <div className="layout">
         <aside className="sidebar-contacts">
          
          {latestProject && (
            <div className="showreel-box" onClick={handleOpenLatestWork}>
              <h4>✦ {t.latest}</h4>
              <div className="showreel-video group relative">
                <img src={latestProject.img} alt="" className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" />
                <video className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100" src={latestProject.hoverVideo} loop muted playsInline />
              </div>
              <div className="showreel-meta">
                <div className="showreel-title">{lang === "RU" ? latestProject.titleRu : latestProject.titleEn}</div>
                <div className="showreel-date">{formatDate(latestProject.date, lang)}</div>
              </div>
            </div>
          )}

          <div className="stars-container">
            <div className="star-anim s1">✦</div><div className="star-anim s2">✦</div><div className="star-anim s3">✦</div>
          </div>

          <div className="contacts-box">
            <h3>{t.contacts}</h3>
            <div className="contact-item" onClick={() => copyEmail("me@ee3e.ru")}>
              <p>✦ EMAIL</p><small>me@ee3e.ru</small>
              <span className={`copy-status ${emailCopied ? "visible" : ""}`}>{t.copied}</span>
            </div>
            <a href="https://t.me/lizai_art" target="_blank" rel="noreferrer" className="block" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="contact-item"><p>✦ TELEGRAM</p><small>@lizai_art</small></div>
            </a>
          </div>
        </aside>

        <main className="content">
          {activeTab === "works" && (
            <div>
              <div className="video-grid" id="videoGrid">
                {regularWorks.map((item, index) => (
                    <VideoCard 
                      key={item.id}
                      project={item}
                      lang={lang}
                      displayNumber={String(index + 1).padStart(2, "0")}
                      isExpanded={expandedProjectId === item.id}
                      refEl={(el: HTMLDivElement | null) => { projectRefs.current[item.id] = el; }}
                      onExpand={() => {
                        if (expandedProjectId === item.id) return;
                        setExpandedProjectId(item.id);
                        setTimeout(() => {
                          projectRefs.current[item.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }, 300);
                      }}
                      onClose={(e) => { e.stopPropagation(); setExpandedProjectId(null); }}
                    />
                ))}
              </div>
              <p className="footer-note">{t.more}</p>
            </div>
          )}

          {activeTab === "about" && (
            <div>
              <div className="about-top animate-fade-in">
                <div className="about-photo">
                  <img src="img/my-photo.png" alt="" className="photo-main" />
                  <img src="img/my-photo2.png" alt="" className="photo-hover" />
                </div>
                <div className="intro-text">
                  <h2>{t.hi}</h2>
                  <p>{t.bio}</p>      
                </div>
              </div>

              {awardProject && (
                <div className="mb-20">
                  <h3 className="section-title">{t.featured}</h3>
                  <VideoCard 
                    project={awardProject}
                    lang={lang}
                    displayNumber="FEATURED"
                    isExpanded={expandedProjectId === awardProject.id}
                    isAwardStyle={true}
                    refEl={(el: HTMLDivElement | null) => { projectRefs.current[awardProject.id] = el; }}
                    onExpand={() => {
                      if (expandedProjectId === awardProject.id) return;
                      setExpandedProjectId(awardProject.id);
                    }}
                    onClose={(e) => { e.stopPropagation(); setExpandedProjectId(null); }}
                  />
                </div>
              )}

              <div className="skills-section">
                <h3 className="section-title">{t.skillsTitle}</h3>
                <div className="skills-grid">
                  <span className="skill-tag">COMFY UI</span>
                  <span className="skill-tag">AFTER EFFECTS</span>
                  <span className="skill-tag">PHOTOSHOP</span>
                  <span className="skill-tag">PREMIERE PRO</span>
                  <span className="skill-tag">MIRO / FIGMA</span>
                </div>
              </div>

              <h3 className="section-title">{t.projectsFor}</h3>
              <div className="logos-grid brands-grid">
                {Array.from({ length: 15 }, (_, i) => i + 1).map((idx) => (
                  <img key={`brand-${idx}`} src={`img/brend${idx}.png`} alt="" />
                ))}
              </div>

              <h3 className="section-title">{t.workWith}</h3>
              <div className="logos-grid studios-grid">
                {Array.from({ length: 6 }, (_, i) => i + 1).map((idx) => (
                  <img key={`studio-${idx}`} src={`img/studio${idx}.png`} alt="" />
                ))}
                <img key={`studio0`} src={`img/studio0.png`} alt="" />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

interface VideoCardProps {
  project: Project;
  lang: "RU" | "EN";
  displayNumber: string;
  isExpanded: boolean;
  isAwardStyle?: boolean;
  onExpand: () => void;
  onClose: (e: React.MouseEvent) => void;
  refEl: (node: any) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  project, 
  lang,
  displayNumber, 
  isExpanded, 
  isAwardStyle = false, 
  onExpand, 
  onClose,
  refEl
}) => {
  const hoverVideoRef = useRef<HTMLVideoElement | null>(null);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (isExpanded) return;
    if (hoverVideoRef.current) hoverVideoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (hoverVideoRef.current) {
      hoverVideoRef.current.pause();
      hoverVideoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (mainVideoRef.current) {
      if (isExpanded) mainVideoRef.current.play().catch(() => {});
      else {
        mainVideoRef.current.pause();
        mainVideoRef.current.currentTime = 0;
      }
    }
  }, [isExpanded]);

  const customCardClass = isAwardStyle 
    ? `video-card expanded-award ${isExpanded ? "expanded" : ""}` 
    : `video-card ${isExpanded ? "expanded" : ""}`;

  return (
    <div ref={refEl} className={customCardClass} onClick={onExpand} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {!isAwardStyle && <span className="video-number">{displayNumber}</span>}

      <div className="video-preview">
        <img 
          src={project.img} 
          alt={lang === "RU" ? project.titleRu : project.titleEn} 
          className="thumb-img" 
        />
        <video ref={hoverVideoRef} className="hover-video" src={project.hoverVideo} loop muted playsInline />
      </div>

      <div className="full-player">
        <video ref={mainVideoRef} className="main-video" src={project.fullVideo} controls playsInline preload="auto" />
        <div className="close-btn" onClick={onClose}>
          × {lang === "RU" ? "ЗАКРЫТЬ" : "CLOSE"}
        </div>
      </div>

      {isAwardStyle ? (
        <div className="video-info award-info">
          <h4 className="award-tag">{lang === "RU" ? project.titleRu : project.titleEn}</h4>
          <p dangerouslySetInnerHTML={{ __html: lang === "RU" ? project.descRu : project.descEn }}></p>
        </div>
      ) : (
        <div className="video-info">
          <h2>{lang === "RU" ? project.titleRu : project.titleEn}</h2>
          <p>{lang === "RU" ? project.descRu : project.descEn}</p>
        </div>
      )}
    </div>
  );
}
