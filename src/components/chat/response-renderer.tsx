"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Item {
    title?: string;
    description?: string;
    image?: string;
    icon?: React.ElementType;
    link?: string;
}

interface ResponseRendererProps {
    type?: "carousel" | "grid" | "steps" | "text";
    data?: any;
    content: string;
}

export function ResponseRenderer({ type, data, content }: ResponseRendererProps) {
    if (!type || type === "text") {
        return <p className="leading-relaxed whitespace-pre-wrap">{content}</p>;
    }

    return (
        <div className="space-y-6 w-full">
            {content && <p className="leading-relaxed mb-4">{content}</p>}
            
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full"
                >
                    {type === "carousel" && <CarouselView items={data} />}
                    {type === "grid" && <GridView items={data} />}
                    {type === "steps" && <StepsView items={data} />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function CarouselView({ items }: { items: Item[] }) {
    const [index, setIndex] = React.useState(0);

    if (!items || items.length === 0) return null;

    const next = () => setIndex((i) => (i + 1) % items.length);
    const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

    return (
        <div className="relative group/carousel w-full max-w-[380px] mx-auto">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full flex flex-col min-h-[500px]"
                    >
                        {/* Profile Image Section - Fixed Height */}
                        <div className="relative h-[280px] w-full overflow-hidden">
                            <img 
                                src={items[index].image || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400`}
                                alt={items[index].title}
                                className="w-full h-full object-cover object-center grayscale group-hover/carousel:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                        </div>

                        {/* Content Section - Flexible but Stable */}
                        <div className="p-8 pt-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 mb-3">
                                <h4 className="text-xl font-bold text-white truncate">{items[index].title}</h4>
                                <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-2.5 h-2.5 text-black" />
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                                {items[index].description || "Visionary member of the Auren team focusing on excellence."}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                                        <User className="w-3 h-3 text-amber-500/50" />
                                        <span>{Math.floor(Math.random() * 500) + 100}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                                        <CheckCircle2 className="w-3 h-3 text-amber-500/50" />
                                        <span>{Math.floor(Math.random() * 50) + 10}</span>
                                    </div>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.05, backgroundColor: "#f59e0b", color: "#000" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 py-2 bg-white text-black text-[11px] font-bold rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                >
                                    Connect +
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-1.5 mt-6">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={cn(
                            "h-1 rounded-full transition-all duration-300",
                            i === index ? "bg-amber-500 w-8" : "bg-white/10 w-2 hover:bg-white/30"
                        )}
                    />
                ))}
            </div>

            {/* Side Controls */}
            <button onClick={prev} className="absolute -left-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 md:flex hidden opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-amber-500 hover:border-amber-500 group">
                <ChevronLeft className="w-5 h-5 text-white group-hover:text-black transition-colors" />
            </button>
            <button onClick={next} className="absolute -right-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 md:flex hidden opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-amber-500 hover:border-amber-500 group">
                <ChevronRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
            </button>
        </div>
    );
}


function GridView({ items }: { items: Item[] }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(245, 158, 11, 0.3)" }}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 transition-all group"
                >
                    <h4 className="text-amber-500 font-bold mb-2 flex items-center justify-between">
                        {item.title}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed font-medium">{item.description}</p>
                </motion.div>
            ))}
        </div>
    );
}

function StepsView({ items }: { items: Item[] }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="space-y-8 relative ml-6 mt-6 pb-2">
            <div className="absolute left-[-21px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-500/50 via-amber-500/10 to-transparent" />
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="relative pl-8"
                >
                    <div className="absolute left-[-32px] top-0 w-5 h-5 rounded-full bg-black border-2 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)] flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                    </div>
                    <h4 className="text-white font-bold text-sm mb-1.5 tracking-wide uppercase">{item.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
                </motion.div>
            ))}
        </div>
    );
}
