import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import SignupComplete from './pages/signup/SignupCompletePage';
import SignupProfile from './pages/signup/SignupprofilePage';
import SignupInfo from './pages/signup/SignupInfoPage';
import SignupGuardianIntro from './pages/signup/SignupGuardianIntroPage';
import SignupGuardianForm from './pages/signup/SignupGuardianFormPage';
import LoginPage from './pages/Login/LoginPage';
import KakaoCallback from './pages/Login/auth/KakaoCallback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupProfile />} />
        <Route path='/signup/info' element={<SignupInfo />} />
        <Route path='/signup/guardian/intro' element={<SignupGuardianIntro />} />
        <Route path='/signup/guardian/form' element={<SignupGuardianForm />} />
        <Route path='/signup/complete' element={<SignupComplete />} />
        <Route path='/auth/kakao/callback' element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
