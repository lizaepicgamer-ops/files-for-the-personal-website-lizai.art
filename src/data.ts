/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  desc: string;
  img: string;
  hoverVideo: string;
  fullVideo: string;
  date: string; // YYYY-MM format, e.g., "2026-06"
  isAward?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "yandex-auto-2",
    title: "Yandex Auto 2",
    desc: "AI-generalist | 2026",
    img: "img/8.jpg",
    hoverVideo: "video/8.mp4",
    fullVideo: "video/full/8.mp4",
    date: "2026-06",
  },
  {
    id: "yandex-auto-1",
    title: "Yandex Auto 1",
    desc: "AI-generalist | 2026",
    img: "img/7.jpg",
    hoverVideo: "video/7.mp4",
    fullVideo: "video/full/7.mp4",
    date: "2026-05",
  },
  {
    id: "yandex-alisa",
    title: "Яндекс Алиса",
    desc: "AI-generalist | 2025",
    img: "img/1.jpg",
    hoverVideo: "video/1.mp4",
    fullVideo: "video/full/1.mp4",
    date: "2025-12",
  },
  {
    id: "vtb",
    title: "ВТБ",
    desc: "AI-generalist | 2025",
    img: "img/2.jpg",
    hoverVideo: "video/2.mp4",
    fullVideo: "video/full/2.mp4",
    date: "2025-11",
  },
  {
    id: "mosmetro",
    title: "МосМетро",
    desc: "AI-generalist | ArtDirector | 2025",
    img: "img/3.jpg",
    hoverVideo: "video/3.mp4",
    fullVideo: "video/full/3.mp4",
    date: "2025-10",
  },
  {
    id: "volkswagen",
    title: "Volkswagen",
    desc: "AI-generalist | ArtDirector | 2025",
    img: "img/4.jpg",
    hoverVideo: "video/4.mp4",
    fullVideo: "video/full/4.mp4",
    date: "2025-09",
  },
  {
    id: "gipopo",
    title: "Gipopo",
    desc: "AI-generalist | 2025",
    img: "img/5.jpg",
    hoverVideo: "video/5.mp4",
    fullVideo: "video/full/5.mp4",
    date: "2025-08",
  },
  {
    id: "borjomi",
    title: "BORJOMI",
    desc: "HEAD AI-generalist | 2025",
    img: "img/9.jpg",
    hoverVideo: "video/9.mp4",
    fullVideo: "video/full/9.mp4",
    date: "2025-07",
  },
  {
    id: "intervision",
    title: "Intervision",
    desc: "HEAD AI-generalist | 2025",
    img: "img/10.jpg",
    hoverVideo: "video/10.mp4",
    fullVideo: "video/full/10.mp4",
    date: "2025-06",
  },
  {
    id: "n1",
    title: "N1",
    desc: "AI-generalist | 2025",
    img: "img/12.jpg",
    hoverVideo: "video/12.mp4",
    fullVideo: "video/full/12.mp4",
    date: "2025-05",
  },
  {
    id: "omoda",
    title: "OMODA",
    desc: "AI-generalist | 2025",
    img: "img/13.jpg",
    hoverVideo: "video/13.mp4",
    fullVideo: "video/full/13.mp4",
    date: "2025-04",
  },
  {
    id: "vk-glaza",
    title: "VK Глаза",
    desc: "AI-generalist | 2025",
    img: "img/14.jpg",
    hoverVideo: "video/14.mp4",
    fullVideo: "video/full/14.mp4",
    date: "2025-03",
  },
  {
    id: "miratorg",
    title: "Мираторг",
    desc: "AI-generalist | 2025",
    img: "img/15.jpg",
    hoverVideo: "video/15.mp4",
    fullVideo: "video/full/15.mp4",
    date: "2025-02",
  },
  {
    id: "obi",
    title: "OBI",
    desc: "AI-generalist | 2024",
    img: "img/6.jpg",
    hoverVideo: "video/6.mp4",
    fullVideo: "video/full/6.mp4",
    date: "2024-11",
  },
  {
    id: "fonbet",
    title: "FONBET",
    desc: "AI-generalist | 2024",
    img: "img/11.jpg",
    hoverVideo: "video/11.mp4",
    fullVideo: "video/full/11.mp4",
    date: "2024-10",
  },
  {
    id: "silver-cup",
    title: "✦ СЕРЕБРО НА КУБКЕ НЕЙРОКОНТЕНТА",
    desc: "Theta group | Спецпроект президентской платформы «Россия - страна возможностей»",
    img: "img/16.jpg",
    hoverVideo: "video/silver_place.mp4",
    fullVideo: "video/full/silver_place.mp4",
    date: "2025-10",
    isAward: true,
  }
];

/**
 * Format string YYYY-MM to word date (e.g., "June 2026")
 */
export function formatEnglishDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthIdx = parseInt(month, 10) - 1;
  const monthWord = monthNames[monthIdx] || "";
  return `${monthWord} ${year}`;
}
