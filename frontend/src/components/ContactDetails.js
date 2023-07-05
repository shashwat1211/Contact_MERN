import { useContactsContext } from "../hooks/useContactsContext";
import {formatDistance } from "date-fns"
import { useAuthContext } from "../hooks/useAuthContext";
const Contactdetails = ({contact}) => {
    const { user } = useAuthContext()
    const {dispatch} = useContactsContext()
    const handleClick = async()=>{
        if(!user)return
        const response = await fetch("/api/contacts/" + contact._id , {
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        })
        if(response.ok){
            const json = await response.json();
            dispatch({type:"DELETE_CONTACT" , payload:json});
        }
    }
    return ( 
        <div className="contact-details">
            <h3>{contact.name}</h3>
            <p> <strong>Contact no. : </strong>{contact.info}</p>
            {contact.email && <p> <strong>Email : </strong>{contact.email}</p>}
            {contact.address && <p> <strong>Address : </strong>{contact.address}</p>}
            <p>{formatDistance(new Date(contact.createdAt) , Date.now(), { addSuffix: true })}</p>
            
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
     );
}
 
export default Contactdetails;