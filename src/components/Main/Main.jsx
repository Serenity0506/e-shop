import backImg from './img/dog.jpg';
import styles from './Main.module.css';

export const Main = () => {
  return (
        <div className={styles.main}>
            {/* <Products />x */}
            <p>Welcome to our shop...</p>
            <img className={styles.backImg} src={backImg} alt='dogs' />

        </div>
  )
}
