"use client";

import { motion } from "framer-motion";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { useState, useRef, useEffect } from "react";
import { ChatMessageList } from "@/components/chat-message-list";
import { Trash2 } from "lucide-react";

interface Message {
    role: "user" | "assistant" | "system";
    content: string;
}

export function PromptPlayground() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "I'm sorry, I encountered an error connecting to my core reasoning engine. Please check your configuration." }
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
                <div className="max-w-4xl mx-auto">
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
                        <div className="bg-[#121212] p-6 md:p-10 rounded-[2.25rem] border border-white/5 relative flex flex-col min-h-[500px]">
                            {/* Window Header */}
                            <div className="absolute top-4 left-6 flex gap-1.5 opacity-40">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                            </div>

                            {messages.length > 0 && (
                                <button
                                    onClick={clearChat}
                                    className="absolute top-4 right-6 text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 text-xs uppercase tracking-widest font-bold"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Reset</span>
                                </button>
                            )}

                            <div className="flex-grow mt-12 mb-6 overflow-hidden flex flex-col">
                                <ChatMessageList messages={messages} isLoading={isLoading} />
                            </div>

                            <div className="max-w-2xl mx-auto w-full">
                                <PromptInputBox
                                    onSend={handleSend}
                                    isLoading={isLoading}
                                    placeholder="Ask Auren anything..."
                                />

                                {messages.length === 0 && (
                                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Try:</span>
                                        <button
                                            onClick={() => handleSend("Build a React dashboard with Tailwind")}
                                            className="text-xs text-amber-500/80 hover:text-amber-500 transition-colors bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/10"
                                        >
                                            "Build a React dashboard"
                                        </button>
                                        <button
                                            onClick={() => handleSend("Explain corporate strategy for a tech startup")}
                                            className="text-xs text-amber-500/80 hover:text-amber-500 transition-colors bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/10"
                                        >
                                            "Explain tech strategy"
                                        </button>
                                    </div>
                                )}
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

