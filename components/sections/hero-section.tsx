"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { ChevronDown, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const morphingTextRef = useRef<HTMLDivElement>(null);
  const [currentText, setCurrentText] = useState(0);
  
  const morphingTexts = [
    "Frontend Developer",
    "Debugger",
    "UI/UX"
  ];

  useEffect(() => {
    // Morphing text animation
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % morphingTexts.length);
    }, 3000);

    // Animate main title with liquid effect
    if (textRef.current) {
      const textWrapper = textRef.current;
      textWrapper.innerHTML = textWrapper.textContent?.replace(/\S/g, "<span class='letter inline-block'>$&</span>") || '';

      anime.timeline()
        .add({
          targets: '.letter',
          scale: [0, 1],
          opacity: [0, 1],
          translateZ: 0,
          rotateY: [-90, 0],
          easing: "easeOutExpo",
          duration: 1200,
          delay: (el, i) => 100 * i
        })
        .add({
          targets: '.letter',
          rotateX: [0, 360],
          duration: 800,
          delay: (el, i) => 50 * i,
          easing: "easeInOutSine"
        }, '-=600');
    }

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      anime({
        targets: element,
        translateY: [0, -30, 0],
        translateX: [0, Math.random() * 20 - 10, 0],
        rotate: [0, Math.random() * 10 - 5, 0],
        scale: [1, 1.1, 1],
        duration: 4000 + index * 500,
        easing: 'easeInOutSine',
        loop: true,
        delay: index * 200
      });
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Content */}
      <div className="container mx-auto px-6 text-center z-10 relative">
        {/* Floating decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 floating-element">
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full liquid-morph blur-xl" />
        </div>
        <div className="absolute -top-10 -right-32 w-32 h-32 floating-element">
          <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg rotate-45 blur-lg" />
        </div>
        <div className="absolute -bottom-20 left-1/4 w-24 h-24 floating-element">
          <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-lg" />
        </div>

        {/* Status Badge */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow" />
            <span className="text-sm font-medium text-white/80">Available for work</span>
          </div>
        </motion.div> */}

        {/* Morphing Role Text */}
        <motion.div
          ref={morphingTextRef}
          className="mb-4 h-8 mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.span
            key={currentText}
            className="text-lg font-medium animated-gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {morphingTexts[currentText]}
          </motion.span>
        </motion.div>

        {/* Main Title */}
        <h1
          ref={textRef}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 text-white text-glow"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Ebenezer
        </h1>

        {/* Subtitle with typewriter effect */}
        <motion.p
          className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Crafting extraordinary digital experiences with cutting-edge technologies, 
          stunning animations, and pixel-perfect design that captivates and converts.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <Button
            size="lg"
            className="group relative px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full overflow-hidden"
            data-cursor-hover
            data-magnetic
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="group px-8 py-6 text-lg font-semibold glass border-white/20 text-white hover:bg-white/10 rounded-full"
            data-cursor-hover
            data-magnetic
          >
            <span className="flex items-center gap-2">
              Download CV
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </Button>
        </motion.div>

        {/* Social Links with magnetic effect */}
        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: '#', label: 'Email' }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              className="group relative p-4 glass rounded-full border border-white/10 hover:border-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
              data-magnetic
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        {/* <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/50"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div> */}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
    </section>
  );
}