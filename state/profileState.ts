import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ProfileState = {
    username: string;
    userId: string;
    bio: string;
    setProfile: (username: string, userId: string, bio: string) => void;
    getProfile: (username: string) => [string, string, string];
    clearProfile: (username: string) => void;
};

export const useProfileStore = create<ProfileState>()(
    persist(
        (set, get) => ({
            username: '',
            userId: '',
            bio: '',
            setProfile: (username, userId, bio) =>
                set((state) => ({
                    username,
                    userId,
                    bio,
                })),
            getProfile: (username) => [get().username, get().userId, get().bio],
            clearProfile: (username) => set((state) => {
                const { username, userId, bio } = state;
                return { username, userId, bio };
            }),
        }),
        {
            name: 'profile-storage',
        }
    )
);