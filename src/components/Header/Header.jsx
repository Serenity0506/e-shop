import styles from './Header.module.css';

import logo from './images/logo.png';
import heart from './images/heart.png';
import user from './images/user.png'
import logout from './images/logout.png'

import briefcase from './images/briefcase.png';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContextProvider';

export const Header = () => {

    const { setToken } = useAppContext()
    function signOutHandler() {
        setToken('');
    }

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
            <button className={styles.header_button}>
                <img className={styles.header_logo} src={heart} alt="like" />
            </button>
            <button className={styles.header_button}>
                <img className={styles.header_logo} src={briefcase} alt="like" />
            </button>
            <Link to='/signin'>
                    <button className={styles.header_button}>
                        <img className={styles.header_logo} src={user} alt="user" />
                    </button>
            </Link>
            <Link onClick={signOutHandler}>
                <button className={styles.header_button}>
                        <img className={styles.logout_logo} src={logout} alt="logout" />
                    </button>
            </Link>
           </div>

        </div>
    )
}