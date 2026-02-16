export interface DeviceSession {
  deviceId: number;
  ip: string;
  lastActive: string;
  browserName: string;
  browserVersion: string;
  deviceName: string;
  osName: string;
  osVersion: string;
  deviceType: string; // 'mobile' | 'desktop' | 'tablet' (можно уточнить)
}

export interface SessionsResponse {
  current: DeviceSession;
  others: DeviceSession[];
}
