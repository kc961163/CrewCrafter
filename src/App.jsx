// src/App.jsx

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateCrewmate from './pages/CreateCrewmate';
import CrewmateGallery from './pages/CrewmateGallery';
import CrewmateDetail from './pages/CrewmateDetail';
import EditCrewmate from './pages/EditCrewmate';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <div className="logo">Crewmate Creator</div>
          <nav className="nav-menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create">Create</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </nav>
        </header>
        
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<CrewmateGallery />} />
            <Route path="/gallery/:id" element={<CrewmateDetail />} />
            <Route path="/edit/:id" element={<EditCrewmate />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>Crewmate Creator - React Project</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;