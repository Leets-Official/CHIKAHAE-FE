import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import KakaoCallback from './pages/auth/KakaoCallback';
import QuizPage from '@/pages/quiz/QuizPage';
import SignupPage from './pages/auth/SignupPage';
import QuizStartPage from '@/pages/quiz/QuizStartPage';
import BrushingStartPage from './pages/brushing/BrushingStartPage';
import AnimationTest from './pages/test/AnimationTest';
import MyPage from '@/pages/mypage/MyPage';
import MyPageEdit from '@/pages/mypage/EditProfilePage';
import ChikaAlarmPage from '@/pages/mypage/ChikaAlarmPage';
import UserInfoPage from '@/pages/mypage/UserInfoPage';

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
        <Route path='/animation' element={<AnimationTest />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/edit' element={<MyPageEdit />} />
        <Route path='/mypage/alarm' element={<ChikaAlarmPage />} />
        <Route path='/mypage/userinfo' element={<UserInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;