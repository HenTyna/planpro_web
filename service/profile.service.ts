import {http} from "@/utils/http";
const ServiceId = {
    PROFILE: '/api/wb/v1/users',
    UPLOADIMAGE: '/api/wb/v1/files/upload-image',
}

const getProfile = async () => {
    return http.get(ServiceId.PROFILE).then(res => res?.data?.data).catch(error => error);
}

//update profile
const updateProfile = async (profile: any) => {
    return http.patch(ServiceId.PROFILE, profile);
}

function uploadImage(image: File) {
    const formData = new FormData();
    formData.append("file_data", image)
    const API = ServiceId.UPLOADIMAGE;
    return http.post(API,formData)
}



export const profileService = {
    getProfile,
    updateProfile,
    uploadImage
}