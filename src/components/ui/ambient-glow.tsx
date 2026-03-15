"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function AmbientGlow() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 200 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
            style={{
                background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(245, 158, 11, 0.035), transparent 80%)`,
            }}
        />
    );
}
