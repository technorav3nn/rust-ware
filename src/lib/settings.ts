export interface Settings {}

const DEFAULT_SETTINGS: Settings = {
    disableIdleKick: true,
    raiseFpsLimit: false,
};

export function setSetting(key: keyof Settings, value: any) {}
