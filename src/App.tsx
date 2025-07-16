import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import AllComponentsTest from './pages/test/AllComponentTest';
import SignupProfile from './pages/signup/SignupprofilePage';
import SignupInfo from './pages/signup/SignupInfoPage';
import SignupGuardianIntro from './pages/signup/SignupGuardianIntroPage';
import SignupGuardianForm from './pages/signup/SignupGuardianFormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignupProfile />} />
        <Route path='/signup/info' element={<SignupInfo />} />
        <Route path='/signup/guardian/intro' element={<SignupGuardianIntro />} />
        <Route path='/signup/guardian/form' element={<SignupGuardianForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
