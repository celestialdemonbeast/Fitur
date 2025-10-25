import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AudioConverter from './pages/AudioConverter';
import AudioCompressor from './pages/AudioCompressor';
import AudioCutter from './pages/AudioCutter';
import AudioJoiner from './pages/AudioJoiner';
import AudioExtractor from './pages/AudioExtractor';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/converter" element={<AudioConverter />} />
          <Route path="/compressor" element={<AudioCompressor />} />
          <Route path="/cutter" element={<AudioCutter />} />
          <Route path="/joiner" element={<AudioJoiner />} />
          <Route path="/extractor" element={<AudioExtractor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


