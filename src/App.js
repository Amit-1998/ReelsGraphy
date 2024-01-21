import logo from './logo.svg';
import SignUp from "./Components/SignUp.js";
import { BrowserRouter } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <BrowserRouter>
       <SignUp />
    </BrowserRouter>
  );
}

export default App;
