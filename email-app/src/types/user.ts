export type User = {
    id: number;
    username: string;
    email: string;
}

export type UserSignin = {
    username: string;
    password: string;
}

export type UserRegister = {
    username: string;
    email: string;
    password: string;
    password2: string;
}

export type DataSignin = {
    access_token: string;
    refresh_token: string;
    user: User;
}