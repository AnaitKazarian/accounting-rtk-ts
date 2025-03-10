export enum UpdateMode {
    DEFAULT, EDIT_PROFILE, CHANGE_PASSWORD
}

export interface UserData {
    firstName: string,
    lastName: string
}

export interface UserProfile extends UserData{
    login: string,
    roles: string[]
}

export interface UserRegister extends UserData{
    login: string,
    password: string
}