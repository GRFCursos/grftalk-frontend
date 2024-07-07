export type User = {
    id: number,
    avatar: string,
    name: string,
    email: string,
    last_access: string
}

export type APIUpdateUser = {
    user: User
}