import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Solo importamos Routes
import VerifyTokenPage from './components/VerifyTokenPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

const App = () => {
  return (
    <Router>
      <Routes> {/* Reemplazamos Switch por Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-token" element={<VerifyTokenPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<LoginPage />} /> {/* Ruta por defecto */}
      </Routes>
    </Router>
  );
};
  
export default App;
