import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ComponentTest from './pages/test/component-test';
import AllComponentsTest from './pages/test/AllComponentTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tests/all' element={<AllComponentsTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
