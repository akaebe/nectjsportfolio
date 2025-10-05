"use client";

import { useEffect, useRef } from 'react';
import anime from 'animejs';

export function ImmersiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create floating geometric shapes
    const shapes = Array.from({ length: 12 }, (_, i) => {
      const shape = document.createElement('div');
      const shapeTypes = ['circle', 'square', 'triangle'];
      const shapeType = shapeTypes[i % 3];
      
      shape.className = `absolute opacity-10 ${
        shapeType === 'circle' ? 'rounded-full' :
        shapeType === 'square' ? 'rounded-lg' :
        'clip-triangle'
      }`;
      
      const size = Math.random() * 150 + 50;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      
      // Gradient backgrounds
      const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      ];
      shape.style.background = gradients[i % 4];
      
      containerRef.current?.appendChild(shape);
      return shape;
    });

    // Create particle system
    const particles = Array.from({ length: 50 }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-white rounded-full opacity-20';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      containerRef.current?.appendChild(particle);
      return particle;
    });

    // Animate shapes with complex movements
    shapes.forEach((shape, index) => {
      anime({
        targets: shape,
        translateX: [
          { value: Math.random() * 400 - 200, duration: 4000 },
          { value: Math.random() * 400 - 200, duration: 4000 },
          { value: 0, duration: 4000 }
        ],
        translateY: [
          { value: Math.random() * 400 - 200, duration: 4000 },
          { value: Math.random() * 400 - 200, duration: 4000 },
          { value: 0, duration: 4000 }
        ],
        rotate: [
          { value: 360, duration: 8000 }
        ],
        scale: [
          { value: 1.2, duration: 2000 },
          { value: 0.8, duration: 2000 },
          { value: 1, duration: 2000 }
        ],
        opacity: [
          { value: 0.15, duration: 3000 },
          { value: 0.05, duration: 3000 },
          { value: 0.1, duration: 3000 }
        ],
        easing: 'easeInOutSine',
        loop: true,
        delay: index * 800,
      });
    });

    // Animate particles
    particles.forEach((particle, index) => {
      anime({
        targets: particle,
        translateX: () => anime.random(-300, 300),
        translateY: () => anime.random(-300, 300),
        scale: [
          { value: 0, duration: 0 },
          { value: 1, duration: 1000 },
          { value: 0, duration: 1000 }
        ],
        opacity: [
          { value: 0, duration: 0 },
          { value: 0.4, duration: 1000 },
          { value: 0, duration: 1000 }
        ],
        duration: () => anime.random(3000, 6000),
        easing: 'easeInOutSine',
        loop: true,
        delay: () => anime.random(0, 3000),
      });
    });

    // Mouse interaction effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) * 0.01;
      const moveY = (clientY - centerY) * 0.01;
      
      shapes.forEach((shape, index) => {
        const multiplier = (index + 1) * 0.5;
        anime({
          targets: shape,
          translateX: `+=${moveX * multiplier}`,
          translateY: `+=${moveY * multiplier}`,
          duration: 1000,
          easing: 'easeOutQuart'
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      shapes.forEach(shape => shape.remove());
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}