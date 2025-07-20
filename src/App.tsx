import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/components/HomePage';
import MyPage from '@/pages/mypage/MyPage';
import MyPageEdit from '@/pages/mypage/EditProfilePage';
import EditFieldPage from '@/pages/mypage/EditFieldPage';

import Home from '@/pages/Home';
import AllComponentsTest from './pages/test/AllComponentTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/editprofile' element={<MyPageEdit />} />
         <Route path="/editprofile/:field" element={<EditFieldPage />} />
        <Route path="/mypage/edit/:field"  element={<EditFieldPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;