import './App.css';
import { useState, useRef } from 'react';
import { Auth } from './Components/Auth';
import Cookies from 'universal-cookie';
import { Chat } from './Components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  //User non authentifié
  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth = {setIsAuth}/>
      </div>
    );
  }

  //User authentifié
  const SignOutUser = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  return (
    <>
      {room ? 
      <Chat room = {room}/> :
      <div className='room-container'>
        <div className='room'>
          <label className='room-label'>Enter room name:</label>
          <br />
          <input type="text" placeholder='Room name...' ref={roomInputRef} className='room-input'/>
          <br />
          <button onClick={() => setRoom(roomInputRef.current.value)} className='Enter-button'>Enter chat</button>
        </div>
      </div>
      }
      
      <br />
      <div className='sign-out'>
        <button onClick={SignOutUser}>Sign Out</button>
      </div>
    </>
  )
}

export default App;
