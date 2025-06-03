import { AuthRequest, SignupRequest } from "@/lib/types/auth";
import {http} from "@/utils/http";
const ServiceId = {
    LOGIN: '/api/wb/v1/auth/login',
    LOGOUT: '/api/wb/v1/auth/logout',
    SING_UP: '/api/wb/v1/auth/signup',
    SEND_OTP: '/api/wb/v1/otp/send',
    SEND_RESET_OTP: '/api/wb/v1/otp/send-reset',
    VERIFY_OTP: '/api/wb/v1/otp/verify',
    RESET_PASSWORD: '/api/wb/v1/auth/reset-password',
    TOKEN: '/api/wb/v1/auth/login/token'
}

const signup = (data: SignupRequest) => {
    return http.post(ServiceId.SING_UP, data);
}

const logout = () => {
    return http.post(ServiceId.LOGOUT);
}

const login = (data: AuthRequest) => {
    console.log(data);
    return http.post(ServiceId.LOGIN, data);
}

export const authService = {
    signup,
    logout,
    login
}