'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    content: "Auren has completely transformed how we approach AI integration. The efficiency gains were immediate, and the design aesthetic is just the icing on the cake.",
    author: "Alex Rivers",
    role: "CEO at NexusTech",
    avatar: "/testimonials/avatar-1.png",
  },
  {
    id: 2,
    content: "The most intuitive AI platform I've ever used. It feels like it's three steps ahead of my workflow. Truly a premium experience in every sense.",
    author: "Sarah Chen",
    role: "Creative Director",
    avatar: "/testimonials/avatar-2.png",
  },
  {
    id: 3,
    content: "Implementation was seamless. The results were better than advertised. Auren is now a core part of our production environment.",
    author: "Marcus Thorne",
    role: "Principal Engineer",
    avatar: "/testimonials/avatar-3.png",
  }
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextStep, 5000);
    return () => clearInterval(timer);
  }, [nextStep]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-black">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-amber-500 font-medium tracking-wider uppercase text-sm"
            >
              Testimonials
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mt-4 text-white"
            >
              Trusted by visionaries.
            </motion.h2>
          </div>

          <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
                className="absolute inset-0 flex flex-col items-center text-center px-4"
              >
                <div className="relative w-20 h-20 mb-8">
                  <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 p-1 bg-zinc-900">
                    <Image
                      src={testimonials[index].avatar}
                      alt={testimonials[index].author}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-2 shadow-lg">
                    <Quote className="w-3 h-3 text-black fill-current" />
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-zinc-300 italic mb-8 leading-relaxed max-w-3xl">
                  "{testimonials[index].content}"
                </p>

                <div>
                  <h4 className="text-white font-bold text-lg">{testimonials[index].author}</h4>
                  <p className="text-zinc-500 text-sm mt-1">{testimonials[index].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prevStep}
              className="p-4 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-amber-500/50 transition-all group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 group-hover:text-amber-500 transition-colors" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'bg-amber-500 w-6' : 'bg-white/20'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextStep}
              className="p-4 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-amber-500/50 transition-all group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 group-hover:text-amber-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
