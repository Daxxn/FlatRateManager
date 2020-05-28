import React from 'react';
import './App.css';
import MainPage from './components/MainPage';

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
        <p>
          Flat Rate Job Manager
        </p>
      </header>
      <div>
        <MainPage APIData={APIData}/>
      </div>
    </div>
  );
}

export default App;
