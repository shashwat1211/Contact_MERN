import { useAuthContext } from "./useAuthContext";
import { useContactsContext } from "./useContactsContext";

export const useLogout=()=>{
    const {dispatch}  = useAuthContext();
    const {dispatch:contactsDispatch} = useContactsContext();
    const logout =()=>{
        localStorage.removeItem("user");
        dispatch({type:"LOGOUT"})
        contactsDispatch({type:"SET_CONTACTS" , payload:null})
    }
    return {logout}
}