"use client";

import React, { useState } from "react";
import { Brain, Zap, Link, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PRIORITIES = [
    {
        id: "reasoning",
        label: "Reasoning Depth",
        icon: Brain,
        description: "Multi-step logic and deep context processing.",
    },
    {
        id: "velocity",
        label: "Developer Velocity",
        icon: Zap,
        description: "Rapid iteration and AI-assisted shipping.",
    },
    {
        id: "cloud",
        label: "Cloud Integration",
        icon: Link,
        description: "Seamless connection with your entire stack.",
    },
];

export function ResourceEstimator() {
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

    return (
        <section className="py-24 border-t border-white/5 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Configure your Intelligence Workspace
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Fine-tune the compute resources and reasoning models for your specific workload.
                        </p>
                    </div>

                    <div className="space-y-12">
                        <div>
                            <label className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6 block">
                                Select your priority
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {PRIORITIES.map((priority) => {
                                    const Icon = priority.icon;
                                    const isSelected = selectedPriority === priority.id;

                                    return (
                                        <button
                                            key={priority.id}
                                            onClick={() => setSelectedPriority(priority.id)}
                                            className={cn(
                                                "relative flex flex-col items-start p-6 text-left transition-all duration-300 rounded-xl border group",
                                                isSelected
                                                    ? "bg-amber-500/10 border-amber-500/50 ring-1 ring-amber-500/20"
                                                    : "bg-black border-white/10 hover:border-white/20"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                                                    isSelected ? "bg-amber-500/20" : "bg-white/5 group-hover:bg-white/10"
                                                )}
                                            >
                                                <Icon
                                                    className={cn(
                                                        "w-6 h-6 transition-colors",
                                                        isSelected ? "text-amber-500" : "text-amber-500/70"
                                                    )}
                                                />
                                            </div>
                                            <h3
                                                className={cn(
                                                    "text-lg font-semibold mb-2 transition-colors",
                                                    isSelected ? "text-white" : "text-gray-300 group-hover:text-white"
                                                )}
                                            >
                                                {priority.label}
                                            </h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                {priority.description}
                                            </p>

                                            {isSelected && (
                                                <motion.div
                                                    layoutId="active-priority"
                                                    className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {selectedPriority && (
                                <motion.div
                                    key="form-fields"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="pt-12 border-t border-white/5"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-sm font-medium text-gray-500 uppercase tracking-widest block">
                                                Primary Model
                                            </label>
                                            <div className="relative group">
                                                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-amber-500/50 transition-colors cursor-pointer group-hover:border-white/20">
                                                    <option className="bg-neutral-900" value="standard">Auren-1-Standard</option>
                                                    <option className="bg-neutral-900" value="reasoning">Auren-1-Reasoning</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-sm font-medium text-gray-500 uppercase tracking-widest block">
                                                Project Identifier
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. quantum-neural-v2"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 transition-all group-hover:border-white/20"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
