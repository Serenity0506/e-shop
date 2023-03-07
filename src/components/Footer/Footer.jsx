import "./styles/footer.css"
import "./styles/footer_title.css"
import "./styles/footer_logo.css"
import "./styles/footer_link.css"
import "./styles/footer_left.css"
import { NavLink } from "react-router-dom"
// import classNames from 'classNames';

import logo from "../Header/images/logo.png"

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer_left'>
        <h1 className='footer_title'>
          <img className='footer_logo' src={logo} alt='logo' />
          DogFood
        </h1>
        <p>DogFood &#169; 2023</p>
      </div>
      <div className='footer_left'>
        <NavLink to='/products' className='footer_link'>
          Каталог
        </NavLink>
        <NavLink to='/favorites' className='footer_link'>
          Избранное
        </NavLink>
        <NavLink to='/user' className='footer_link'>
          Личный кабинет
        </NavLink>
      </div>
      <div className='footer_left'>
        <p className='footer_link'>Мы на связи</p>
        <p className='footer_link'>+7 903 624 0909</p>
      </div>
    </div>
  )
}
