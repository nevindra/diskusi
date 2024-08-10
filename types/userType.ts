export type UserType = {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    password: string;
    bio: string;
    avatarUrl: string;
}

export type UsersExplore = {
    username: string;
    avatarUrl: string;
    bio: string;
    questionCount: number;
}