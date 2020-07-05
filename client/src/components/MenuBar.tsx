import React, { useState } from 'react';
import '../styles/MenuBar.css';
import LoginMenu from './LoginMenu';
import UserModel from '../Models/UserModel';

export interface MenuBarProps {

}

export default function MenuBar(props: MenuBarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [tempUser, setTempUser] = useState<UserModel | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleTempLogin = (userName: string, password: string) => {
    console.log(password);
    setTempUser(new UserModel('temp', userName));
    setIsLoggedIn(true);
  };

  const handleTempLogout = () => {
    setTempUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="root">
      <p className="title">MenuBar Test</p>
      <div className={menuOpen ? "loginmenuopen" : "loginmenu"}>
        <button
          type="button"
          className="login"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Login
        </button>
        {menuOpen ? (
          <LoginMenu
            user={tempUser}
            isloggedIn={isLoggedIn}
            handleLogin={handleTempLogin}
            handleLogout={handleTempLogout}
          />
        ) : ''}
      </div>
    </div>
  )
}