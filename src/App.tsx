import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import KakaoCallback from './pages/auth/KakaoCallback';
import QuizPage from '@/pages/quiz/QuizPage';
import SignupPage from './pages/auth/SignupPage';
import QuizStartPage from '@/pages/quiz/QuizStartPage';
import BrushingStartPage from './pages/brushing/BrushingStartPage';
import TermsPage from './pages/auth/terms/TermsPage';
import MyPage from '@/pages/mypage/MyPage';
import MyPageEdit from '@/pages/mypage/EditProfilePage';
import AlarmPage from '@/pages/mypage/AlarmPage';
import UserInfoPage from '@/pages/mypage/UserInfoPage';
import BrushingPage from '@/pages/brushing/BrushingPage';
import RequireAuth from './components/routes/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 필요 없는 페이지 */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login/kakao/callback' element={<KakaoCallback />} />
        <Route path='/terms/:type' element={<TermsPage />} />

        {/* 로그인 필요 페이지 */}
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />} />
          <Route path='/quiz/start' element={<QuizStartPage />} />
          <Route path='/quiz' element={<QuizPage />} />
          <Route path='/brush/start' element={<BrushingStartPage />} />
          <Route path='/brush' element={<BrushingPage />} />
          <Route path='/edit' element={<MyPageEdit />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/mypage/alarm' element={<AlarmPage />} />
          <Route path='/mypage/userinfo' element={<UserInfoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
