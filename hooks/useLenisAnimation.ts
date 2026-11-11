// hooks/useLenisAnimation.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface UseLenisAnimationProps {
    trigger: React.RefObject<HTMLElement>;
    animation: gsap.TweenVars;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
}

export const useLenisAnimation = ({
    trigger,
    animation,
    start = 'top 85%',
    end = 'bottom 20%',
    scrub = false,
    markers = false
}: UseLenisAnimationProps) => {
    const animationRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        if (!trigger.current) return;

        animationRef.current = gsap.fromTo(trigger.current, 
            animation.from || {},
            {
                ...animation.to,
                scrollTrigger: {
                    trigger: trigger.current,
                    start,
                    end,
                    scrub,
                    markers: process.env.NODE_ENV === 'development' && markers,
                }
            }
        );

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [trigger, animation, start, end, scrub, markers]);
};