import React from 'react';
import './styles/App.css';
import MainPage from './components/MainPage.tsx';
import banner from './banner-main.svg';
// import banner from './PointSpireTest_3.svg';
// import bannerBg from './PointSpireTest_bg.svg';


function App() {
  return (
    <div className="App">
      <header>
        <div className="logo-main">
          {/* <img className="logo-bg" src={bannerBg} alt="Flat Rate Manager" /> */}
          <img className="logo-fg" src={banner} alt="Flat Rate Manager" />
        </div>
      </header>
      <div>
        <MainPage />
      </div>
    </div>
  );
}

export default App;
