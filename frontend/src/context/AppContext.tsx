import React, { ReactNode, createContext, useState, useContext, useCallback, useEffect } from 'react';

type AnimationPhase = 'initial' | 'waiting' | 'entered' | 'exiting' | 'exited';

interface AppContextType {
    phase: AnimationPhase;
    setPhase: (phase: AnimationPhase) => void;
    reset: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [phase, _setPhase] = useState<AnimationPhase>('initial');

    useEffect(() => {
        console.log(`Animation phase changed: ${phase}`);
    }, [phase]);

    const allowedTransitions: Record<AnimationPhase, AnimationPhase[]> = {
        initial: ['waiting'],
        waiting: ['entered', 'exiting'],
        entered: ['exiting'],
        exiting: ['initial', 'exited'],
        exited: []
    };

    const setPhase = useCallback((next: AnimationPhase) => {
        if (next === 'initial' && phase !== 'exiting') {
            console.warn(`Cannot set to 'initial' from '${phase}'. Use reset().`);
            return;
        }
        const valid = allowedTransitions[phase] || [];
        if (valid.includes(next)) {
            _setPhase(next);
        } else {
            console.warn(`Invalid transition from '${phase}' to '${next}'. Allowed: ${valid.join(', ')}`);
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
