export interface ProfileAccount {
    profile_image_url: string;
    username:     string;
    password:       string;
    gender:        string;
    email:         string;
    phone_number:   string;
    status:        string;
}

export interface Note {
    calendarEvent: boolean;
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    color: string;
    textColor: string;
}
