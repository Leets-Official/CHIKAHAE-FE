import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import AllComponentsTest from './pages/test/AllComponentTest';
import QuizStartPage from '@/pages/quiz/QuizStartPage';
import QuizPage from '@/pages/quiz/QuizPage';
import BrushingStartPage from './pages/brushing/BrushingStartPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tests/all' element={<AllComponentsTest />} />
        <Route path='/quiz/start' element={<QuizStartPage />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/brush/start' element={<BrushingStartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
