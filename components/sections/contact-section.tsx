"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { Send, Mail, Phone, MapPin, MessageCircle, Calendar, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate form fields
            anime({
              targets: '.form-field',
              translateY: [40, 0],
              opacity: [0, 1],
              scale: [0.95, 1],
              delay: anime.stagger(150),
              duration: 800,
              easing: 'easeOutExpo'
            });

            // Animate contact cards
            anime({
              targets: '.contact-card',
              translateX: [50, 0],
              opacity: [0, 1],
              rotateY: [15, 0],
              delay: anime.stagger(200, { start: 300 }),
              duration: 800,
              easing: 'easeOutExpo'
            });

            // Animate social links
            anime({
              targets: '.social-link',
              scale: [0, 1],
              rotate: [180, 0],
              delay: anime.stagger(100, { start: 800 }),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Animate form submission
    anime({
      targets: formRef.current,
      scale: [1, 0.98, 1],
      duration: 400,
      easing: 'easeInOutQuad'
    });

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success animation
    anime({
      targets: '.submit-btn',
      backgroundColor: ['#10B981', '#059669'],
      scale: [1, 1.05, 1],
      duration: 600,
      easing: 'easeOutBack'
    });

    setIsSubmitting(false);
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "alex@alexchen.dev",
      href: "mailto:alex@alexchen.dev",
      description: "Drop me a line anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      description: "Let's have a conversation"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      href: "#",
      description: "Available for remote work"
    },
    {
      icon: Calendar,
      title: "Schedule",
      value: "Book a Meeting",
      href: "#",
      description: "Let's discuss your project"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub", color: "from-gray-600 to-gray-800" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "from-blue-600 to-blue-800" },
    { icon: Mail, href: "#", label: "Email", color: "from-red-500 to-red-700" },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-32 relative overflow-hidden">
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
            Let's Work Together
          </motion.h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it and discuss how we can bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-field" style={{ opacity: 0 }}>
                  <label htmlFor="name" className="block text-sm font-semibold mb-3 text-white">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full glass border border-white/20 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-field" style={{ opacity: 0 }}>
                  <label htmlFor="email" className="block text-sm font-semibold mb-3 text-white">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full glass border border-white/20 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-field" style={{ opacity: 0 }}>
                <label htmlFor="subject" className="block text-sm font-semibold mb-3 text-white">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full glass border border-white/20 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="form-field" style={{ opacity: 0 }}>
                <label htmlFor="message" className="block text-sm font-semibold mb-3 text-white">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full min-h-[150px] glass border border-white/20 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project, goals, and how I can help..."
                  required
                />
              </div>

              <motion.div
                className="form-field"
                style={{ opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
                  data-cursor-hover
                  data-magnetic
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-5 h-5" />
                      Send Message
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  className="contact-card block group"
                  style={{ opacity: 0 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  data-cursor-hover
                  data-magnetic
                >
                  <Card className="border-0 glass hover:border-white/30 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-white">{info.title}</h3>
                      <p className="text-purple-300 font-medium mb-1">{info.value}</p>
                      <p className="text-white/60 text-sm">{info.description}</p>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                Connect With Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="social-link group relative p-4 glass rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-hover
                    data-magnetic
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Additional CTA */}
            <motion.div
              className="glass rounded-xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-3 text-white">Ready to Start Your Project?</h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                Let's discuss your ideas and create something extraordinary together. I'm available for 
                freelance projects, consulting, and full-time opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 glass border border-white/20 text-white hover:bg-white/10"
                  data-cursor-hover
                  data-magnetic
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule a Call
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 glass border border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                  data-cursor-hover
                  data-magnetic
                >
                  View Portfolio
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}