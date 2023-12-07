
import "./css/nav.css"
import { auth } from "../firebase";

export default function Navbar() {
    const signOut = () => {
        auth.signOut();
        // You can add the redirection logic here if needed
      };
  return (
    <>
    <div className="navbar">
    <nav>
        <h1 className="logo">Chat wee </h1>
        <div className="links">
         <button className="btn" onClick={signOut}>sign out </button>
        </div>
      </nav>
    </div>
      
    </>
  );
}
