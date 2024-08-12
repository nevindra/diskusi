import { useAnonStore } from '@/state/anonState';

export const useAnon = () => {
	const { isAnon, setIsAnon } = useAnonStore();

	const toggleAnon = () => {
		setIsAnon(!isAnon);
	};

	return { isAnon, toggleAnon };
};