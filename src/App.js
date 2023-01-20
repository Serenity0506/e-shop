import './App.css';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer'
import { Outlet } from 'react-router-dom';

function App() {

  const goodsList = []



  return (
    <div>
      <Header />
      <Outlet />
      <Footer />

    </div>
  );
}

export { App };
