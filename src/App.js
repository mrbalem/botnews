import React from 'react';
import logo from './logo.svg';
import './App.css';
import Services from './services/index'

function App() {

  const dato =  Services('https://us-central1-botnews-97552.cloudfunctions.net/holamundo', {
              name: "holamundo",
              apellido: "rony"
  })

  console.log(dato)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
