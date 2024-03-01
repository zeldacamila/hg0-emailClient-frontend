export type ResponseType<T, > = {
    status: number;
    message: string;
    data?: T;
    success: boolean;
}

