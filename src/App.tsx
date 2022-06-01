import logo from './logo.svg';
import './App.css';
import Login from './views/login/Login';
import RGTChat from './views/chat/RGTChat';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <RGTChat />
      ) : (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Login />
          </header>
        </div>
      )}
    </>
  );
}

export default App;
