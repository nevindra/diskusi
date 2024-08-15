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
    id: string;
    username: string;
    avatarUrl: string | null;
    bio: string | null
}

export type UserProfile = {
    id: string;
    username: string;
    avatarUrl: string;
    bio: string;
}