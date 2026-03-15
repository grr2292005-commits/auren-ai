"use client";

import React, { useState, useEffect } from "react";
import { Brain, Zap, Link, ChevronDown, Check, Sparkles, ChevronRight, X, Info } from "lucide-react";
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

const DYNAMIC_FIELDS = {
    reasoning: {
        field1: { label: "Inference Strategy", options: ["Auren-Logic-Standard", "Auren-Logic-Pro", "Auren-Deep-Chain"] },
        field2: { label: "Context Capacity", options: ["128K Window", "512K Window", "1M+ Infinite"] }
    },
    velocity: {
        field1: { label: "Ship Protocol", options: ["Automated CI/CD", "Blue/Green Strategy", "Canary Deployment"] },
        field2: { label: "SDK Layer", options: ["TypeScript Native", "Pythonic Interface", "Rust/Wasm Core"] }
    },
    cloud: {
        field1: { label: "Cloud Node", options: ["AWS US-East", "Azure Europe-West", "GCP Asia-Tokyo", "On-Prem-Bridge"] },
        field2: { label: "Connection Bridge", options: ["Direct VPC Tunnel", "mTLS Secure Link", "Standard API"] }
    }
};

export function ResourceEstimator() {
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
    const [field1, setField1] = useState("");
    const [field2, setField2] = useState("");

    // Final Step State
    const [tokenVolume, setTokenVolume] = useState<string>("");
    const [unit, setUnit] = useState<"Tokens" | "Requests">("Tokens");
    const [accountType, setAccountType] = useState<"Individual" | "Organization">("Individual");
    const [enableReasoning, setEnableReasoning] = useState(false);
    const [highPriority, setHighPriority] = useState(false);

    // Result State
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [estimate, setEstimate] = useState<{ cost: string; compute: string; latency: string } | null>(null);

    // Reset when switching priority
    useEffect(() => {
        if (selectedPriority) {
            setField1("");
            setField2("");
            setShowResult(false);
        }
    }, [selectedPriority]);

    const isReadyForFinal = selectedPriority !== null && field1 !== "" && field2 !== "";

    const handleGenerateEstimate = () => {
        setIsGenerating(true);

        // Mock calculation logic
        setTimeout(() => {
            const baseMultiplier = selectedPriority === 'reasoning' ? 1.5 : selectedPriority === 'cloud' ? 1.2 : 1.0;
            const vol = parseInt(tokenVolume.replace(/,/g, '')) || 1000000;
            const costVal = (vol / 1000000) * 0.5 * baseMultiplier * (enableReasoning ? 2 : 1) * (highPriority ? 1.3 : 1);

            setEstimate({
                cost: `$${costVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                compute: highPriority ? "H100 Dedicated" : "A100 Shared",
                latency: highPriority ? "< 85ms" : "~240ms"
            });
            setIsGenerating(false);
            setShowResult(true);
        }, 1500);
    };

    return (
        <section className="py-24 border-t border-white/5 relative overflow-hidden transition-colors duration-500">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            {/* Dynamic Radial Gradient Background */}
            <AnimatePresence>
                {selectedPriority && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold text-white mb-6"
                        >
                            Configure your Intelligence Workspace
                        </motion.h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Fine-tune the compute resources and reasoning models for your specific workload.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* 01. Priority Selection */}
                        <div className="space-y-6">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] block">
                                01. Select your priority
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                {PRIORITIES.map((priority) => {
                                    const Icon = priority.icon;
                                    const isSelected = selectedPriority === priority.id;

                                    return (
                                        <motion.button
                                            key={priority.id}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedPriority(priority.id)}
                                            className={cn(
                                                "relative flex flex-col items-start p-6 text-left transition-all duration-300 rounded-xl border group outline-none",
                                                isSelected
                                                    ? "bg-amber-500/10 border-amber-500/50 ring-1 ring-amber-500/20"
                                                    : "bg-black border-white/10 hover:border-white/20 focus-visible:border-amber-500/30"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300",
                                                    isSelected ? "bg-amber-500/20 scale-110" : "bg-white/5 group-hover:bg-white/10"
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
                                                />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 02. Identity Section */}
                        <AnimatePresence mode="wait">
                            {selectedPriority && (
                                <motion.div
                                    key={selectedPriority}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="pt-12 border-t border-white/5 space-y-8"
                                >
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] block">
                                            02. Intelligence Context
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <div className="space-y-4">
                                            <label className="text-xs font-bold text-gray-400 block uppercase tracking-wider">
                                                {DYNAMIC_FIELDS[selectedPriority as keyof typeof DYNAMIC_FIELDS].field1.label}
                                            </label>
                                            <div className="relative group">
                                                <select
                                                    value={field1}
                                                    onChange={(e) => setField1(e.target.value)}
                                                    className={cn(
                                                        "w-full bg-white/5 border rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all cursor-pointer group-hover:border-white/20",
                                                        field1 === "" ? "text-gray-500" : "text-white",
                                                        field1 !== "" ? "border-amber-500/30" : "border-white/10"
                                                    )}
                                                >
                                                    <option value="" disabled className="bg-neutral-900">Select Here</option>
                                                    {DYNAMIC_FIELDS[selectedPriority as keyof typeof DYNAMIC_FIELDS].field1.options.map(opt => (
                                                        <option key={opt} className="bg-neutral-900 text-white" value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none group-hover:text-gray-300 transition-colors" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-xs font-bold text-gray-400 block uppercase tracking-wider">
                                                {DYNAMIC_FIELDS[selectedPriority as keyof typeof DYNAMIC_FIELDS].field2.label}
                                            </label>
                                            <div className="relative group">
                                                <select
                                                    value={field2}
                                                    onChange={(e) => setField2(e.target.value)}
                                                    className={cn(
                                                        "w-full bg-white/5 border rounded-xl px-4 py-4 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all cursor-pointer group-hover:border-white/20",
                                                        field2 === "" ? "text-gray-500" : "text-white",
                                                        field2 !== "" ? "border-amber-500/30" : "border-white/10"
                                                    )}
                                                >
                                                    <option value="" disabled className="bg-neutral-900">Select Here</option>
                                                    {DYNAMIC_FIELDS[selectedPriority as keyof typeof DYNAMIC_FIELDS].field2.options.map(opt => (
                                                        <option key={opt} className="bg-neutral-900 text-white" value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none group-hover:text-gray-300 transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 03. Usage & Final Block */}
                        <AnimatePresence>
                            {isReadyForFinal && (
                                <motion.div
                                    key="usage-section"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="pt-12 border-t border-white/5 space-y-12"
                                >
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-8 block">
                                            03. Usage Estimation
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <label className="text-xs font-bold text-gray-400 block uppercase tracking-wider">
                                                    Monthly Volume
                                                </label>
                                                <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden group focus-within:ring-1 focus-within:ring-amber-500/50 focus-within:border-amber-500/50 transition-all">
                                                    <input
                                                        type="text"
                                                        value={tokenVolume}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/g, "");
                                                            setTokenVolume(val.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                                                        }}
                                                        placeholder="5,000,000"
                                                        className="flex-1 bg-transparent px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none"
                                                    />
                                                    <select
                                                        value={unit}
                                                        onChange={(e) => setUnit(e.target.value as any)}
                                                        className="bg-white/5 border-l border-white/10 px-4 py-4 text-sm text-gray-400 focus:outline-none cursor-pointer hover:text-white transition-colors"
                                                    >
                                                        <option className="bg-neutral-900" value="Tokens">Tokens</option>
                                                        <option className="bg-neutral-900" value="Requests">Requests</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-xs font-bold text-gray-400 block uppercase tracking-wider">
                                                    Account Type
                                                </label>
                                                <div className="grid grid-cols-2 gap-4 h-full">
                                                    {(["Individual", "Organization"] as const).map((type) => (
                                                        <motion.button
                                                            key={type}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => setAccountType(type)}
                                                            className={cn(
                                                                "py-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center",
                                                                accountType === type
                                                                    ? "bg-amber-500/10 border-amber-500/50 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                                                                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
                                                            )}
                                                        >
                                                            {type}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Capabilities Toggle */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        {[
                                            {
                                                id: 'reasoning',
                                                label: 'Enable Reasoning Mode',
                                                sub: 'Enhanced logic for problem solving.',
                                                state: enableReasoning,
                                                setter: setEnableReasoning
                                            },
                                            {
                                                id: 'priority',
                                                label: 'High-Priority Infrastructure',
                                                sub: 'Dedicated lanes with <100ms latency.',
                                                state: highPriority,
                                                setter: setHighPriority
                                            }
                                        ].map((item) => (
                                            <motion.button
                                                key={item.id}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => item.setter(!item.state)}
                                                className={cn(
                                                    "flex items-start gap-4 p-5 rounded-2xl border transition-all group",
                                                    item.state ? "bg-amber-500/5 border-amber-500/20" : "bg-white/2 border-transparent hover:border-white/10"
                                                )}
                                            >
                                                <div className={cn(
                                                    "mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all flex-shrink-0",
                                                    item.state ? "bg-amber-500 border-amber-500" : "border-white/20 group-hover:border-white/40"
                                                )}>
                                                    {item.state && <Check className="w-3.5 h-3.5 text-black stroke-[3px]" />}
                                                </div>
                                                <div className="text-left">
                                                    <span className={cn(
                                                        "font-semibold block transition-colors",
                                                        item.state ? "text-amber-500" : "text-gray-200"
                                                    )}>
                                                        {item.label}
                                                    </span>
                                                    <span className="text-xs text-gray-500 mt-1 block leading-normal">
                                                        {item.sub}
                                                    </span>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Estimate CTA */}
                                    <div className="pt-8 text-center">
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleGenerateEstimate}
                                            disabled={isGenerating}
                                            className={cn(
                                                "relative group px-12 py-5 rounded-full bg-amber-500 text-black font-extrabold text-lg transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_50px_rgba(245,158,11,0.4)] overflow-hidden",
                                                isGenerating ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
                                            )}
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {isGenerating ? "Analyzing Workload..." : "Generate Estimate"}
                                                <Sparkles className={cn("w-5 h-5", isGenerating ? "animate-spin" : "animate-pulse")} />
                                            </span>
                                            {isGenerating && (
                                                <motion.div
                                                    initial={{ x: "-100%" }}
                                                    animate={{ x: "100%" }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                                        </motion.button>

                                        {/* Result Display */}
                                        <AnimatePresence>
                                            {showResult && estimate && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    className="mt-12 p-1 bg-gradient-to-br from-amber-500/20 via-white/5 to-transparent rounded-3xl"
                                                >
                                                    <div className="bg-neutral-950 rounded-[22px] p-8 md:p-10 relative overflow-hidden">
                                                        {/* Close button for result */}
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => setShowResult(false)}
                                                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </motion.button>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                                            <div className="text-left space-y-2">
                                                                <span className="text-xs font-bold text-amber-500/60 uppercase tracking-widest">Estimated Monthly</span>
                                                                <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                                                                    {estimate.cost}
                                                                </div>
                                                                <p className="text-sm text-gray-500 italic">*Based on current compute spot rates</p>
                                                            </div>

                                                            <div className="flex flex-col gap-4 border-y md:border-y-0 md:border-x border-white/10 py-6 md:py-0 md:px-8">
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <span className="text-gray-400">Compute Tier</span>
                                                                    <span className="text-white font-mono">{estimate.compute}</span>
                                                                </div>
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <span className="text-gray-400">P99 Latency</span>
                                                                    <span className="text-amber-500 font-mono">{estimate.latency}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col gap-3">
                                                                <motion.button 
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                                                >
                                                                    Start Free Trial
                                                                </motion.button>
                                                                <motion.button 
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    className="w-full py-3 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-colors"
                                                                >
                                                                    Contact Sales
                                                                </motion.button>
                                                            </div>
                                                        </div>

                                                        <div className="mt-8 flex items-center gap-2 text-[10px] text-gray-600 justify-center">
                                                            <Info className="w-3 h-3" />
                                                            Estimates are calculated using Auren Dynamic Pricing Engine v4.2
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="mt-6 flex items-center justify-center gap-6 opacity-40 grayscale pointer-events-none">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scalable</span>
                                            <div className="w-1 h-1 rounded-full bg-white/50" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Secure</span>
                                            <div className="w-1 h-1 rounded-full bg-white/50" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Adaptive</span>
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
