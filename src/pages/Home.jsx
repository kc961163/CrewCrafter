// src/pages/Home.jsx

function Home() {
    return (
      <div className="home-container">
        <h1>Welcome to Crewmate Creator</h1>
        <p>Create and manage your crew of space travelers!</p>
        <div className="home-actions">
          <a href="/create" className="action-button primary">Create Crewmate</a>
          <a href="/gallery" className="action-button secondary">View Gallery</a>
        </div>
      </div>
    );
  }
  
  export default Home;