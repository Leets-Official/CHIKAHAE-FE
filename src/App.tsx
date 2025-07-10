import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ToastTest from './pages/test/ToastTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/toast-test' element={<ToastTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
