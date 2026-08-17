"use client";

import { useEffect, useRef } from "react";

/*
 * React does not serialize the `muted` attribute into SSR HTML, so the
 * browser's autoplay policy blocks the video until hydration — and won't
 * retry on its own. The effect sets the property and starts playback
 * explicitly; it also pauses the loop while the hero is off-screen.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src="/images/hero.mp4"
      poster="/images/hero-poster.png"
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
