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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Personal Information */}
          <div className="personal-info space-y-8">
            <motion.div
              className="glass rounded-2xl p-8 border border-white/10"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="prose prose-lg prose-invert">
                <p className="text-lg leading-relaxed mb-6 text-white/80">
                Experienced Frontend Developer with professional experience in modern web technologies including Next.js, TypeScript, and Redux. 
      
                </p>
                <p className="text-lg leading-relaxed mb-6 text-white/80">
                Currently contributing to scalable applications at The Populous Empowerment Network, with expertise in React ecosystem, state management, and full-stack development.
                  
                </p>
                <p className="text-lg leading-relaxed text-white/80">
                Seeking to leverage advanced frontend skills and proven track record in delivering high-quality applications to drive innovation in a dynamic development environment.
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  'Problem Solving', 
                  'Performance Optimization', 
                  'Collaboration', 
                  'Team Player',
                  'Debugger',
                  'Agile Development'
                ].map((trait) => (
                  <motion.span
                    key={trait}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Personal Stats */}
            <div className="grid grid-cols-2 gap-4">
              {personalStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card glass rounded-xl p-6 border border-white/10 text-center hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  data-cursor-hover
                >
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} mb-3`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 timeline-line" style={{ height: '0%' }} />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="timeline-item flex items-start gap-8 relative"
                  style={{ opacity: 0 }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center relative z-10 shadow-lg shadow-purple-500/50">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <motion.div 
                      className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-lg font-bold text-purple-400">{item.year}</span>
                        <span className="w-2 h-2 bg-white/40 rounded-full" />
                        <span className="text-sm text-white/60 font-medium">{item.company}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                      <p className="text-white/70 leading-relaxed mb-4">{item.description}</p>
                      
                      {/* Achievements */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-purple-300 mb-2">Key Achievements:</h4>
                        {item.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                            {achievement}
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

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {/* <div className="glass rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">Let's Create Something Amazing</h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              I'm always excited to work on new projects and collaborate with talented individuals. 
              Whether you have a specific idea in mind or just want to explore possibilities, I'd love to hear from you.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
              data-magnetic
            >
              Get In Touch
            </motion.button>
          </div> */}
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}