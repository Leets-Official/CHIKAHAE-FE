import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import KakaoCallback from './pages/auth/KakaoCallback';
import QuizPage from '@/pages/quiz/QuizPage';
import SignupPage from './pages/auth/SignupPage';
import QuizStartPage from '@/pages/quiz/QuizStartPage';
import BrushingStartPage from './pages/brushing/BrushingStartPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/auth/kakao/callback' element={<KakaoCallback />} />
        <Route path='/quiz/start' element={<QuizStartPage />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/brush/start' element={<BrushingStartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
