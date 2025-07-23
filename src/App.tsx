import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/HomePage';
import AllComponentsTest from '@/pages/test/AllComponentTest';
import StartQuizPage from '@/pages/quiz/StartQuizPage';
import QuizPage from '@/pages/quiz/QuizPage';
import MyPage from '@/pages/mypage/MyPage';
import MyPageEdit from '@/pages/mypage/EditProfilePage';
import EditFieldPage from '@/pages/mypage/EditFieldPage';
import ChikaAlarmPage from '@/pages/mypage/ChikaAlarmPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tests/all' element={<AllComponentsTest />} />
        <Route path='/quiz/start' element={<StartQuizPage />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/edit' element={<MyPageEdit />} />
        <Route path='/edit/:field' element={<EditFieldPage />} />
        <Route path='/mypage/alarm' element={<ChikaAlarmPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
