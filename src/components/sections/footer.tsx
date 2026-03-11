"use client";

import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer className="py-12 border-t border-white/5 bg-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-black text-sm">
                            A
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Auren</span>
                    </div>

                    <nav className="flex gap-8">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Enterprise</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Security</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
                    </nav>

                    <div className="text-gray-500 text-sm">
                        © 2026 Auren Intelligence. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
