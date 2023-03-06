import { useDispatch } from "react-redux"
import styles from "../Cart.module.css"
import {
  incrementCount,
  decrementCount,
  removeProduct,
  checkProduct,
  uncheckProduct,
} from "../../redux/slices/cartSlice"

function Counter({ id, current, max }) {
  const dispatch = useDispatch()

  return (
    <div className={styles.counter_container}>
      <div
        className={`${styles.counter_button} ${
          current <= 1 ? styles.counter_button_disabled : ""
        }`}
        onClick={() => dispatch(decrementCount(id))}
      >
        -
      </div>
      <div className={styles.counter_value}>{current}</div>
      <div
        className={`${styles.counter_button} ${
          current >= max ? styles.counter_button_disabled : ""
        }`}
        onClick={() => dispatch(incrementCount(id))}
      >
        +
      </div>
    </div>
  )
}

function Price({ product }) {
  return (
    <div className={styles.item_price}>
      {product.priceWithDicsount}₽{" "}
      {!!product.discount &&
        `(${product.price} ${product.discount > 0 ? "-" : "+"} ${
          product.discount
        } %)`}{" "}
      x {product.count} = {product.priceFinal}₽
    </div>
  )
}

export function CartItem({ product }) {
  const dispatch = useDispatch()

  const changeIsChecked = () => {
    if (!product.isChecked) dispatch(checkProduct(product._id))
    else dispatch(uncheckProduct(product._id))
  }

  return (
    <li>
      <div className={styles.item_container}>
        <div className={styles.item_checkbox}>
          <input
            type='checkbox'
            checked={product.isChecked}
            onChange={changeIsChecked}
          ></input>
        </div>
        <div className={styles.item_image}>
          <img className={""} src={product.pictures} alt='Продукт' />
        </div>
        <div className={styles.item_descr}>{product.name}</div>
        <div className={styles.item_counter}>
          <Counter
            id={product._id}
            current={product.count}
            max={product.stock}
          />
        </div>
        <Price product={product} />
        <div
          className={styles.item_remove}
          onClick={() => dispatch(removeProduct(product._id))}
        >
          🗑️
        </div>
      </div>
    </li>
  )
}
