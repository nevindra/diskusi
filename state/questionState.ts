import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TempQuestionState = {
    questions: Record<string, string>;
    setQuestion: (userId: string, question: string) => void;
    getQuestion: (userId: string) => string;
    clearQ: (userId: string) => void;
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
            clearQ: (userId) => set((state) => {
                const { [userId]: _, ...rest } = state.questions;
                return { questions: rest };
            }),
            clearAllQuestions: () => set({ questions: {} }),
        }),
        {
            name: 'temp-questions-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ questions: state.questions }),
        }
    )
);