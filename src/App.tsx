import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdListPage from './components/pages/AdListPage/AdListPage';
import AdFormPage from './components/pages/AdFormPage/AdFormPage';
import AdPage from './components/pages/AdPage/AdPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<AdListPage />} />
        <Route path="/form" element={<AdFormPage mode="create" />} />
        <Route path="/form/:id" element={<AdFormPage mode="edit" />} />
        <Route path="/item/:id" element={<AdPage />} />
      </Routes>
    </Router>
  );
}

export default App;
