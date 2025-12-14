export interface GrecaptchaInstance {
  ready: (callback: () => void) => void;
  render: (container: string | HTMLElement, parameters: GrecaptchaParameters) => number;
  reset: (widgetId?: number) => void;
  getResponse: (widgetId?: number) => string;
  execute: (widgetId?: number) => void;
}

export interface GrecaptchaParameters {
  sitekey: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact' | 'invisible';
  callback?: string | ((token: string) => void);
  'expired-callback'?: string | (() => void);
  'error-callback'?: string | (() => void);
}

declare global {
  interface Window {
    grecaptcha?: GrecaptchaInstance;
    onCaptchaSuccess?: (token: string) => void;
    onCaptchaExpired?: () => void;
    onCaptchaError?: () => void;
  }
}

export {};
