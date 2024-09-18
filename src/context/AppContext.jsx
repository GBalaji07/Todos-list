import { createContext } from "react";


export const AppContext=createContext();


const ContextProvider =(props)=>{
    const  phone ='+91 8825971339';
    
    return(
        <AppContext.Provider value={phone}>
            {props.children}
        </AppContext.Provider>
    )
}
export default ContextProvider;