const BASE_URL = "https://localhost:5000/api/v1"


// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/contact",
}


// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}