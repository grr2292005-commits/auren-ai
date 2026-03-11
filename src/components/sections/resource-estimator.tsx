"use client";

import React, { useState } from "react";
import { Brain, Zap, Link } from "lucide-react";
import { motion } from "framer-motion";
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

                        {/* Hidden fields by default */}
                        {selectedPriority && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="pt-12 border-t border-white/5"
                            >
                                {/* 
                  The prompt says "All other form fields must be hidden by default."
                  Since no other fields are specified, I'll just leave this placeholder 
                  or follow the instruction to keep them "hidden" (not rendered for now).
                */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-50 pointer-events-none">
                                    <div className="space-y-4">
                                        <div className="h-4 w-24 bg-white/10 rounded" />
                                        <div className="h-10 w-full bg-white/5 border border-white/10 rounded-lg" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-4 w-24 bg-white/10 rounded" />
                                        <div className="h-10 w-full bg-white/5 border border-white/10 rounded-lg" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
