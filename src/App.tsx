import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import LoginPage from './pages/Login/LoginPage';
import KakaoCallback from './pages/Login/auth/KakaoCallback';
import AllComponentsTest from '@/pages/test/AllComponentTest';
import StartQuizPage from '@/pages/quiz/StartQuizPage';
import QuizPage from '@/pages/quiz/QuizPage';
import SignupPage from './pages/Login/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='signup' element={<SignupPage />} />
        <Route path='/auth/kakao/callback' element={<KakaoCallback />} />
        <Route path='/tests/all' element={<AllComponentsTest />} />
        <Route path='/quiz/start' element={<StartQuizPage />} />
        <Route path='/quiz' element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
