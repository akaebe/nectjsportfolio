"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import { ExternalLink, Github, Play, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: "Election Agent Activity Analysis Dashboard",
    category: "Analytics",
    description: "A React-powered analytics dashboard delivering real-time, data-driven insights into BLA’s activities and performance trends.",
    longDescription: "A React-based analytics dashboard that transforms complex political data into clear, actionable insights. It visualizes BLA’s activities and performance metrics using interactive charts and heatmaps, offering real-time tracking and trend analysis through a responsive, modular interface.",
    image: "https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?_gl=1*6hs1nq*_ga*MzkyODgzNDcuMTcxOTYwMTQyMQ..*_ga_8JE65Q40S6*czE3NjA4ODE5NzgkbzEwJGcxJHQxNzYwODgyMjU2JGozOCRsMCRoMA..",
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Chart.js","Vite"],
    github: "https://github.com/akaebe/analyticsDashBoard",
    live: "https://app.supademo.com/embed/cmgpwgru8052eiyrork3zy7fz?embed_v=2&utm_source=embed",
    featured: false,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "AC Trend Analyser",
    category: "Analytics",
    description: "Interactive React tool for analyzing election trends with Sankey diagrams, dynamic tables, and customizable exports.",
    longDescription: "Assembly Constituency Trend Analyzer – An interactive React-based tool for visualizing election trends using Sankey diagrams, dynamic tables, and bucket-based visualizations. It features advanced filtering, sorting, and state management with Zustand, allowing users to customize analyses, save presets, and export detailed reports as PDFs.",
    image: "https://appsfortableau.infotopics.com/wp-content/uploads/2018/06/sankey_appsfortableau_screen.png",
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "D3-Sankey", "Vite","Zustand","MUI" ,"Pdf"],
    github: "#",
    live: "https://app.supademo.com/embed/cmguovhqa3ugzyzgy71ddevzb?embed_v=2&utm_source=embed",
    featured: false,
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 3,
    title: " Political Insights Dashboard",
    category: "Dashboard",
    description: "An interactive Next.js-based tool visualizing Tamil Nadu voter data with React Leaflet maps, enabling party alliance comparisons and winability predictions using Redux state management.",
    longDescription: "The Political Insights Dashboard is an advanced data visualization platform built with Next.js, Redux, and React Leaflet, focused on Tamil Nadu’s electoral landscape. It allows users to explore voter demographics, compare party alliances, and analyze winability trends across constituencies. With dynamic maps and responsive visual elements, the tool delivers actionable political insights through clean, interactive design.",
    image: "data:image/jpeg;base64,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",
    tech: [ "TypeScript", "Next.js", "React Leaflet", "Chart js", "MUI", "Redux"],
    github: "#",
    live: "https://app.supademo.com/embed/cmh854xie0sx46133dx9ppzr5?embed_v=2&utm_source=embed",
    featured: false,
    color: "from-orange-500 to-red-500"
  },
];

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Dashboard' ,'Analytics'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate project cards with stagger
            anime({
              targets: '.project-card',
              translateY: [60, 0],
              opacity: [0, 1],
              rotateX: [15, 0],
              scale: [0.9, 1],
              delay: anime.stagger(150),
              duration: 1000,
              easing: 'easeOutExpo'
            });

            // Animate filter buttons
            anime({
              targets: '.filter-btn',
              scale: [0.8, 1],
              opacity: [0, 1],
              delay: anime.stagger(100, { start: 300 }),
              duration: 600,
              easing: 'easeOutBack'
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    
    // Animate filter transition
    anime({
      targets: '.project-card',
      scale: [1, 0.8, 1],
      opacity: [1, 0.3, 1],
      duration: 600,
      easing: 'easeInOutQuart'
    });
  };

  return (
    <section ref={sectionRef} id="work" className=" relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
  style={{
    position: 'relative',
    boxSizing: 'content-box',
    maxHeight: '80vh',
    width: '100%',
    aspectRatio: '2.1915621436716077',
    padding: '40px 0 40px 0'
  }}
>
</div>
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black mb-6 animated-gradient-text"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured Work
          </motion.h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            A showcase of innovative projects that push the boundaries of web development and user experience design
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`filter-btn px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'glass border border-white/20 text-white/70 hover:text-white hover:border-white/40'
              }`}
              data-cursor-hover
              data-magnetic
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card group relative ${
                project.featured ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
              layout
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-0 glass hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02] h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      project.featured ? 'h-80' : 'h-64'
                    }`}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      size="sm"
                      className="glass border border-white/20 text-white hover:bg-white/20"
                      data-cursor-hover
                      onClick={()=>window.open(project.github,"_blank")}

                    >
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="glass border border-white/20 text-white hover:bg-white/20"
                      data-cursor-hover
                      onClick={()=>window.open(project.live,"_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* View Details Button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <Button
                      onClick={() => setSelectedProject(project)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                      data-cursor-hover
                    >
                      <Play className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-purple-400">{project.category}</span>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, project.featured ? 6 : 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full glass border border-white/10 text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > (project.featured ? 6 : 4) && (
                      <span className="px-3 py-1 text-xs rounded-full glass border border-white/10 text-white/60">
                        +{project.tech.length - (project.featured ? 6 : 4)} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        {/* <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="px-8 py-6 text-lg font-semibold glass border border-white/20 text-white hover:bg-white/10 rounded-full"
            data-cursor-hover
            data-magnetic
          >
            View All Projects
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </motion.div> */}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto glass rounded-2xl border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 glass rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors"
                data-cursor-hover
              >
                <X className="w-5 h-5" />
              </button>

              {/* Project Image */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Project Details */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full">
                    {selectedProject.category}
                  </span>
                  {selectedProject.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>

                <h3 className="text-3xl font-bold mb-4 text-white">
                  {selectedProject.title}
                </h3>

                <p className="text-white/80 mb-6 leading-relaxed text-lg">
                  {selectedProject.longDescription}
                </p>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3 text-white">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 glass border border-white/20 text-white rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    data-cursor-hover
                      onClick={()=>window.open(selectedProject.live,'_blank')}

                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Site
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 glass border border-white/20 text-white hover:bg-white/10"
                    data-cursor-hover
                      onClick={()=>window.open(selectedProject.github,"_blank")}

                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}