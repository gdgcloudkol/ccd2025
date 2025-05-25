export interface UserProfileData {
    first_name: string;
    last_name: string;
    college?: string;
    company?: string;
    course?: string;
    graduation_year: string;
    phone?: string;
    role: string;
    tsize: string;
    socials: {
        [key: string]: string;
    };

    settings: {
        [key: string]: string;
    };


    pronoun: string;
    profile_lock: boolean;
    student: boolean;
    event_role: string;
    x_event: number | null;
    attempts: number;
    no_show: number;
}

export interface UserData {
    pk: number|undefined;
    email: string;
    first_name: string;
    last_name: string;
    profile: UserProfileData;
    username: string;
}

export interface LoginData {
    access_token: string;
    refresh_token: string;
    user: UserData;
}

export interface SignUpPayload extends SignInPayload {
    password2: string;
}

export interface SignInPayload {
    email: string;
    username: string;
    password1: string;
}

export interface SigninFieldContent {
    name: string;
    type: string;
    placeholder: string;
    show?: boolean;
    error?: string;
}

export interface SigninFieldButtonContent {
    name: string;
    title: string;
    link: string;
}

export interface SignInContent {
    title: string;
    fields: SigninFieldContent[];
    signUp: string;
    signUpLink: string;
    forgotPassword: string;
    forgotPasswordLink: string;
    resendVerificationLink: string;
    resendVerification?: string;
    button: SigninFieldButtonContent[];
}

export interface GenericJson {
    [key: string]: string | undefined | number;
}

export type UserProfile = {
    id: number;
    pronoun: 'he' | 'she' | 'they' | string;
    first_name: string;
    last_name: string;
    settings: Record<string, unknown>;
    country_code: string;
    phone: string;
    college: string | null;
    course: string | null;
    graduation_year: number | null;
    company: string | null;
    role: string;
    socials: {
      github: string;
      twitter: string;
      linkedin: string;
    };
    tsize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | string;
    profile_lock: boolean;
    student: boolean;
    event_role: 'attendee' | 'organizer' | 'volunteer' | string;
    attempts: number;
    no_show: number;
    user: number;
    x_event: string | null;
  };