import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUp from "./Components/SignUp.js";
import Login from './Components/Login.js';
import { AuthProvider } from './Context/AuthContext.js';
import Feed from './Components/Feed.js';
import PrivateRoute from './Components/PrivateRoute.js';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/' element={<PrivateRoute component={Feed} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
