import type { UserProfile } from '@/types/userType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ProfileState = {
	profileUser: UserProfile;
	setProfile: (
		username: string,
		avatarUrl: string,
		id: string,
		bio: string
	) => void;
	getProfile: () => [string, string, string];
	clearProfile: (username: string) => void;
};

export const useProfileStore = create<ProfileState>()(
	persist(
		(set, get) => ({
			profileUser: {
				username: '',
				avatarUrl: '',
				bio: '',
				id: '',
			},
			setProfile: (username, avatarUrl, id, bio) =>
				set({ profileUser: { username, avatarUrl, bio, id } }),
			getProfile: () => [
				get().profileUser.username,
				get().profileUser.avatarUrl || '',
				get().profileUser.bio || '',
			],
			clearProfile: (username) =>
				set({ profileUser: { username, avatarUrl: '', bio: '', id: '' } }),
		}),
		{
			name: 'profile-storage',
		}
	)
);
