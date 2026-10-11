// components/ui/scroll-reveal.tsx
'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    // ✨ NEW: Choose your premium animation style
    variant?: 'blur' | 'perspective' | 'skew' | 'elastic';
    style?: React.CSSProperties;
}

// 1. The Container (Handles Staggering)
export function RevealContainer({ children, className, delay = 0, style }: RevealProps) {
    const ref = useRef(null);
    // Trigger slightly later (margin: "-50px") so the user actually sees it animating
    const inView = useInView(ref, { once: true, margin: "-50px" });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: delay,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}

// 2. The Item (Handles The Rich Animation)
export function RevealItem({
    children,
    className,
    direction = 'up',
    variant = 'perspective', // 'perspective' is the new default for that 3D rich feel
    style
}: RevealProps) {

    // Calculate movement offsets
    const getDirectionOffset = () => {
        switch (direction) {
            case 'up': return { y: 60, x: 0 };
            case 'down': return { y: -60, x: 0 };
            case 'left': return { x: 60, y: 0 };
            case 'right': return { x: -60, y: 0 };
            default: return { x: 0, y: 0 };
        }
    };

    const offset = getDirectionOffset();

    // ✨ THE PREMIUM ANIMATION VARIANTS
    const variantsMap: Record<string, Variants> = {
        // 1. Perspective: 3D flip effect (Very high-end, great for cards/panels)
        perspective: {
            hidden: {
                opacity: 0,
                ...offset,
                rotateX: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
                rotateY: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
                transformPerspective: 1000,
                scale: 0.9
            },
            visible: {
                opacity: 1,
                x: 0, y: 0,
                rotateX: 0, rotateY: 0,
                scale: 1,
                transition: { type: "spring", damping: 20, stiffness: 100, mass: 1 }
            }
        },

        // 2. Skew: Element bends as it moves, then straightens out (Trendy Awwwards style)
        skew: {
            hidden: {
                opacity: 0,
                ...offset,
                skewY: direction === 'up' ? 5 : direction === 'down' ? -5 : 0,
            },
            visible: {
                opacity: 1,
                x: 0, y: 0,
                skewY: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } // Custom swift-out ease
            }
        },

        // 3. Elastic: Slight overshoot/bounce (Great for icons, badges, stats)
        elastic: {
            hidden: { opacity: 0, ...offset, scale: 0.8 },
            visible: {
                opacity: 1, x: 0, y: 0, scale: 1,
                transition: { type: "spring", damping: 12, stiffness: 200 }
            }
        },

        // 4. Blur: The Apple-style cinematic fade (Enhanced)
        blur: {
            hidden: { opacity: 0, ...offset, scale: 0.95, filter: 'blur(20px)' },
            visible: {
                opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)',
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
            }
        }
    };

    return (
        <motion.div
            variants={variantsMap[variant]}
            className={className}
            style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                ...style,
            }}
        >
            {children}
        </motion.div>
    );
}