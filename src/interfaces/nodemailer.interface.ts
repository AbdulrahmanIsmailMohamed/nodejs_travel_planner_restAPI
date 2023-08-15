export interface NodemailerOption {
    email: string,
    subject: string,
    message: string
}

export interface MailOption {
    from: string,
    to: string
    subject: string,
    html: string
}