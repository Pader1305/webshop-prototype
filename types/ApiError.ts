export class ApiError extends Error {
    constructor(
        public readonly statusCode: number | undefined,
        message: string,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}
