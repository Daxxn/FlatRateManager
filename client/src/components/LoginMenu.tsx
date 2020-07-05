import React, { useState, ChangeEvent } from 'react';
import '../styles/MenuBar.css';
import UserModel from '../Models/UserModel';

export interface LoginMenuProps {
  user: UserModel | null;
  isloggedIn: boolean;
  handleLogout: () => void;
  handleLogin: (userName: string, password: string) => void;
}

export default function LoginMenu(props: LoginMenuProps) {
  const {
    user,
    isloggedIn,
    handleLogin,
    handleLogout,
  } = props;
  const [isLoginMode, setLoginMode] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLoginSubmit = () => {
    console.log('in submit');
    handleLogin(userName, password);
    setLoginMode(false);
  };

  const handleLogoutSubmit = () => {
    setUserName('');
    setPassword('');
    handleLogout();
  }

  return (
    <div className="loginmenu">
      {isloggedIn ? (
        <div>
          <p>{user?.userName}</p>
          <button onClick={handleLogoutSubmit}>Log out</button>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
          <button onClick={() => setLoginMode(!isLoginMode)}>Log in</button>
          {isLoginMode ? (
            <div>
              <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setUserName(e.target.value);
                }}
                value={userName}
              />
              <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <button onClick={handleLoginSubmit}>Submit</button>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}