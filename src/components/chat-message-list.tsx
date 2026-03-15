"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

import { ResponseRenderer } from "./chat/response-renderer";

export interface Message {
    role: "user" | "assistant" | "system";
    content: string;
    suggestions?: string[];
    type?: "carousel" | "grid" | "steps" | "text";
    data?: any;
}

interface ChatMessageListProps {
    messages: Message[];
    isLoading?: boolean;
}

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div
            ref={scrollRef}
            className="space-y-6 mb-8 max-h-[600px] flex-grow overflow-y-auto custom-scrollbar pr-4 flex flex-col"
        >
            {messages.map((msg, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                        "flex gap-4",
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                >
                    <div
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border",
                            msg.role === "user"
                                ? "bg-white/10 border-white/10 text-white"
                                : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                        )}
                    >
                        {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                        className={cn(
                            "px-4 py-3 rounded-2xl max-w-[85%] text-sm md:text-base leading-relaxed",
                            msg.role === "user"
                                ? "bg-white/5 border border-white/5 text-gray-200"
                                : "bg-amber-500/5 border border-amber-500/10 text-white"
                        )}
                    >
                        <ResponseRenderer 
                            type={msg.type} 
                            data={msg.data} 
                            content={msg.content} 
                        />
                    </div>
                </motion.div>
            ))}

            {isLoading && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 flex-row"
                >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border bg-amber-500/10 border-amber-500/20 text-amber-500">
                        <Bot className="w-4 h-4" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40 animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40 animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40 animate-bounce" />
                    </div>
                </motion.div>
            )}

            {messages.length === 0 && !isLoading && (
                <div className="flex-grow flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in-95 duration-700">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                        <Bot className="w-8 h-8 text-amber-500/50" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Ready to assist.</h3>
                    <p className="text-gray-500 max-w-[280px] leading-relaxed">
                        Auren is active and waiting for your first command. Type below to begin.
                    </p>
                </div>
            )}
        </div>
    );
}
