"use client";

import { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import axios from "axios";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Portfolio Liquid Glass",
    description:
      "Un portafolio moderno con diseño liquid glass, tema oscuro y sistema bilingüe (español/inglés). Construido con Next.js 16 y Tailwind CSS.",
    image: "https://via.placeholder.com/600x400?text=Portfolio+Liquid+Glass",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://portfolio.example.com",
    github: "https://github.com/example/portfolio",
  },
  {
    id: "2",
    title: "E-commerce Platform",
    description:
      "Plataforma de comercio electrónico con carrito de compras, sistema de pagos integrado y gestión de inventario en tiempo real.",
    image: "https://via.placeholder.com/600x400?text=E-commerce+Platform",
    tags: ["React", "Firebase", "Stripe", "Node.js"],
    link: "https://ecommerce.example.com",
    github: "https://github.com/example/ecommerce",
  },
  {
    id: "3",
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas con colaboración en tiempo real, sistema de notificaciones y sincronización en múltiples dispositivos.",
    image: "https://via.placeholder.com/600x400?text=Task+Management",
    tags: ["React Native", "Firebase", "Redux", "Expo"],
    link: "https://tasks.example.com",
    github: "https://github.com/example/tasks",
  },
];

export function ProjectsCarousel() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  // Fetch projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "proyectos"));
        
        if (querySnapshot.empty) {
          // Use mock data if no projects found
          console.log("No projects found in Firestore, using mock data");
          setProjects(MOCK_PROJECTS);
        } else {
          const fetchedProjects = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Project[];
          setProjects(fetchedProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback to mock data on error
        setProjects(MOCK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle carousel navigation
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (loading) {
    return (
      <section id="projects" className="relative px-6 py-28 md:py-36">
        <div className="mx-auto max-w-full">
          <div className="flex items-center justify-center h-96">
            <div className="text-white/60">Cargando proyectos...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto flex w-full max-w-full flex-col items-center">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/60">
            Portafolio
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            Proyectos Destacados
          </h2>
          <p className="mt-4 text-sm text-white/50 max-w-2xl mx-auto">
            Explora una selección de proyectos que demuestran mi experiencia en
            desarrollo frontend, diseño de interfaces y soluciones innovadoras.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full flex items-center justify-center">
          {/* Carousel */}
          <div
            className="w-full md:max-w-[80%] overflow-hidden"
            ref={emblaRef}
          >
            <div className="flex -ml-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="min-w-full pl-4 flex justify-center"
                >
                  {/* Project Card */}
                  <article
                    className="group glass rounded-3xl overflow-hidden
                    w-full max-w-2xl transition-all duration-500
                    hover:-translate-y-2
                    hover:border-white/30
                    hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                  >
                    {/* Image Container */}
                    <div className="relative h-96 overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500
                        group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/60
                        via-transparent to-transparent"
                      />
                    </div>

                    {/* Content Container */}
                    <div className="relative p-8 md:p-10">
                      {/* Title */}
                      <h3
                        className="text-2xl md:text-3xl font-bold text-white mb-3
                        group-hover:text-white transition-colors"
                      >
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-sm md:text-base leading-relaxed text-white/70
                        group-hover:text-white/80 transition-colors mb-6"
                      >
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="glass-chip rounded-full px-3 py-1
                            text-xs font-medium text-white/70
                            transition-all duration-300
                            hover:text-white hover:bg-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex gap-3">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2
                            px-4 py-2 rounded-lg
                            glass transition-all duration-300
                            hover:border-white/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
                            text-white/80 hover:text-white"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Ver Proyecto
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2
                            px-4 py-2 rounded-lg
                            glass transition-all duration-300
                            hover:border-white/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
                            text-white/80 hover:text-white"
                          >
                            <Github className="h-4 w-4" />
                            Código
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20
            z-10 p-2 rounded-full glass
            transition-all duration-300
            hover:border-white/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
            disabled:opacity-40 disabled:cursor-not-allowed
            text-white/70 hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20
            z-10 p-2 rounded-full glass
            transition-all duration-300
            hover:border-white/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
            disabled:opacity-40 disabled:cursor-not-allowed
            text-white/70 hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="mt-10 flex gap-2 justify-center">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === 0
                  ? "w-8 bg-white/70"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* Project Count */}
        <p className="mt-8 text-sm text-white/50">
          {projects.length} proyectos disponibles
        </p>
      </div>
    </section>
  );
}
