"use client";
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { SiTypescript ,SiRedux ,SiReactquery } from "react-icons/si";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { ReactQueryIcon } from "../ui/rtkicon";
import { ZustandIcon } from "../ui/ZustandIcon";
import { FaGithub } from "react-icons/fa";
import {  AzureIcon, McpIcon, MongodbIcon, MysqlIcon, NodejsIcon, Postmanicon, PrismaIcon, PythonIcon, VercelIcon, VitejsIcon } from "../ui/NodeIcon";

const skillCategories = [
  {
    title: "Frontend Development",
    icon:  <img src="/ux.png" alt="Frontend Icon" className="w-8 h-8" />,
    skills: [
      { name: "React/Next.js", level: 98, icon: <div className="flex gap-2"><FaReact color="#61DBFB" /><TbBrandNextjs  color="#0070F3"/></div> },
      { name: "TypeScript", level: 95, icon: <SiTypescript color="#3178C6" /> },
      { name: "Tanstack/React Query", level: 60, icon: <div className="flex gap-2"><ReactQueryIcon/></div> },
      { name: "Redux/Zustand", level: 80, icon: <div className="flex gap-2"><SiRedux color="#00a7e5"/><ZustandIcon/></div> },
    ]
  },
  {
    title: "Backend & Database",
    icon:  <img src="/browser.png" alt="Backend Icon" className="w-8 h-8" />,
    skills: [
      { name: "Node.js", level: 87, icon: <NodejsIcon/> },
      { name: "Python", level: 60, icon: <PythonIcon/> },
      { name: "MySQL", level: 65, icon: <MysqlIcon/> },
      { name: "MongoDB/Prisma", level: 80, icon: <div className="flex gap-2"><MongodbIcon/><PrismaIcon/></div> },
    ]
  },
  {
    title: "Tools & Platforms",
    icon:  <img src="/repair.png" alt="Tools Icon" className="w-8 h-8" />,
    skills: [
      { name: "Vite", level: 83, icon: <VitejsIcon/> },
      { name: "Azure/Vercel", level: 56, icon: <div className="flex gap-2"><AzureIcon/><VercelIcon/></div> },
      { name: "Postman/MCP", level: 91, icon: <div className="flex gap-2"> <Postmanicon/><McpIcon/></div> },
      { name: "Git/GitHub", level: 94, icon: <FaGithub /> },
    ]
  }
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const progressRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate skill categories
            anime({
              targets: '.skill-category',
              translateY: [50, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
              delay: anime.stagger(200),
              duration: 800,
              easing: 'easeOutExpo'
            });

            // Animate progress bars with delay
            setTimeout(() => {
              progressRefs.current.forEach((progress, index) => {
                if (progress) {
                  const skillIndex = Math.floor(index / 4);
                  const skill = skillCategories[skillIndex]?.skills[index % 4];
                  if (skill) {
                    anime({
                      targets: progress,
                      width: `${skill.level}%`,
                      duration: 1500,
                      delay: index * 100,
                      easing: 'easeOutExpo'
                    });
                  }
                }
              });
            }, 500);

            // Animate floating icons
            anime({
              targets: '.floating-skill-icon',
              translateY: [30, 0],
              opacity: [0, 1],
              rotate: [0, 360],
              delay: anime.stagger(150, { start: 1000 }),
              duration: 1000,
              easing: 'easeOutBack'
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="pt-32 pb-12 relative overflow-hidden">
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
            Skills & Expertise
          </motion.h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Mastering cutting-edge technologies to build exceptional digital experiences
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-category glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500"
              whileHover={{ scale: 1.02, y: -5 }}
              data-cursor-hover
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="text-4xl">{category.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2" />
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => {
                  const progressIndex = categoryIndex * 4 + skillIndex;
                  return (
                    <div key={skill.name} className="group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-white/60">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          ref={(el) => {
                            if (el) progressRefs.current[progressIndex] = el;
                          }}
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50"
                          style={{ width: '0%' }}
                        />
                        
                        {/* Animated dots */}
                        <div className="absolute top-0 left-0 w-full h-full">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className="absolute top-1/2 w-1 h-1 bg-white rounded-full transform -translate-y-1/2 opacity-30"
                              style={{ left: `${(i + 1) * 20}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Skill Icons */}
        {/* <div className="relative h-40 overflow-hidden">
          {['🚀', '💡', '⚡', '🎨', '🔧', '📱', '🌟', '🎯', '🔥', '💎'].map((icon, index) => (
            <motion.div
              key={index}
              className="floating-skill-icon absolute text-4xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + index * 0.5,
                delay: index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div> */}

        {/* Interactive Skill Visualization */}
        {/* <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">1 Year of Experience</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">4+</div>
                <div className="text-sm text-white/60">Frontend Development</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-black text-pink-400 mb-2">7+</div>
                <div className="text-sm text-white/60">Projects Completed</div>
              </div>
              <div className="w-px h-12 bg-white/20" /> 
               <div className="text-center">
                <div className="text-4xl font-black text-cyan-400 mb-2">100%</div>
                <div className="text-sm text-white/60">Client Satisfaction</div>
              </div> 
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}