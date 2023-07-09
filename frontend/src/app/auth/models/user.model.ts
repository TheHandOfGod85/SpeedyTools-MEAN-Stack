export interface User {
    _id: string | null
    name: string
    email: string
    photo: string | null
    role: string
    password: string
    passwordConfirm: string
    isActive: boolean
}
