import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import AllComponentsTest from './pages/test/AllComponentTest';
import StartQuizPage from '@/pages/quiz/QuizStartPage';
import QuizPage from '@/pages/quiz/QuizPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tests/all' element={<AllComponentsTest />} />
        <Route path='/quiz/start' element={<StartQuizPage />} />
        <Route path='/quiz' element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
