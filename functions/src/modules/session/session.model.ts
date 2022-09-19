export interface IAuthUser {
    id?: string,
    email: string,
    password: string,
    passwordConfirm?: string
}

export interface IUser {
    name: string,
    email: string,
    createdAt: Date
}

export interface ILoginUser {
    email: string,
    password: string,
}

export interface IResetPass {
    newPassword: string,
    user: any
}

export interface IResetName {
    newDisplayName: string,
    user: any
}