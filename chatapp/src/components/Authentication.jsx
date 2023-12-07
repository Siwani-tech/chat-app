
import "./css/authentication.css"
import { useState } from 'react';
import googleImg from '../assets/icons8-google-48.png';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';


// eslint-disable-next-line react/prop-types
export default function Authentication({ onSignIn }) {
  const [userauth, setuserauth] = useState(false);

  // const signin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     console.log('Signed in user:', user);
  //     setuserauth(true);
  //   } catch (error) {
  //     console.error('Error signing in:', error);
  //     alert('Failed to sign in. Please try again.');
  //   }
  // };

  const signin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Signed in user:', user);
      setuserauth(true);

      // Call the onSignIn function passed from the parent component
      onSignIn();
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  const signOut = () => {
    auth.signOut();
    setuserauth(false);
  };

  return (
    <>
     <div className="heading">Chat Wee</div>
      <div className="container">
        {userauth ? (
          <button onClick={signOut} className="sign-out">Sign out</button>
        ) : (
          <button className="sign-in">
            <div>
            <img
              onClick={signin}
              src={googleImg}
              alt="sign in with google"
              type="button"
            />
            </div>
            <div>
              <span onClick={signin}>Sign in with Google</span>
            </div>
          </button>
        )}
      </div>
    </>
  );
}
