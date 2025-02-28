import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Loading from './pages/loading';
import Verification from './pages/verification';
import { AuthProvider, ProtectedRoute } from './context/auth';
import { ModalProvider } from './context/modal';
import Welcome from './pages/welcome';
import ProfileView from './pages/profileView';
import { useState, createContext } from 'react';

export const LoginContext = createContext();
const App = () => {
  const [loggedInAs, setLoggedInAs] = useState(null);
  console.log(loggedInAs);
  return (
    <>
      <AuthProvider setUser={setLoggedInAs}>
        <ModalProvider>
          <LoginContext.Provider value={{ loggedInAs, setLoggedInAs }}>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="loading" element={<Loading />} />
              <Route path="verification" element={<Verification />} />

              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="welcome"
                element={
                  <ProtectedRoute disabledNav={true}>
                    <Welcome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile/:id"
                element={
                  <ProtectedRoute>
                    <ProfileView />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </LoginContext.Provider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
};

export default App;
