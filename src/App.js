import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />

    </div>
  );
}

export { App };
