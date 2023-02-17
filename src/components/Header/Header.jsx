import styles from './Header.module.css';

import logo from './images/logo.png';
import heart from './images/heart.png';
import user from './images/user.png'
import logout from './images/logout.png'

import briefcase from './images/briefcase.png';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContextProvider';
import { getUserSelector } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { getCartSelector } from '../redux/slices/cartSlice';


export const Header = () => {

    //вытаскиваем из редакса токен и корзину
    const {token} = useSelector(getUserSelector);  
    const cart = useSelector(getCartSelector);

    const { setToken } = useAppContext();

         const MenuBar = (token, setToken) => {
            // if(!props.token) {
            if(!token) {
                return (
                    <Link to='/signin'>
                        <button className={styles.header_button}>
                            <img className={styles.header_logo} src={user} alt="user" />
                        </button>
                    </Link>
                )
            }
        
            return (
                <>
                    <button className={styles.header_button}>
                        <img className={styles.header_logo} src={heart} alt="like" />
                    </button>
                    <Link to='/cart'>
                        <button className={styles.header_button}>
                            <img className={styles.header_logo} src={briefcase} alt="Cart" />
                        </button>
                    </Link>
                    {cart.length ? <div className={styles.header_cartCount}>{cart.length}</div> : null}

                    <Link onClick={() => setToken('')}>
                        <button className={styles.header_button}>
                            <img className={styles.logout_logo} src={logout} alt="logout" />
                        </button>
                    </Link>
                </>
            )
        }

    // const { token, setToken } = useAppContext()

    return (
        <div className={styles.header}>
            <div className={styles.header_left}>
                <Link to='/'>
                  <img className={styles.header_logo} src={logo} alt="logo" />
                </Link>
                <h1 className={styles.header_title}>DogFood</h1>
            </div>
            <input
            // value={title}
            // onChange={changeHandler}
            placeholder="Searching..."
            type="text"
            className={styles.header_input}
          />     

          <div className={styles.header_left}>    
            <MenuBar token={token} setToken={setToken} />
           </div>
        </div>
    )
}