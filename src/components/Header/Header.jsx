import './styles/header.css';
import './styles/header_logo.css';
import './styles/header_title.css';
import './styles/header_left.css';
import './styles/header_input.css';
import './styles/header_button.css';



import logo from './images/logo.png';
import heart from './images/heart.png';
import user from './images/user.png'
import briefcase from './images/briefcase.png';
import { Link } from 'react-router-dom';

export const Header = () => {

    return (
        <div className="header">
            <div className="header_left">
                <Link to='/'>
                  <img className='header_logo' src={logo} alt="logo" />
                </Link>
                <h1 className='header_title'>DogFood</h1>
            </div>
            <input
            // value={title}
            // onChange={changeHandler}
            placeholder="Searching..."
            type="text"
            className='header_input'
          />     

          <div className="header_left">    
           <button className='header_button'>
            <img className='header_logo' src={heart} alt="like" />
           </button>
           <button className='header_button'>
            <img className='header_logo' src={briefcase} alt="like" />
           </button>
           <Link to='/signin'>
                <button className='header_button'>
                    <img className='header_logo' src={user} alt="user" />
                </button>
           </Link>
           </div>

        </div>
    )
}