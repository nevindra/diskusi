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
    avatarUrl: string | null;
    bio: string | null
    questionCount: number;
}