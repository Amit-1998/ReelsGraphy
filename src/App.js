import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from "./Components/SignUp.js";
import Login from './Components/Login.js';
import { AuthProvider } from './Context/AuthContext.js';
import Feed from './Components/Feed.js';
import PrivateRoute from './Components/PrivateRoute.js';
import Profile from './Components/Profile.js';
import ForgetPassword from './Components/ForgetPassword.js';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ForgetPassword />} />
          <Route path='/profile/:id' element={<PrivateRoute component={Profile} />} />
          <Route path='/' element={<PrivateRoute component={Feed} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
