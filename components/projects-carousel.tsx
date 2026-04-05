"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/content";
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

export function ProjectsCarousel() {
  const { lang } = useLanguage();
  const projectsContent = content[lang].projects;

  const [projects, setProjects] = useState<Project[]>([]);
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
          setProjects([]);
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
        setProjects([]);
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
            <div className="text-white/60">{projectsContent.loading}</div>
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
            {projectsContent.label}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            {projectsContent.title}
          </h2>
          <p className="mt-4 text-sm text-white/50 max-w-2xl mx-auto">
            {projectsContent.description}
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
                        className="h-full w-full object-cover transition-transform"
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
                            {projectsContent.buttons.viewProject}
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
                            {projectsContent.buttons.viewCode}
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
          {projects.length} {projectsContent.projectsAvailable}
        </p>
      </div>
    </section>
  );
}
