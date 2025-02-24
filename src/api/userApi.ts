import axios, { AxiosResponse } from 'axios';
import api from "./endPoint";

interface ProfileDetails {
    name: string;
    avatar: string;
}

interface UserProfileResponse {
    _id: string;
    avatar: string;
    name: string;
    email: string;
    verified: boolean;
    admin: boolean;
}

//User Login
export async function loginUser(email: string, password: string) {
    const API_URL = `${api.baseApi}/api/users/login`;
    try {
        const response = await axios.post(API_URL, { email, password });
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Error during login:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error during login:", error);
        }
        return null;
    }
}

//Sign Up User
export async function signUpUser(name: string, email: string, password: string) {
    const API_URL = `${api.baseApi}/api/users/register`;
    try {
        const response = await axios.post(
            API_URL,
            {
                name,
                email,
                password,
            },
            {
                validateStatus: () => {
                    return true;
                },
            }
        );
        if (response.status === 201) {
            return response;
        } else if (response.status === 400) {
            return response;
        } else {
            return response;
        }
    } catch (error) {
        console.error("Error in signup API", error);
        return null;
    }
}


// Get user profile
export async function getUserProfile(userToken: string) {
    const url = `${api.baseApi}/api/users/profile`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });
        if (response.status !== 201) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.log("Error", error);
        throw error;
    }
}


//Update user profile
export async function updateUserProfile(
    userId: string,
    profileDetails: ProfileDetails,
    userToken: string
): Promise<UserProfileResponse | undefined> {
    const url = `${api.baseApi}/api/users/updateProfile/${userId}`;
    try {
        const response: AxiosResponse<UserProfileResponse> = await axios.put(
            url,
            {
                name: profileDetails.name,
                avatar: profileDetails.avatar,
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error", error);
        return undefined;
    }
}


//Forgot password
export async function forgotUserPassword(email: string) {
    const API_URL = `${api.baseApi}/api/users/forgot-password`;
    try {
        const response = await axios.post(API_URL, {
            "email": email
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error in Forgot Password API", error);
        return null;
    }
}


//Reset password
export async function resetUserPassword(resetToken: string, newPassword: string) {
    const API_URL = `${api.baseApi}/api/users/reset-password/${resetToken}`;
    try {
        const response = await axios.post(API_URL, {
            "password": newPassword
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error in Forgot Password API", error);
        return null;
    }
}
