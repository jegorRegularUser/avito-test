import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdListPage from './components/pages/AdPage/AdPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<AdListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
