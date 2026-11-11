// components/LenisProvider.tsx (version corrigée)
'use client';
import { useEffect, useRef, useState, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LenisProviderProps {
    children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
    const [mounted, setMounted] = useState(false);
    const lenisRef = useRef<Lenis | null>(null);
    const rafIdRef = useRef<number | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        let isActive = true;

        const initLenis = async () => {
            try {
                // Initialiser GSAP ScrollTrigger
                gsap.registerPlugin(ScrollTrigger);

                // Configuration de Lenis
                const lenis = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: 'vertical',
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                    smoothTouch: false,
                    wheelMultiplier: 0.8,
                    touchMultiplier: 1.2,
                    infinite: false,
                });

                if (!isActive) return;

                lenisRef.current = lenis;

                // Lier Lenis à GSAP ScrollTrigger
                lenis.on('scroll', ScrollTrigger.update);

                // RAF pour Lenis
                const raf = (time: number) => {
                    if (!isActive) return;
                    lenis.raf(time);
                    rafIdRef.current = requestAnimationFrame(raf);
                };
                
                rafIdRef.current = requestAnimationFrame(raf);

                // Intégration GSAP
                gsap.ticker.add(ScrollTrigger.update);
                gsap.ticker.lagSmoothing(0);

                // Initialiser les animations après un court délai
                setTimeout(() => {
                    if (isActive) {
                        setupScrollAnimations();
                        ScrollTrigger.refresh();
                    }
                }, 100);

            } catch (error) {
                console.error('Erreur d\'initialisation Lenis:', error);
            }
        };

        const setupScrollAnimations = () => {
            try {
                const elements = document.querySelectorAll('[data-animate]');
                if (elements.length === 0) return;

                elements.forEach((element) => {
                    const animationType = element.getAttribute('data-animate-type') || 'fadeUp';
                    const duration = parseFloat(element.getAttribute('data-duration') || '1');
                    const delay = parseFloat(element.getAttribute('data-delay') || '0');
                    const start = element.getAttribute('data-start') || 'top 85%';
                    const end = element.getAttribute('data-end') || 'bottom 20%';
                    const scrub = element.getAttribute('data-scrub') === 'true';
                    
                    let fromProps = {};
                    let toProps = {};
                    
                    switch(animationType) {
                        case 'fadeUp':
                            fromProps = { y: 50, opacity: 0 };
                            toProps = { y: 0, opacity: 1 };
                            break;
                        case 'fadeLeft':
                            fromProps = { x: -50, opacity: 0 };
                            toProps = { x: 0, opacity: 1 };
                            break;
                        case 'fadeRight':
                            fromProps = { x: 50, opacity: 0 };
                            toProps = { x: 0, opacity: 1 };
                            break;
                        case 'scale':
                            fromProps = { scale: 0.8, opacity: 0 };
                            toProps = { scale: 1, opacity: 1 };
                            break;
                        default:
                            fromProps = { y: 50, opacity: 0 };
                            toProps = { y: 0, opacity: 1 };
                    }
                    
                    gsap.fromTo(element, fromProps, {
                        ...toProps,
                        duration,
                        delay,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: start,
                            end: end,
                            scrub: scrub,
                            markers: false,
                            invalidateOnRefresh: true,
                        }
                    });
                });
            } catch (error) {
                console.error('Erreur setup animations:', error);
            }
        };

        initLenis();

        // Nettoyage
        return () => {
            isActive = false;
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.ticker.remove(ScrollTrigger.update);
        };
    }, [mounted]);

    return <>{children}</>;
}