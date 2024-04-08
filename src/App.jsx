
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Certificate from './components/Certificate';

function App() {
  return (
    <div
      style={{
        backgroundImage: 'url(https://img.freepik.com/free-vector/circles-background-dark-tones_60389-166.jpg)',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Certificate" element={<Certificate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;