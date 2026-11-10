"use client";

import { useEffect, useRef } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { assets } from "@/lib/assets";
import "./footer-background.css";

/**
 * The footer artwork plus its ambient light. The PNG is never altered: all motion is a transform on
 * its wrapper or a separate light layer blended over it. With reduced motion, only the PNG shows.
 */
export function FooterBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Pauses the loops off-screen. Sets an attribute directly so scrolling never re-renders React.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        root.toggleAttribute("data-paused", !entry.isIntersecting);
      },
      { rootMargin: "100px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="footer-bg pointer-events-none absolute inset-0 flex items-center"
    >
      {/*
        Centred at full width in the design. Below 1280px it keeps its design height, so the sides
        crop. The artwork continues past the exported file, so its cut edges fade out.
      */}
      <div className="relative h-[536px] w-full shrink-0 [mask-image:linear-gradient(to_bottom,transparent,black_28px,black_calc(100%-28px),transparent)] xl:aspect-[3840/1072] xl:h-auto">
        <div className="footer-bg-drift absolute inset-0">
          <AssetImage
            src={assets.footerBackground}
            alt=""
            sizes="(max-width: 1279px) 1920px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="footer-bg-glow-left" />
        <div className="footer-bg-glow-right" />
        <div className="footer-bg-sweep-cyan" />
        <div className="footer-bg-sweep-gold" />
      </div>
    </div>
  );
}
