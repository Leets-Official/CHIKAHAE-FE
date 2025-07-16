import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import AllComponentsTest from './pages/test/AllComponentTest';
import SignupProfile from './pages/signup/SignupprofilePage';
import SignupInfo from './pages/signup/SignupInfoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignupProfile />} />
        <Route path='/signupinfo' element={<SignupInfo />} />
        <Route path='/tests/all' element={<AllComponentsTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
