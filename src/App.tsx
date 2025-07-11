import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ToastTest from './pages/test/ToastTest';
import NavTest from './pages/test/NavTest';
import RadioButtonTest from './pages/test/RadioButtonTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/toast-test' element={<ToastTest />} />
        <Route path='/nav-test' element={<NavTest />} />
        <Route path='/radio-test' element={<RadioButtonTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
