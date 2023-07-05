import { ContactsContext } from "../context/contactContext";
import {useContext} from "react"

export const useContactsContext =()=>{
    const context = useContext(ContactsContext)

    if(!context){
        throw Error("useContactContext must be used inside contextProvider")
    }

    return context
}