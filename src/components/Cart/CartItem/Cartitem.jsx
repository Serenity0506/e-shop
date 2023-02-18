import { useDispatch } from 'react-redux'
import styles from '../Cart.module.css'
import { incrementCount, decrementCount, removeProduct } from '../../redux/slices/cartSlice'

function Counter({id, current, max}) {
    const dispatch = useDispatch()

    return (
        <div className={styles.counter_container}>
            <div 
                className={`${styles.counter_button} ${current <= 1 ? styles.counter_button_disabled : ''}`} 
                onClick={() => dispatch(decrementCount(id))}
            >-</div>
            <div className={styles.counter_value}>{current}</div>
            <div 
                className={`${styles.counter_button} ${current >= max ? styles.counter_button_disabled : ''}`} 
                onClick={() => dispatch(incrementCount(id))}
            >+</div>
        </div>
    )
}

function Price({product}) {
    const priceWithDicsount = (product.price - product.discount) / 100
    const discount = product.discount / 100
    const priceFinal = product.count * priceWithDicsount
    return (
        <div className={styles.item_price}>
            {priceWithDicsount}₽ {discount > 0 && (`(-${discount}₽)`)} x {product.count} = {priceFinal}₽
        </div>
    )
}

export function CartItem({ product }) {
    const dispatch = useDispatch()
    
    return (
        <li>
            <div className={styles.item_container}>
                <div className={styles.item_checkbox}>
                    <input type="checkbox"></input>
                </div>
                <div className={styles.item_image}>
                    <img className={''} src={product.pictures} alt='Продукт' />
                </div>
                <div className={styles.item_descr}>{product.name}</div>
                <div className={styles.item_counter}>
                    <Counter
                        id={product._id}
                        current={product.count}
                        max={product.stock}
                    />
                </div>
                <Price product={product}/>
                <div 
                    className={styles.item_remove}
                    onClick={() => dispatch(removeProduct(product._id))}
                >🗑️</div>
            </div>
        </li>
    )
}