import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './screens/LoginForm';
import RegistrationForm from './screens/RegistrationForm';
import Dashboard from './screens/Dashboard';

function App() {

  return (
    <div className="">
     <Routes>
        <Route path='/' element={<RegistrationForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
     </Routes>
    </div>
  );
}

export default App;
