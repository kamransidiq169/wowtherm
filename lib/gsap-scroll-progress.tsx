"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollProgressValue {
  /** Raw GSAP progress ref for direct access in animation loops */
  progressRef: React.RefObject<number>;
}

const ScrollProgressContext = createContext<ScrollProgressValue>({
  progressRef: { current: 0 },
});

export function useHeroScrollProgress() {
  return useContext(ScrollProgressContext);
}

export function HeroScrollProvider({
  triggerId = "hero-experience",
  children,
}: {
  triggerId?: string;
  children: ReactNode;
}) {
  const progressRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: `#${triggerId}`,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    });

    return () => ctx.revert();
  }, [triggerId]);

  const value: ScrollProgressValue = {
    progressRef,
  };

  return (
    <ScrollProgressContext.Provider value={value}>
      {children}
    </ScrollProgressContext.Provider>
  );
}
