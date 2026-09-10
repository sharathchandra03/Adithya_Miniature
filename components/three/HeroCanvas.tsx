'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import SceneFallback from './SceneFallback';

const TrackScene = dynamic(() => import('./TrackScene'), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Capability gate for the hero 3D scene.
 * Full R3F scene only on: desktop-ish width, motion allowed, WebGL present.
 * Otherwise the CSS/SVG fallback (protects mobile GPUs + reduced motion).
 */
export default function HeroCanvas() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wideEnough = window.matchMedia('(min-width: 768px)').matches;
    const canWebGL = webglAvailable();
    setUse3D(!reduced && wideEnough && canWebGL);
  }, []);

  return (
    <div className="absolute inset-0">
      {use3D ? <TrackScene /> : <SceneFallback />}
    </div>
  );
}
