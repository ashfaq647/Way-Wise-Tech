"use client";

import { useLayoutEffect, useRef } from "react";

/** The marquee's nominal speed in CSS px per second; ClientLogos.tsx sizes its durations for it. */
const NOMINAL_SPEED = 60;

/**
 * Device pixels the strip moves per displayed frame. A whole number (or, on fast displays, an exact
 * half, which alternates between just two positions every frame) keeps every logo at the same
 * sub-pixel position on the screen's pixel grid, so the GPU never resamples it differently from one
 * frame to the next. Any other fraction makes the logos cycle between sharp and soft renders: the
 * shimmer seen at 125% and 150% display scaling, where 1 CSS px is 1.25 or 1.5 device px.
 */
function stepPerFrame(dpr: number, hz: number) {
  const target = (NOMINAL_SPEED * dpr) / hz; // device px per frame at the nominal speed
  if (hz <= 75) return Math.max(1, Math.round(target - 1e-6));
  return Math.max(0.5, Math.round(target * 2 - 1e-6) / 2);
}

function measureRefreshRate(): Promise<number> {
  return new Promise((resolve) => {
    const times: number[] = [];
    const tick = (time: number) => {
      times.push(time);
      if (times.length < 25) requestAnimationFrame(tick);
      else {
        const gaps = times.slice(1).map((t, i) => t - times[i]).sort((a, b) => a - b);
        resolve(Math.round(1000 / gaps[Math.floor(gaps.length / 2)]));
      }
    };
    requestAnimationFrame(tick);
  });
}

/**
 * Renders nothing. Sets the Client Logo Strip's speed factor (--cl-rate) so the marquee moves a whole
 * number of device pixels per frame for this screen's pixel ratio and refresh rate, then marks the
 * strip ready, which starts the CSS animation (client-logos.css holds it until then, so it never
 * jumps when the factor changes). One-time work, repeated only if the pixel ratio changes (another
 * monitor or browser zoom); the movement itself stays a compositor CSS animation.
 */
export function ClientLogosTiming() {
  const marker = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const strip = marker.current?.closest<HTMLElement>(".cl-strip");
    if (!strip) return;
    let cancelled = false;
    let query: MediaQueryList | null = null;

    const apply = async () => {
      const dpr = window.devicePixelRatio || 1;
      const hz = await measureRefreshRate();
      if (cancelled) return;
      const speed = (stepPerFrame(dpr, hz) * hz) / dpr; // CSS px per second
      strip.style.setProperty("--cl-rate", String(NOMINAL_SPEED / speed));
      strip.dataset.clReady = "";
      query?.removeEventListener("change", apply);
      query = window.matchMedia(`(resolution: ${dpr}dppx)`);
      query.addEventListener("change", apply);
    };
    apply();

    return () => {
      cancelled = true;
      query?.removeEventListener("change", apply);
      delete strip.dataset.clReady;
    };
  }, []);

  return <span ref={marker} hidden />;
}
