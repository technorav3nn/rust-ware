export const wait = async (ms: number) =>
    // eslint-disable-next-line @typescript-eslint/return-await, no-promise-executor-return
    await new Promise((r) => setTimeout(r, ms));
