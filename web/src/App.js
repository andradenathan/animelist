import "./global.css";
import Lupa from "./images/lupa.png";
import Background from "./images/background-top.jpg";

import "./pages/Home/home.css";
import "./pages/Home/Home";

function App() {
  return (
    <div id="home">
      <div className="home-top">
        <div className="home-top-contents">
          <div className="login-button">Login</div>

          <div className="register-button">Register</div>
        </div>

        <div className="about">About the AnimeList</div>
        
        <div className="search-content">
          <img className="lupa" src={Lupa} width="25" height="23"></img>
          <input className="search-bar" placeholder="Search your anime..."></input>
        </div>

      </div>

      <div className="background-section">

        <img className="background" src={Background}></img>

        <h1 className="bg-text">AnimeList</h1>
        <p className="bg-subtext">Register on our website and make new friends
        within our anime community!</p>

      </div>

      <div className="animes-content">
        <div className="season-title">
          <h1>Spring 2021 Animes</h1>
          <p>Animes of this season that are releasing episodes</p>
        </div>
      </div>

    </div>
  );
}

export default App;
