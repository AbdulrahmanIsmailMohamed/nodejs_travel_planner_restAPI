import { Users } from "../models/User";

export class SenitizeData {
    user = (userData: Users) => ({
        user_id: userData.user_id,
        name: userData.name,
        email: userData.email
    });

}