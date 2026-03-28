import { describe, expect, it } from 'vitest';

import { mapTimeAgoLocale } from '../mapTimeAgoLocale';

describe('mapTimeAgoLocale', () => {
  it('returns "ru" for ru locale', () => {
    expect(mapTimeAgoLocale('ru')).toBe('ru');
  });

  it('returns "uk" for uk locale', () => {
    expect(mapTimeAgoLocale('uk')).toBe('uk');
  });

  it('returns "zh" for zh locale', () => {
    expect(mapTimeAgoLocale('zh')).toBe('zh');
  });

  it('returns "hi" for hi locale', () => {
    expect(mapTimeAgoLocale('hi')).toBe('hi');
  });

  it('returns "be" for be locale', () => {
    expect(mapTimeAgoLocale('be')).toBe('be');
  });

  it('returns "en" for en locale', () => {
    expect(mapTimeAgoLocale('en')).toBe('en');
  });

  it('returns "en" by default for unknown locale', () => {
    expect(mapTimeAgoLocale('fr')).toBe('en');
  });
});
