"use client";

import { useEffect, useRef } from 'react';
import anime from 'animejs';

export function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create floating shapes with anime.js
    const shapes = Array.from({ length: 6 }, (_, i) => {
      const shape = document.createElement('div');
      shape.className = `absolute rounded-full bg-gradient-to-br ${
        i % 3 === 0 ? 'from-purple-500/20 to-cyan-500/20' :
        i % 3 === 1 ? 'from-cyan-500/20 to-orange-500/20' :
        'from-orange-500/20 to-purple-500/20'
      } blur-sm`;
      
      const size = Math.random() * 200 + 100;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      
      containerRef.current?.appendChild(shape);
      return shape;
    });

    // Animate shapes
    shapes.forEach((shape, index) => {
      anime({
        targets: shape,
        translateX: [
          { value: Math.random() * 200 - 100, duration: 3000 },
          { value: Math.random() * 200 - 100, duration: 3000 }
        ],
        translateY: [
          { value: Math.random() * 200 - 100, duration: 3000 },
          { value: Math.random() * 200 - 100, duration: 3000 }
        ],
        scale: [
          { value: 1.2, duration: 2000 },
          { value: 0.8, duration: 2000 }
        ],
        opacity: [
          { value: 0.3, duration: 2000 },
          { value: 0.7, duration: 2000 }
        ],
        easing: 'easeInOutSine',
        loop: true,
        delay: index * 500,
      });
    });

    return () => {
      shapes.forEach(shape => shape.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}