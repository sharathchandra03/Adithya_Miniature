'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

/**
 * A media plate that shows a poster image and, if a video src is provided AND
 * the file exists, upgrades to an inline <video>. Poster-only if no video.
 * This lets the client drop videos into /public/videos later with no rewrite.
 */
export default function MediaFeature({
  poster,
  posterAlt,
  videoSrc,
  index,
  dark = true,
}: {
  poster: string;
  posterAlt: string;
  videoSrc?: string;
  index: string;
  dark?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const showVideo = !!videoSrc && !failed;

  return (
    <div className={dark ? 'plate-dark' : 'plate'}>
      <div className="plate-core relative aspect-video">
        <Image
          src={poster}
          alt={posterAlt}
          fill
          sizes="(max-width: 768px) 90vw, 55vw"
          className={`object-cover transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-100'}`}
        />
        {showVideo && (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              playing ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <span className="absolute left-4 top-4 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/85">
          {index}
        </span>

        {showVideo ? (
          <button
            type="button"
            aria-label={playing ? 'Pause video' : 'Play video'}
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              if (playing) {
                v.pause();
                setPlaying(false);
              } else {
                v.play().then(() => setPlaying(true)).catch(() => setFailed(true));
              }
            }}
            className="group absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/90 text-ink transition-transform duration-500 ease-expo group-hover:scale-110">
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11l9-5.5-9-5.5z" /></svg>
              )}
            </span>
          </button>
        ) : (
          <span className="absolute bottom-4 right-4 rounded-full bg-ink/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/80 backdrop-blur">
            Film coming soon
          </span>
        )}
      </div>
    </div>
  );
}
