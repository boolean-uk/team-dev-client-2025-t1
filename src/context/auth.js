import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/header';
import Modal from '../components/modal';
import Navigation from '../components/navigation';
import useAuth from '../hooks/useAuth';
import { createProfile, login, register } from '../service/apiClient';

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      setToken(storedToken);
      setCurrentUserData(JSON.parse(storedUser)); // NOTE: Probably a safety concern...
      setUser(JSON.parse(storedUser));
      navigate(location.state?.from?.pathname || '/');
    }
  }, [location.state?.from?.pathname, navigate]);

  const handleLogin = async (email, password) => {
    const res = await login(email, password);

    if (!res.data.token) {
      return navigate('/login');
    }

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    setCurrentUserData(res.data.user);
    setToken(res.token);
    navigate(location.state?.from?.pathname || '/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
  };

  const handleRegister = async (email, password) => {
    const res = await register(email, password);
    setToken(res.data.token);

    navigate('/verification');
  };

  const handleCreateProfile = async (firstName, lastName, githubUrl, bio) => {
    const { userId } = jwt_decode(token);

    await createProfile(userId, firstName, lastName, githubUrl, bio);

    localStorage.setItem('token', token);
    navigate('/');
  };

  const value = {
    token,
    currentUserData,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onCreateProfile: handleCreateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  console.log('Enter protected Route');

  let tok = token; // HACK: Use token from localstorage if token is null And path is "profile"
  const pathname = location.pathname.split('/')[1];
  if (pathname === 'profile') {
    tok = localStorage.token; // HACK: Manually load token from localstorage if trying to view profile

    if (!location.state)
      // HACK: Manually define location.state.from.pathname if not provided...
      location.state = { from: { pathname: location.pathname } };
  }

  if (!tok) {
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Modal />
      {children}
    </div>
  );
};

export { AuthContext, AuthProvider, ProtectedRoute };
