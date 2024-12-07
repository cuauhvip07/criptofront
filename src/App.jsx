import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Solo importamos Routes
import VerifyTokenPage from './components/VerifyTokenPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import PublicKeyDisplay from './components/PublicKeyDisplay';

const App = () => {
  return (
    <Router>
      <Routes> {/* Reemplazamos Switch por Routes */}
        <Route path="/" element={<RegisterPage />} />
        <Route path="/verify-token" element={<VerifyTokenPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Ruta por defecto */}
        <Route path="/llave-publica" element={<PublicKeyDisplay/>} />
      </Routes>
    </Router>
  );
};
  
export default App;
