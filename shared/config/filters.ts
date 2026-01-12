export type ImageFilter = {
  id: string;
  label: string;
  css: string;
};

export const IMAGE_FILTERS: ImageFilter[] = [
  { id: 'normal', label: 'Normal', css: 'none' },
  { id: 'aden', label: 'Aden', css: 'sepia(.2) brightness(1.15) saturate(1.4)' },
  { id: 'clarendon', label: 'Clarendon', css: 'sepia(.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)' },
  { id: 'crema', label: 'Crema', css: 'sepia(.5) contrast(1.25) brightness(1.15) saturate(.9) hue-rotate(-2deg)' },
  { id: 'gingham', label: 'Gingham', css: 'contrast(1.1) brightness(1.1)' },
  { id: 'juno', label: 'Juno', css: 'sepia(.35) contrast(1.15) brightness(1.15) saturate(1.8)' },
  { id: 'lark', label: 'Lark', css: 'sepia(.25) contrast(1.2) brightness(1.3) saturate(1.25)' },
  { id: 'ludwig', label: 'Ludwig', css: 'sepia(.25) contrast(1.05) brightness(1.05) saturate(2)' },
  { id: 'moon', label: 'Moon', css: 'brightness(1.4) contrast(.95) saturate(0) sepia(.35)' },
];
