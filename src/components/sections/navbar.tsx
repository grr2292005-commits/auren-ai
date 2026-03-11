"use client";

import { motion } from "framer-motion";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-8 px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md pointer-events-auto"
            >
                <div className="flex items-center gap-2 pr-4 border-r border-white/10">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-black text-[10px]">
                        A
                    </div>
                    <span className="text-white font-bold tracking-tight">Auren</span>
                </div>

                <div className="hidden md:flex gap-6">
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Platform</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Solutions</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
                </div>

                <div className="pl-4 border-l border-white/10">
                    <button className="text-sm font-semibold text-white px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                        Join Waitlist
                    </button>
                </div>
            </motion.div>
        </nav>
    );
}
