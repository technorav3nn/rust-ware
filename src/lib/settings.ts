export interface Settings {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEFAULT_SETTINGS: Settings = {
    disableIdleKick: true,
    raiseFpsLimit: false,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setSetting(key: keyof Settings, value: any) {}
