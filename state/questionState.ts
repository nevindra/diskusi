import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TempQuestionState = {
	questions: Record<string, string>;
	setQuestion: (userId: string, question: string) => void;
	getQuestion: (userId: string) => string;
    clearAllQuestions: () => void;

};

export const useTempQuestionStore = create<TempQuestionState>()(
	persist(
		(set, get) => ({
			questions: {},
			setQuestion: (userId, question) =>
				set((state) => ({
					questions: { ...state.questions, [userId]: question },
				})),
			getQuestion: (userId) => get().questions[userId] || '',
            clearAllQuestions: () => set({ questions: {} }),
		}),
		{
			name: 'temp-questions-storage',
		}
	)
);
