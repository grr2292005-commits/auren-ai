"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Layout, Search, Code2, Users2 } from "lucide-react";

const features = [
    {
        title: "Deep Work with AI",
        description: "Auren is designed for focus. Our interface minimizes noise and maximizes cognitive bandwidth.",
        icon: Brain,
        color: "amber"
    },
    {
        title: "Visual Reasoning",
        description: "Interact with AI through a spatial canvas. Connect ideas, visualize code, and reason across documents.",
        icon: Layout,
        color: "blue"
    },
    {
        title: "Rapid Iteration",
        description: "Go from prompt to production faster than ever. Optimized workflows for building and shipping.",
        icon: Zap,
        color: "amber"
    },
    {
        title: "Global Search",
        description: "Access project-wide knowledge instantly. Auren understands your entire codebase and documentation.",
        icon: Search,
        color: "violet"
    },
    {
        title: "Collaborative Intelligence",
        description: "Work together in real-time. Shared canvases and AI-driven insights for high-performing teams.",
        icon: Users2,
        color: "blue"
    },
    {
        title: "Native Code Tools",
        description: "Built-in code execution and preview. Ship components and scripts directly from the workspace.",
        icon: Code2,
        color: "emerald"
    }
];

export function Features() {
    return (
        <section className="py-24 bg-black/50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Designed for the next era of building.</h2>
                    <p className="text-gray-400 text-lg">
                        Stop fighting your tools and start shipping. Auren provides everything you need to build at the speed of thought.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-6 h-6 text-amber-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
