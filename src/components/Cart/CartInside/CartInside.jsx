import styles from './CartInside.module.css'
// import {clearCart} from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



export const CartInside = (cart, clearCart) => {
    const dispatch = useDispatch()

    const clearCardHandler = () => {
        dispatch(clearCart)
    }

    const AllPick = () => {

    }

    function hadlerAllPick() {

    } 

    const empty = () => {
        <section className={styles.empty}>
          <h3>Товаров пока нет</h3>
        <div className={styles.link}>
          <Link to="/products"><button type="button" className={styles.button}>На поиски товаров</button></Link>
        </div>
      </section>
    }

    const full = () => {
     <div className={styles.container}>
        <div className={styles.product}>
          <div className={styles.first}>
            <span><input
                id="select_all"
                type="checkbox"
                checked={AllPick()}
                onChange={hadlerAllPick}
              />
              <span />
              <label htmlFor="select_all">Выбрать все</label>
            </span>
            <button type="button" className={styles.button} onClick={clearCardHandler}>
              Очистить
            </button>
          </div>

          <ul className={styles.cartElement} />      
      </div>
  </div>
  }

    return (
        <div className={styles.cart}>
            {!cart.length ? empty() : full()}
        </div>
    )
}