// config.ts
import * as dotenv from "dotenv";

dotenv.config();

export const config = {
    baseURL: process.env.BASE_URL || 'https://example.com',
    valid_username: process.env.VALID_USERNAME || 'testuser',
    valid_password: process.env.VALID_PASSWORD || 'testpassword',
    locked_username: process.env.LOCKED_USERNAME || 'lockeduser',
    locked_password: process.env.LOCKED_PASSWORD || 'lockedpassword',
    wrong_username: process.env.WRONG_USERNAME || 'wronguser',
    wrong_password: process.env.WRONG_PASSWORD || 'wrongpassword'
};