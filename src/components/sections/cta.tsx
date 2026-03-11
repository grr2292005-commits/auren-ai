"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            Ready to elevate your <br /> Intelligence?
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                            Join thousands of developers and teams building the future with Auren. Get started today and experience the difference of a premium AI workspace.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center gap-2">
                                Get Started Free
                                <ArrowUpRight className="w-5 h-5" />
                            </button>
                            <button className="px-10 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-all">
                                Contact Sales
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-6 text-gray-500 text-sm">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800" />
                                ))}
                            </div>
                            <span>Trusted by 500+ global teams</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
