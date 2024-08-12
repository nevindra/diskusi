import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AnonState = {
	isAnon: boolean;
	setIsAnon: (isAnon: boolean) => void;
};

export const useAnonStore = create<AnonState>()(
	persist(
		(set) => ({
			isAnon: false,
			setIsAnon: (isAnon) => set({ isAnon }),
		}),
		{
			name: 'anon-storage',
		}
	)
);