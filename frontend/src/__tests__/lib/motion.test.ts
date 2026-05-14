// ============================================================================
// Smoke Test: Shared Motion Variants (src/lib/motion)
// ============================================================================

import { describe, it, expect } from 'vitest';
import {
  fadeIn,
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  pageTransition,
  stagger,
  staggerItem,
  scaleIn,
} from '@/lib/motion';

describe('Motion Variants', () => {
  it('fadeIn has hidden/visible states', () => {
    expect(fadeIn.hidden).toBeDefined();
    expect(fadeIn.visible).toBeDefined();
    expect(fadeIn.hidden.opacity).toBe(0);
    expect(fadeIn.visible.opacity).toBe(1);
  });

  it('slideUp has y offset in hidden state', () => {
    expect(slideUp.hidden.y).toBeDefined();
    expect(slideUp.visible.y).toBe(0);
  });

  it('slideDown moves from negative y', () => {
    expect(slideDown.hidden.y).toBeLessThan(0);
    expect(slideDown.visible.y).toBe(0);
  });

  it('slideLeft has negative x offset', () => {
    expect(slideLeft.hidden.x).toBeLessThan(0);
    expect(slideLeft.visible.x).toBe(0);
  });

  it('slideRight has positive x offset', () => {
    expect(slideRight.hidden.x).toBeGreaterThan(0);
    expect(slideRight.visible.x).toBe(0);
  });

  it('pageTransition has initial/animate/transition', () => {
    expect(pageTransition.initial).toBeDefined();
    expect(pageTransition.animate).toBeDefined();
    expect(pageTransition.transition).toBeDefined();
    expect(pageTransition.initial.opacity).toBe(0);
    expect(pageTransition.animate.opacity).toBe(1);
  });

  it('stagger has staggerChildren config', () => {
    expect(stagger.visible.transition?.staggerChildren).toBeDefined();
    expect(stagger.visible.transition?.staggerChildren).toBeGreaterThan(0);
  });

  it('staggerItem includes scale animation', () => {
    expect(staggerItem.hidden.scale).toBeLessThan(1);
    expect(staggerItem.visible.scale).toBe(1);
  });

  it('scaleIn starts at reduced scale', () => {
    expect(scaleIn.hidden.scale).toBeLessThan(1);
    expect(scaleIn.visible.scale).toBe(1);
  });

  it('all variants with transitions use proper easing tuples', () => {
    const variantsWithTransition = [fadeIn, slideUp, slideDown, slideLeft, slideRight, staggerItem, scaleIn];
    for (const variant of variantsWithTransition) {
      if (variant.visible?.transition?.ease) {
        const ease = variant.visible.transition.ease as number[];
        expect(Array.isArray(ease)).toBe(true);
        expect(ease.length).toBe(4);
      }
    }
  });
});
