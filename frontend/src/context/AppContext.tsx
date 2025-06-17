import React, { ReactNode, createContext, useState, useContext, useCallback, useEffect } from 'react';

type AnimationPhase = 'initial' | 'waiting' | 'entering' | 'entered' | 'loading' | 'loaded';

interface AppContextType {
    phase: AnimationPhase;
    getInitial: () => string;
    setPhase: (phase: AnimationPhase) => void;
    reset: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const storedJwt = localStorage.getItem('jwt');
    const params = new URLSearchParams(window.location.search);
    const isCallbackWithToken = !!params.get('token');
    const [phase, _setPhase] = useState<AnimationPhase>(!isCallbackWithToken && storedJwt === null ? 'initial' : 'entering');

    useEffect(() => {
        console.warn(`Animation phase changed: ${phase}`);
    }, [phase]);

    const setPhase = useCallback((next: AnimationPhase) => {
        const allowedTransitions: Record<AnimationPhase, AnimationPhase[]> = {
            initial: ['waiting'],
            waiting: ['entered'],
            entering: ['entered', 'initial'],
            entered: ['loading'],
            loading: ['loaded'],
            loaded: [],
        };
        if (phase === next) return;
        const valid = allowedTransitions[phase] || [];
        if (valid.includes(next)) {
            _setPhase(next);
        }
    }, [phase]);

    const getInitial = useCallback(() => {
        switch (phase) {
            case 'initial':
            case 'waiting':
                return 'initial';
            case 'loaded':
                return 'loaded';
            default:
                return 'waiting';
        }
    }, [phase]);

    const reset = useCallback(() => {
        _setPhase('initial');
    }, []);

    return (
        <AppContext.Provider
            value={{
                phase,
                getInitial,
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
