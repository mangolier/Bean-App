import React, { ReactNode, createContext, useState, useContext, useCallback, useEffect } from 'react';

type AnimationPhase = 'initial' | 'waiting' | 'entering' | 'entered' | 'loading' | 'loaded';

interface AppContextType {
    phase: AnimationPhase;
    setPhase: (phase: AnimationPhase) => void;
    reset: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const storedJwt = localStorage.getItem('jwt');
    const params = new URLSearchParams(window.location.search);
    const isCallbackWithToken = !!params.get('token');
    const [phase, _setPhase] = useState<AnimationPhase>(!isCallbackWithToken && storedJwt === null ? 'initial' : 'entering');

    const allowedTransitions: Record<AnimationPhase, AnimationPhase[]> = {
        initial: ['waiting'],
        waiting: ['entered'],
        entering: ['entered'],
        entered: ['loading'],
        loading: ['loading'],
        loaded: [],
    };

    const setPhase = useCallback((next: AnimationPhase) => {
        if (phase === next) return;
        const valid = allowedTransitions[phase] || [];
        if (valid.includes(next)) {
            _setPhase(next);
        }
    }, [phase]);

    const reset = useCallback(() => {
        _setPhase('initial');
    }, []);

    return (
        <AppContext.Provider
            value={{
                phase,
                setPhase,
                reset,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};
