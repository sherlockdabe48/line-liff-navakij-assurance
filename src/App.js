import './App.css';
import liff from '@line/liff'
import logo from './logo.svg'
import { useEffect, useState } from 'react';


function App () {

  const [pictureUrl, setPictureUrl] = useState(logo)
  const [idToken, setIdToken] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [userId, setUserId] = useState('')

  const initLine = () => {
    liff.init({ liffId: '1656915926-LAjMq7EB' }, () => {
      if (liff.isLoggedIn()) runApp() 
      else liff.login()
    }, err => console.error(err))
  }

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      setUserId(profile.userId);
    }).catch(err => console.error(err));
  }

  const logout = () => { 
    liff.logout();
    window.location.reload()
  }

  useEffect(() => {
    initLine()
  }, [])

  return (
    <div className='App'>
      <div className='App-header'>
        <div style={{ textAlign: 'center' }}>
          <h1>Navakij Assurance</h1>
          <hr/>
          <img src={pictureUrl} alt="user" width="300px" height="300px" />
          <p style={{ textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}><b>id token: </b> { idToken }</p>
          <p style={{ textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}><b>display name: </b> { displayName }</p>
          <p style={{ textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}><b>status message: </b> { statusMessage }</p>
          <p style={{ textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}><b>user id: </b>{ userId }</p>
          <button onClick={() => logout()} style={{ width: '100%', height: '30px' }}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default App;
