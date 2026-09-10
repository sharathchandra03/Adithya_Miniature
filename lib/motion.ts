// Shared motion tokens so timings/easings stay consistent across the site.
export const EASE = {
  expo: 'expo.out',
  power4: 'power4.out',
  cubic: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export const DUR = {
  micro: 0.3,
  base: 0.7,
  cinematic: 1.1,
};

export const STAGGER = {
  tight: 0.06,
  base: 0.09,
};
