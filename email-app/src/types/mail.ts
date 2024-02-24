export type Mail = {
    id: number;
    sender_email: string;
    recipient_email: string;
    sender_user_id: number;
    recipient_user_id: number;
    subject: string;
    timestamp: string;
    body: string;
    status: boolean;
}