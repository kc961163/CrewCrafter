// /src/pages/CrewmateGallery.jsx

function CrewmateGallery() {
    return (
      <div className="gallery-container">
        <h1>Crewmate Gallery</h1>
        <p>Your created crewmates will appear here.</p>
        <div className="empty-gallery-message">
          <p>No crewmates found. Create your first crewmate to get started!</p>
          <a href="/create" className="action-button primary">Create Crewmate</a>
        </div>
      </div>
    );
  }
  
  export default CrewmateGallery;