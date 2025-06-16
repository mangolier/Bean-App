import React, { ReactNode, createContext, useState, useContext, useCallback, useEffect } from 'react';

type AnimationPhase = 'initial' | 'waiting' | 'entered' | 'exiting' | 'exited';

interface AppContextType {
    phase: AnimationPhase;
    setPhase: React.Dispatch<React.SetStateAction<AnimationPhase>>;
    reset: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [phase, setPhase] = useState<AnimationPhase>('initial');

    useEffect(() => {
        console.log(`Animation phase changed: ${phase}`);
    }, [phase]);

    const reset = useCallback(() => {
        setPhase('initial');
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
