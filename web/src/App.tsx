import React from 'react';
import './styles/global.css';
import './styles/pages/home.css';

function App() {
  return (
    <div id="home-top">
      <div className="home-top-contents">
      <h1>Animelist</h1>
        <div className="home-top-right-menu">
          <div className="menu-content">
            <div className="signin-button">Sign In</div>
          </div>

          <div className="menu-content">
          <div className="signup-button">Sign Up</div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
