import logo from './assets/react.svg';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import RegisterBoard from './components/RegisterBoard';
import LoginBoard from './components/LoginBoard';
import MessageBoard from './components/MessageBoard';
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';
import { AuthProvider } from './components/AuthContext';


function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <Routes>
          <Route path="/" element={<PublicRoute />}>
              {/* Publuc routes as children of the route using PublicRoute */}
              <Route path="/register" element={<RegisterBoard />} />
              <Route path="/login" element={<LoginBoard />} />
              <Route path="/" element={<RegisterBoard />} />
          </Route>

          <Route path="/" element={<ProtectedRoute />}>
              {/* Protected routes as children of the route using ProtectedRoute */}
              <Route path="messageBoard" element={<MessageBoard />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
