"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function Magnetic({ children, strength = 0.5 }: { children: React.ReactNode, strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const moveX = (clientX - centerX) * strength;
        const moveY = (clientY - centerY) * strength;

        x.set(moveX);
        y.set(moveY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
        >
            {children}
        </motion.div>
    );
}
