import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CookbookPage } from './pages/CookbookPage';
import { RecipesPage } from './pages/RecipesPage';
import { VendorsPage } from './pages/VendorsPage';
import { EventsPage } from './pages/EventsPage';
import { CompetitionsPage } from './pages/CompetitionsPage';
import { ParryPage } from './pages/ParryPage';
import { AboutPage } from './pages/AboutPage';
import { FrameGeneratorPage } from './pages/FrameGeneratorPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cookbook" element={<CookbookPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/competitions" element={<CompetitionsPage />} />
            <Route path="/parry" element={<ParryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/frame-generator" element={<FrameGeneratorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
