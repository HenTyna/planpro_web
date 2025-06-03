import {createContext, Dispatch, useContext} from "react";

type StateType = {
    value: any;
}

type ActionType = {
    type: string;
    value: any;
};

type FormContextType = {
    state: StateType;
    dispatch: Dispatch<ActionType>;
}

const initialState: StateType = {
    value: {}
}

export const FormContext = createContext<FormContextType>({
    state: initialState, dispatch: () => null
});

export function useFormContextState(){
    const context = useContext(FormContext);

    if(!context){
        throw new Error("useAppState must be used within a FormProvider")
    }
    return context;
}