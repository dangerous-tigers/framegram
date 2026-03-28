export type TypeDeviceIconKey =
  | 'chrome'
  | 'safari'
  | 'firefox'
  | 'windows'
  | 'mac'
  | 'unknown'
  | 'microsoft edge'
  | 'yandex';

export function getDeviceIconKey(text: string): TypeDeviceIconKey {
  const value = text.toLowerCase();

  switch (value) {
    case 'chrome':
      return 'chrome';
    case 'safari':
      return 'safari';
    case 'firefox':
      return 'firefox';
    case 'windows':
      return 'windows';
    case 'mac':
      return 'mac';
    case 'yandex':
      return 'yandex';
    case 'Microsoft Edge':
      return 'microsoft edge';
    default:
      return 'unknown';
  }
}
