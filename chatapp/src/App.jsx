import { useEffect, useState } from 'react';
import { auth } from './firebase';
import './App.css';
import Homepage from './components/Homepage';
import Chatsection from './components/Chatsection';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="App">
        {!user ? <Homepage /> : <Chatsection user={user} />}
      </div>
    </>
  );
}
