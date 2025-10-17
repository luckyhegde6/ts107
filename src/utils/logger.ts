export interface ILogger {
info: (...args: unknown[]) => void;
warn: (...args: unknown[]) => void;
error: (...args: unknown[]) => void;
}


export class ConsoleLogger implements ILogger {
info(...args: unknown[]) {
console.info('[INFO]', ...args);
}
warn(...args: unknown[]) {
console.warn('[WARN]', ...args);
}
error(...args: unknown[]) {
console.error('[ERROR]', ...args);
}
}


export const logger = new ConsoleLogger();