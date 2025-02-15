import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdListPage from './components/pages/AdListPage/AdListPage';
import AdFormPage from './components/pages/AdFormPage/AdFormPage';
import AdPage from './components/pages/AdPage/AdPage';
import {Alert} from './components/common';
import './App.css';

let showAlert: (message: string, type: "success" | "error") => void;

function App() {
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    showAlert = (message: string, type: "success" | "error") => {
      setAlert({ message, type });
    };
  }, []);

  return (
    <Router>
      <div className="app">
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<AdListPage />} />
          <Route path="/form" element={<AdFormPage mode="create" />} />
          <Route path="/form/:id" element={<AdFormPage mode="edit" />} />
          <Route path="/item/:id" element={<AdPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export { showAlert };
export default App;
