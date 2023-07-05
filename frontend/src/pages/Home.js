//eslint-disable
import {useEffect} from "react"
import { useContactsContext } from "../hooks/useContactsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Contactdetails from "../components/ContactDetails"
import ContactForm from "../components/ContactForm"
const Home = () => {
   // const [contacts , setContacts] =  useState(null)

   const{contacts, dispatch} = useContactsContext()
    const { user } = useAuthContext();
    useEffect(() => {
        const fetchContact = async()=>{
            const response = await fetch("/api/contacts" , {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            })
            const json = await response.json();
            if(response.ok){
              //  setContacts(json); 
              dispatch({type:"SET_CONTACTS" , payload:json})
            }
        }
        if(user)
        fetchContact();
        }, [dispatch , user])
    return (     
        <div className="home">
            <div className="contacts">
                {contacts && contacts.map((contact)=>{
                    return (
                    <Contactdetails key ={contact._id}  contact = {contact} />
                    )
                })}
            </div>
            <ContactForm />
        </div>
     );
}
 
export default Home;