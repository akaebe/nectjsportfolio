"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { Calendar, MapPin, Coffee, Code, Award, Users, Zap, Heart } from 'lucide-react';

const timeline = [
  {
    year: "2025/01",
    title: "Frontend Developer Intern",
    company: "The Populous Empowerment Network (PEN).",
    description: "Developing and maintaining scalable web applications•	 using Next.js, TypeScript, and Redux Toolkit.",
    icon: Code,
    achievements: ["Implemented React Leaflet for TamilNadu Map visualization", "Implemented chart js for data visualization", ]
  },
 
  {
    year: "2024/02",
    title: "Project Intern",
    company: "Combat Vehicles Research & Development Establishment(CVRDE)",
    description: "Developed a multi-object tracker for combat vehicles in YoloV9 using Ultralytics",
    icon: Users,
    achievements: ["Utilized Roboflow to train custom datasets", "Integrated Byte tracker for Multi Object Tracker"]
  },
  {
    year: "2024",
    title: "Information Technology Graduate",
    company: "Panimalar Engineering College",
    // description: "Graduated Summa Cum Laude with specialization in Human-Computer Interaction",
    icon: Calendar,
    achievements: ["GPA: 8.68/10",  "Published 2 research papers"]
  }
];

const personalStats = [
  { icon: Coffee, label: "Cups of Coffee", value: "654", color: "from-amber-500 to-orange-500" },
  { icon: Code, label: "Lines of Code", value: "5K+", color: "from-green-500 to-emerald-500" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate timeline items
            anime({
              targets: '.timeline-item',
              translateX: [-100, 0],
              opacity: [0, 1],
              rotateY: [15, 0],
              delay: anime.stagger(300),
              duration: 1000,
              easing: 'easeOutExpo'
            });

            // Animate timeline line
            anime({
              targets: '.timeline-line',
              height: ['0%', '100%'],
              duration: 2500,
              easing: 'easeOutExpo',
              delay: 500
            });

            // Animate stats
            anime({
              targets: '.stat-card',
              scale: [0.8, 1],
              opacity: [0, 1],
              delay: anime.stagger(150, { start: 1000 }),
              duration: 800,
              easing: 'easeOutBack'
            });

            // Animate personal info
            anime({
              targets: '.personal-info',
              translateY: [30, 0],
              opacity: [0, 1],
              delay: 800,
              duration: 1000,
              easing: 'easeOutExpo'
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

  return (
    <section ref={sectionRef} id="about" className="py-32 relative overflow-hidden">
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
            About Me
          </motion.h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          I love learning, experimenting with ideas, and creating things that make an impact.
          </p>
        </motion.div>

        {/* Timeline - Full Width */}
        <div className="max-w-5xl mx-auto">
          <div ref={timelineRef} className="relative">
            {/* Timeline Line - Responsive positioning */}
            <div className="absolute left-4 sm:left-6 md:left-8 top-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 timeline-line" style={{ height: '0%' }} />
            
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="timeline-item flex items-start gap-4 sm:gap-6 md:gap-8 relative"
                  style={{ opacity: 0 }}
                >
                  {/* Icon - Responsive sizing */}
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center relative z-10 shadow-lg shadow-purple-500/50">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  
                  {/* Content - Responsive padding and text */}
                  <div className="flex-1 min-w-0">
                    <motion.div 
                      className="glass rounded-xl p-4 sm:p-5 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      {/* Header - Responsive layout */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                        <span className="text-base sm:text-lg font-bold text-purple-400">{item.year}</span>
                        <span className="hidden sm:block w-2 h-2 bg-white/40 rounded-full" />
                        <span className="text-xs sm:text-sm text-white/60 font-medium break-words">{item.company}</span>
                      </div>
                      
                      {/* Title - Responsive text size */}
                      <h3 className="text-lg sm:text-xl md:text-xl font-bold mb-2 sm:mb-3 text-white break-words">{item.title}</h3>
                      
                      {/* Description - Responsive text */}
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3 sm:mb-4 break-words">{item.description}</p>
                      
                      {/* Achievements - Responsive spacing */}
                      <div className="space-y-1.5 sm:space-y-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-purple-300 mb-2">Key Achievements:</h4>
                        {item.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/60">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex-shrink-0 mt-1.5" />
                            <span className="break-words">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
    
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}