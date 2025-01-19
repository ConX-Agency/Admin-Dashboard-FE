export interface ThrowError {
    status: number;
    message: string;
}

export class ApiError extends Error implements ThrowError {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}