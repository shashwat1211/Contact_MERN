import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
    const {logout} =useLogout();
    const { user } = useAuthContext();
    const handleClick = ()=>{
        logout()
    }
    return ( 
        <header>
        <div className="container">
            <Link to="/"><h1>Contacts</h1></Link>
            <nav>
                {user && 
                    (<div>
                        <button onClick={handleClick}>Log Out</button>
                    </div>)
                }
                {!user &&(
                    <div>
                        <Link to="/signup">Sign up</Link>
                        <Link to="/login">Log in</Link>
                    </div>)}
            </nav>
            
            
        </div>
        </header>
     );
}
 
export default Navbar;