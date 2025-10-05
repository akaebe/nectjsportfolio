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
    title: "NeuroFlow Dashboard",
    category: "SaaS Platform",
    description: "AI-powered analytics dashboard with real-time data visualization and predictive insights",
    longDescription: "A comprehensive SaaS platform featuring advanced AI analytics, real-time data processing, and interactive visualizations. Built with cutting-edge technologies to deliver exceptional performance and user experience.",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tech: ["React", "TypeScript", "D3.js", "WebGL", "Node.js", "PostgreSQL"],
    github: "#",
    live: "#",
    featured: true,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Immersive E-Commerce",
    category: "E-Commerce",
    description: "Next-generation shopping experience with 3D product visualization and AR integration",
    longDescription: "Revolutionary e-commerce platform featuring 3D product models, augmented reality try-on experiences, and seamless checkout flows. Optimized for conversion and user engagement.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tech: ["Next.js", "Three.js", "WebXR", "Stripe", "Prisma", "Vercel"],
    github: "#",
    live: "#",
    featured: true,
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 3,
    title: "Creative Studio Portfolio",
    category: "Portfolio",
    description: "Award-winning creative agency website with stunning animations and interactions",
    longDescription: "A visually striking portfolio website for a creative agency, featuring advanced GSAP animations, WebGL effects, and immersive storytelling experiences.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tech: ["Vue.js", "GSAP", "WebGL", "Nuxt.js", "Contentful"],
    github: "#",
    live: "#",
    featured: false,
    color: "from-orange-500 to-red-500"
  },
  {
    id: 4,
    title: "FinTech Mobile App",
    category: "Mobile App",
    description: "Secure financial management app with biometric authentication and real-time trading",
    longDescription: "A comprehensive financial management application featuring secure transactions, real-time market data, and advanced portfolio analytics with beautiful, intuitive design.",
    image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tech: ["React Native", "TypeScript", "Redux", "Firebase", "Plaid API"],
    github: "#",
    live: "#",
    featured: false,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 5,
    title: "AI Content Generator",
    category: "AI Platform",
    description: "Advanced AI-powered content creation platform with natural language processing",
    longDescription: "Cutting-edge AI platform that generates high-quality content using advanced machine learning models, featuring intuitive interfaces and powerful customization options.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tech: ["Python", "TensorFlow", "React", "FastAPI", "Docker", "AWS"],
    github: "#",
    live: "#",
    featured: false,
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 6,
    title: "Social Media Analytics",
    category: "Analytics",
    description: "Comprehensive social media analytics platform with sentiment analysis and trend prediction",
    longDescription: "Advanced analytics platform providing deep insights into social media performance, audience behavior, and content optimization strategies with beautiful data visualizations.",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tech: ["Angular", "Chart.js", "Python", "MongoDB", "Redis", "Docker"],
    github: "#",
    live: "#",
    featured: false,
    color: "from-pink-500 to-rose-500"
  }
];

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'SaaS Platform', 'E-Commerce', 'Portfolio', 'Mobile App', 'AI Platform', 'Analytics'];
  
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
    <section ref={sectionRef} id="work" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
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
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="glass border border-white/20 text-white hover:bg-white/20"
                      data-cursor-hover
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
        <motion.div
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
        </motion.div>
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
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Site
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 glass border border-white/20 text-white hover:bg-white/10"
                    data-cursor-hover
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