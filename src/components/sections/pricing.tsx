"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: "$0",
        description: "For individuals exploring the potential of Auren.",
        features: ["500 tokens / month", "Standard reasoning", "Community support"]
    },
    {
        name: "Pro",
        price: "$49",
        description: "For professionals requiring unlimited reasoning power.",
        features: ["Unlimited tokens", "Deep reasoning engine", "API access", "Priority support"],
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For organizations with custom workflow needs.",
        features: ["Unlimited everything", "Dedicated representative", "Custom node deployment"]
    }
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-black relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Transparent Pricing.</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Choose the plan that fits your professional workflow. No hidden fees.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-8 rounded-3xl border ${plan.popular ? 'border-amber-500 bg-amber-500/5' : 'border-white/10 bg-white/5'} flex flex-col`}
                        >
                            {plan.popular && (
                                <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">Most Popular</span>
                            )}
                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                {plan.price !== "Custom" && <span className="text-gray-500">/mo</span>}
                            </div>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed">{plan.description}</p>
                            
                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-amber-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            
                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-amber-500 text-black hover:bg-amber-600' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
