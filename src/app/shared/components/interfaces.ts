export interface User {
    email: string
    password: string
}

export interface UserLoginRequestDto {
    refreshToken: string
    token: string
}

export interface CommentRequest {
  text: string,
  postId: number,
  parrentCommentId?: number
}

export interface CommentDto {
    id?: number,
    text: string,
    isEdited: string,
    isDeleted: string,
    showReply: boolean,
    createdAt: string,
    postId: number,
    parrentCommentId?: number,
    userId: number,
    replies: CommentDto[]
}

export interface Post {
    id?: number,
    title: string,
    body: string,
    image: string,
    createdAt: string,
    status: string
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