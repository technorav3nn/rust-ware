export class Logger {
    public static info(message: string) {
        console.log(`\x1b[34m[INFO]\x1b[0m ${message}`);
    }

    public static warn(message: string) {
        console.log(`\x1b[33m[WARN]\x1b[0m ${message}`);
    }

    public static error(message: string) {
        console.log(`\x1b[31m[ERROR]\x1b[0m ${message}`);
    }
}
