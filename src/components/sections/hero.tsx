"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-sm font-medium mb-6">
                            Introducing Auren 1.0
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
                    >
                        The premium workspace for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                            thinking, building, and shipping.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Auren combines deep reasoning with a fluid interface to help you turn complex ideas into high-fidelity results. Experience the next generation of AI collaboration.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95, boxShadow: "0 0 25px rgba(245, 158, 11, 0.6)" }}
                            onClick={() => {
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2 group focus:outline-none"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95, boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
                            onClick={() => window.location.href = '#'}
                            className="px-8 py-4 rounded-full border border-white/20 bg-transparent text-white font-semibold hover:border-white/40 transition-all focus:outline-none"
                        >
                            View Demo
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Decorative element */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-20 relative mx-auto max-w-5xl px-6"
            >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000"
                        alt="Dashboard Preview"
                        className="rounded-xl w-full h-[400px] object-cover opacity-60"
                    />
                </div>
            </motion.div>
        </section>
    );
}
