export interface Users {
    name: string,
    email: string,
    password: string,
    user_id?: string,
    reset_code_expire?: Date,
    reset_code?: string,
    reset_code_verified?: boolean
}