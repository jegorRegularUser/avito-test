import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdListPage from './components/pages/AdPage/AdPage';
import AdFormPage from './components/pages/AdFormPage/AdFormPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<AdListPage />} />
        <Route path="/form" element={<AdFormPage /> } />
      </Routes>
    </Router>
  );
}

export default App;
