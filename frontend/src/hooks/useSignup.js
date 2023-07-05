import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error , setError] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const {dispatch} = useAuthContext()

    const signup = async(email, password)=>{
        setIsPending(true)
        setError(null)
        const response  = await fetch("/api/user/signup", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({email , password})
        })
        const json = await response.json();
        if(!response.ok){
            setError(json.error)
            setIsPending(false);
        }
        if(response.ok){
            localStorage.setItem("user" , JSON.stringify(json))
            dispatch({type:"LOGIN" , payload:json})
            setIsPending(false)

        }
    }
    return { signup, error, isPending }
}

