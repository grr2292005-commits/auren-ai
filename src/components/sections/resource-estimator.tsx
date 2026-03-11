"use client";

import React, { useState } from "react";
import { Brain, Zap, Link, ChevronDown, Check, Sparkles } from "lucide-react";
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
    const [primaryModel, setPrimaryModel] = useState<string>("standard");
    const [projectIdentifier, setProjectIdentifier] = useState<string>("");
    const [tokenVolume, setTokenVolume] = useState<string>("");
    const [unit, setUnit] = useState<"Tokens" | "Requests">("Tokens");
    const [accountType, setAccountType] = useState<"Individual" | "Organization">("Individual");
    const [enableReasoning, setEnableReasoning] = useState(false);
    const [highPriority, setHighPriority] = useState(false);

    const isFirstStepComplete = selectedPriority !== null && projectIdentifier.trim().length > 0;

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
                        {/* Priority Selection */}
                        <div>
                            <label className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6 block">
                                01. Select your priority
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

                        {/* First Row of Inputs */}
                        <AnimatePresence>
                            {selectedPriority && (
                                <motion.div
                                    key="row-1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="pt-12 border-t border-white/5"
                                >
                                    <label className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6 block">
                                        02. Core Identity
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-xs font-semibold text-gray-400 block uppercase tracking-wide">
                                                Primary Model
                                            </label>
                                            <div className="relative group">
                                                <select
                                                    value={primaryModel}
                                                    onChange={(e) => setPrimaryModel(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-amber-500/50 transition-colors cursor-pointer group-hover:border-white/20"
                                                >
                                                    <option className="bg-neutral-900" value="standard">Auren-1-Standard</option>
                                                    <option className="bg-neutral-900" value="reasoning">Auren-1-Reasoning</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-xs font-semibold text-gray-400 block uppercase tracking-wide">
                                                Project Identifier
                                            </label>
                                            <input
                                                type="text"
                                                value={projectIdentifier}
                                                onChange={(e) => setProjectIdentifier(e.target.value)}
                                                placeholder="e.g. quantum-neural-v2"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 transition-all group-hover:border-white/20"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Final Block Disclosure */}
                        <AnimatePresence>
                            {isFirstStepComplete && (
                                <motion.div
                                    key="row-final"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                                    className="pt-12 border-t border-white/5 space-y-12"
                                >
                                    {/* Volume row */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6 block">
                                            03. Usage Estimation
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <label className="text-xs font-semibold text-gray-400 block uppercase tracking-wide">
                                                    Monthly Volume
                                                </label>
                                                <div className="flex bg-white/5 border border-white/10 rounded-lg overflow-hidden group focus-within:border-amber-500/50 transition-colors">
                                                    <input
                                                        type="number"
                                                        value={tokenVolume}
                                                        onChange={(e) => setTokenVolume(e.target.value)}
                                                        placeholder="5,000,000"
                                                        className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none"
                                                    />
                                                    <select
                                                        value={unit}
                                                        onChange={(e) => setUnit(e.target.value as any)}
                                                        className="bg-white/5 border-l border-white/10 px-4 py-3 text-sm text-gray-400 focus:outline-none cursor-pointer hover:text-white transition-colors"
                                                    >
                                                        <option className="bg-neutral-900" value="Tokens">Tokens</option>
                                                        <option className="bg-neutral-900" value="Requests">Requests</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-xs font-semibold text-gray-400 block uppercase tracking-wide">
                                                    Account Type
                                                </label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {(["Individual", "Organization"] as const).map((type) => (
                                                        <button
                                                            key={type}
                                                            onClick={() => setAccountType(type)}
                                                            className={cn(
                                                                "py-3 rounded-lg border text-sm font-semibold transition-all",
                                                                accountType === type
                                                                    ? "bg-amber-500/10 border-amber-500/50 text-amber-500"
                                                                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
                                                            )}
                                                        >
                                                            {type}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Checkboxes row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <button
                                            onClick={() => setEnableReasoning(!enableReasoning)}
                                            className="flex items-center gap-4 group cursor-pointer text-left"
                                        >
                                            <div className={cn(
                                                "w-6 h-6 rounded border flex items-center justify-center transition-all",
                                                enableReasoning ? "bg-amber-500 border-amber-500" : "border-white/20 group-hover:border-white/40"
                                            )}>
                                                {enableReasoning && <Check className="w-4 h-4 text-black" />}
                                            </div>
                                            <div>
                                                <span className="text-white font-medium block">Enable Reasoning Mode</span>
                                                <span className="text-xs text-gray-500">Enhanced logic for complex problem solving.</span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setHighPriority(!highPriority)}
                                            className="flex items-center gap-4 group cursor-pointer text-left"
                                        >
                                            <div className={cn(
                                                "w-6 h-6 rounded border flex items-center justify-center transition-all",
                                                highPriority ? "bg-amber-500 border-amber-500" : "border-white/20 group-hover:border-white/40"
                                            )}>
                                                {highPriority && <Check className="w-4 h-4 text-black" />}
                                            </div>
                                            <div>
                                                <span className="text-white font-medium block">High-Priority Infrastructure</span>
                                                <span className="text-xs text-gray-500">Dedicated compute lanes with <100ms latency.</span>
                                            </div>
                                        </button>
                                    </div>

                                    {/* Final CTA */}
                                    <div className="pt-8 text-center">
                                        <button className="relative group overflow-hidden px-10 py-5 rounded-full bg-amber-500 text-black font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Generate Estimate
                                                <Sparkles className="w-5 h-5" />
                                            </span>
                                            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 group-hover:h-full transition-all duration-300 opacity-0 group-hover:opacity-10" />
                                        </button>
                                        <p className="mt-4 text-gray-500 text-xs uppercase tracking-widest">
                                            No credit card required for initial projection
                                        </p>
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
