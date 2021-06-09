import '../../styles/pages/home.css';

function Home() {
    return (
        <div id="homepage">
        <div className="home-top-contents">
          <h1 className="top-text">Animelist</h1>
          <div className="home-top-right-menu">
            <div className="menu-content">
              <div className="signin-button">Sign In</div>
            </div>
  
            <div className="menu-content">
            <div className="signup-button"><a href="/register">Sign Up</a></div>
            </div>
  
          </div>
        </div>
       
        <div className="home-body-section">
          <div className="home-body-content">
            <h1>Most Popular Animes</h1>
            <div className="home-body-content-box">
              <div className="home-body-slide">
                quadrado aqui
              </div>
              <div className="home-body-slide-description">
                descrição aqui
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;