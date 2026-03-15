"use client";

import { motion } from "framer-motion";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { ChatMessageList, type Message } from "@/components/chat-message-list";

export function PromptPlayground() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [reasoningStep, setReasoningStep] = useState("");

    const reasoningSteps = [
        "Analyzing project context...",
        "Optimizing response architecture...",
        "Synthesizing strategic insights...",
        "Finalizing high-fidelity output..."
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isLoading) {
            let step = 0;
            setReasoningStep(reasoningSteps[0]);
            interval = setInterval(() => {
                step = (step + 1) % reasoningSteps.length;
                setReasoningStep(reasoningSteps[step]);
            }, 1500);
        } else {
            setReasoningStep("");
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleSend = async (message: string) => {
        if (!message.trim()) return;

        const newUserMessage: Message = { role: "user", content: message };
        const updatedMessages = [...messages, newUserMessage];

        setMessages(updatedMessages);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response from AI");
            }

            const aiMessage: Message = await response.json();
            console.log("AI Response Received:", aiMessage); // Debug logging
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "I'm sorry, I encountered an error. Please try again." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Experience the interface.</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Our workspace is built for professional workflows. Try the interface below to see how search, reasoning, and canvas integration feel in your hands.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl"
                    >
                        <div className="bg-[#121212] p-6 md:p-10 rounded-[2.25rem] border border-white/5 relative flex flex-col min-h-[650px]">
                            {/* Window Header */}
                            <div className="absolute top-4 left-6 flex gap-1.5 opacity-40">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                            </div>

                            {messages.length > 0 && (
                                <motion.button
                                    whileHover={{ scale: 1.05, color: "#f87171" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={clearChat}
                                    className="absolute top-4 right-6 text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 text-xs uppercase tracking-widest font-bold"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Reset</span>
                                </motion.button>
                            )}

                            <div className="flex-grow mt-12 mb-6 overflow-hidden flex flex-col">
                                <motion.div 
                                    animate={messages.length > 4 ? { scale: 0.98, opacity: 0.9, y: -10 } : { scale: 1, opacity: 1, y: 0 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 120 }}
                                    className="h-full flex flex-col pt-4"
                                >
                                    <ChatMessageList messages={messages} isLoading={isLoading} />
                                </motion.div>
                            </div>

                            <div className="max-w-3xl mx-auto w-full">
                                {isLoading && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-8 flex items-center gap-3 px-1"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                                <span className="text-[10px] font-bold text-amber-500/80 uppercase tracking-[0.2em]">Reasoning</span>
                                            </div>
                                            <span className="text-xs text-gray-500 italic ml-3.5">{reasoningStep}</span>
                                        </div>
                                    </motion.div>
                                )}

                                {messages.length > 0 && !isLoading && messages[messages.length - 1].role === "assistant" && messages[messages.length - 1].suggestions && messages[messages.length - 1].suggestions!.length > 0 && (
                                    <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <div className="flex items-center gap-2 mb-3 px-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50 animate-pulse" />
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Suggested</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 justify-start">
                                            {messages[messages.length - 1].suggestions!.map((suggestion, idx) => (
                                                <motion.button
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ 
                                                        delay: idx * 0.1, 
                                                        type: "spring", 
                                                        stiffness: 260, 
                                                        damping: 20 
                                                    }}
                                                    whileHover={{ 
                                                        scale: 1.02, 
                                                        backgroundColor: "rgba(245, 158, 11, 0.1)", 
                                                        borderColor: "rgba(245, 158, 11, 0.3)" 
                                                    }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleSend(suggestion)}
                                                    className="text-xs text-amber-500/90 bg-amber-500/5 px-4 py-2 rounded-xl border border-amber-500/10 transition-all text-left max-w-xs relative overflow-hidden group"
                                                >
                                                    <span className="relative z-10">{suggestion}</span>
                                                    <motion.div 
                                                        className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        initial={false}
                                                        animate={{ x: ["-100%", "100%"] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                    />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <PromptInputBox
                                    onSend={handleSend}
                                    isLoading={isLoading}
                                    placeholder="Ask Auren anything..."
                                />

                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-12 text-center text-gray-500 text-sm italic">
                        *This is a live preview of the Auren Prompt Interface.
                    </div>
                </div>
            </div>
        </section>
    );
}

