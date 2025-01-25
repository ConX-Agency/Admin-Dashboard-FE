export interface Admin {
    admin_id: string;
    full_name: string;
    preferred_name: string;
    username: string;
    email_address: string;
    contact_number: string;
    password: string;
    repeat_password?: string;
    status: string;
}