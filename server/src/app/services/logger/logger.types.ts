export enum LoggLevel {
    info = 'info',
    warning = 'warning',
    error = 'error',
};

export interface ILogger {
    info(msg: string, obj: object): void;
    warning(msg: string, obj: object): void;
    error(msg: string, obj: object): void;
}