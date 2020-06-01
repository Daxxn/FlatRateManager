import React from 'react';
import './App.css';
import MainPage from './components/MainPage';
import banner from './banner-main.svg';

function App() {
  const APIData = {
    APIBase: 'http://localhost:9000',
    APIVehicles: '/vehicles',
    APIJobs: '/jobs',
    methods: {
      get: 'GET',
      post: 'POST',
      put: 'PUT',
      patch: 'PATCH',
      delete: 'DELETE',
    },
    headers: {
      'Content-Type': 'application/json',
    }
  };
  return (
    <div className="App">
      <header>
        <img src={banner} alt="Flat Rate Manager" />
      </header>
      <div>
        <MainPage APIData={APIData} />
      </div>
    </div>
  );
}

export default App;
