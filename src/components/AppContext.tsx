import React, { createContext, useReducer } from 'react';

interface State {
    password: string;
    options: {
        length: number;
        useSpecialCharacters: boolean;
        useNumbers: boolean;
        useUppercase: boolean;
    };
}

type Action =
    | { type: 'updatePassword'; payload: string }
    | { type: 'updateOptions'; payload: State['options'] };

const initialState: State = {
    password: '',
    options: {
        length: 10,
        useSpecialCharacters: false,
        useNumbers: false,
        useUppercase: false
    },
};

const AppContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
    state: initialState,
    dispatch: () => ("")
});

function appReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'updatePassword':
            return { ...state, password: action.payload };
        case 'updateOptions':
            return { ...state, options: action.payload };
        default:
            return state;
    }
}

function AppProvider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };