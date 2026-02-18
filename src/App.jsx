import './App.css';
import Home from './pages/Home/Home.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <main className="app">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
