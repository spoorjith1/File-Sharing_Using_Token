import React, { useContext } from 'react';
import './styles/global.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from './pages/UserProfile';
import AddFile from './pages/AddFile';

function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
    {isLoggedIn && <Navbar />}
    <main className='main-content'>
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      <Route path="/register" element={ <PublicRoute><Register /></PublicRoute> } />
      <Route path="/login" element={ <PublicRoute><Login /></PublicRoute>} />
      <Route path="/home" element={ <PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/profile" element={ <PrivateRoute><UserProfile /></PrivateRoute> } />
      <Route path="/add_file" element={ <PrivateRoute><AddFile /></PrivateRoute> } />
    </Routes>
    <Footer />
    </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;