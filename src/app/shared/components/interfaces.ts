export interface User {
    email: string
    password: string
}

export interface UserLoginRequestDto {
    refreshToken: string
    token: string
}

export interface Post {
    id?: number,
    title: string,
    body: string,
    createdAt: string,
    status: number
}

export interface PostStatus {
    id: number,
    name: string
}

export interface TokenRequest {
    token: string,
    refreshToken: string
}

export interface PostFilterRequest {
    title: string,
    status: number,
    startDate: string,
    endDate: string
}

export interface FeedbackRequest {
    name: string,
    email: string,
    phoneNumber: string,
    text: string
}

export interface Feedback {
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    text: string,
    createdAt: string
}

export interface FeedbackFilterRequest {
    startDate: string,
    endDate: string
}

export interface UserDto {
    id: string,
    email: string
}

export interface UserDto {
    id: string,
    email: string
}

export interface UserEditDto {
    email: string,
    currentPassword: string,
    newPassword: string
}