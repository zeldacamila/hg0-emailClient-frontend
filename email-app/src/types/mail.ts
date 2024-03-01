export type Mail = {
    id: number;
    sender: {
        email: string;
    };
    recipient: {
        email: string;
    };
    subject: string;
    timestamp: Date;
    body: string;
    status: boolean;
}