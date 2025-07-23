import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import LoginPage from './pages/auth/LoginPage';
import KakaoCallback from './pages/auth/KakaoCallback';
import StartQuizPage from '@/pages/quiz/StartQuizPage';
import QuizPage from '@/pages/quiz/QuizPage';
import SignupPage from './pages/auth/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/auth/kakao/callback' element={<KakaoCallback />} />
        <Route path='/quiz/start' element={<StartQuizPage />} />
        <Route path='/quiz' element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
