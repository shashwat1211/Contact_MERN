import {useState} from "react";
import { useContactsContext } from "../hooks/useContactsContext";
import { useAuthContext } from "../hooks/useAuthContext"
const ContactForm = () => {
    const {dispatch} = useContactsContext()
    const [name , setName] = useState("");
    const [info, setInfo] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [error ,setError] =useState(null);
    const [empty , setEmpty] = useState([])
    const {user} = useAuthContext()


    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!user){
            setError("Login required")
            return
        }
        const contact = {name , info , email , address};
        const response = await fetch("/api/contacts",{
            method:"POST",
            body:JSON.stringify(contact),
            headers:{
                "Content-type":"application/json",
                Authorization: `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(!response.ok){
            setError(json.error)
            setEmpty(json.empty)
        }
        if(response.ok){
            setError(null)
            setName("")
            setInfo("")
            setEmail("")
            setAddress("")
            setEmpty([])
            console.log("new contact added " , json)
            dispatch({type:"CREATE_CONTACT",payload:json})
        }
    }
    return ( 

        <form className="create" onSubmit ={handleSubmit}>
            <h2>Create a new Contact</h2>
            <label>Name : </label>
            <input type='text' value={name} onChange={(e) =>{setName(e.target.value)}} className={empty.includes("name")?"error":""} />

            <label>Contact No. : </label>
            <input type='number' value={info} onChange={(e) => { setInfo(e.target.value) }} className={empty.includes("info") ? "error" : ""} />

            <label>Email : </label>
            <input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className={empty.includes("email") ? "error" : ""} />
            <label>Address  : </label>
            <input type='text' value={address} onChange={(e) => { setAddress(e.target.value) }} />
            <button className="btn" > Add Contact</button>
            {error && <div className="error">{error}</div> }
        </form>
     );
}
 
export default ContactForm;