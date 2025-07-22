import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/HomePage';
import AllComponentsTest from '@/pages/test/AllComponentTest';
import StartQuizPage from '@/pages/quiz/StartQuizPage';
import QuizPage from '@/pages/quiz/QuizPage';
import MyPage from '@/pages/mypage/MyPage';
import MyPageEdit from '@/pages/mypage/EditProfilePage';
import EditFieldPage from '@/pages/mypage/EditFieldPage';
import ChikaAlramPage from '@/pages/mypage/ChikaAlramPage';
import TimePickerPage from '@/pages/mypage/TimePickerPage';
import StartQuizPage from '@/pages/quiz/StartQuizPage';
import QuizPage from '@/pages/quiz/QuizPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path='/' element={<Home />} />
        <Route path='/tests/all' element={<AllComponentsTest />} />
        <Route path='/quiz/start' element={<StartQuizPage />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/editprofile' element={<MyPageEdit />} />
        <Route path="/editprofile/:field" element={<EditFieldPage />} />
        <Route path="/chikaAlramPage" element={<ChikaAlramPage />} />
        <Route path="/timePickerPage" element={<TimePickerPage />} />
        <Route path='/quiz/start' element={<StartQuizPage />} />
        <Route path='/quiz' element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
