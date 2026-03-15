"use client";

import { motion } from "framer-motion";

const team = [
    {
        name: "Marcus Chen",
        role: "Head of Product",
        bio: "Former lead at Google AI, focused on the intersection of reasoning and UX.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: "Sarah Miller",
        role: "AI Architecture",
        bio: "Specialist in large-scale model optimization and predictive intelligence.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: "David Vogt",
        role: "Lead Designer",
        bio: "Award-winning designer dedicated to creating premium digital experiences.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
    }
];

export function Team() {
    return (
        <section id="team" className="py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built by Visionaries.</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Auren is developed by a distributed team of engineers and designers committed to the next era of AI.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group"
                        >
                            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] mb-6 border border-white/10">
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
