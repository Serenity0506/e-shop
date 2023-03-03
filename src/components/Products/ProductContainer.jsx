import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addProduct } from "../redux/slices/cartSlice"
import styles from "./ProductContainer.module.css"

function ProductContainer({ product }) {
  const dispatch = useDispatch()

  const addProductToCard = () => {
    dispatch(addProduct(product.id))
  }

  return (
    <div className={styles.container}>
      <Link to={`/products/${product.id}`}>
        <img className={styles.picture} src={product.pictures} alt='Продукт' />
      </Link>
      <p className={styles.price}> {product.price}&nbsp;&#8381; </p>
      <p className={styles.wight}>{product.wight}</p>
      <p>{product.name}</p>

      <button
        className={`${styles.button} ${
          product.inCart ? styles.button_in_cart : ""
        }`}
        type='button'
        onClick={addProductToCard}
      >
        В корзину
      </button>
    </div>
  )
}

// export fu
// const token = useSelector(getTokenSelector);
// const search = useSelector(getSearchSelector);

// const { data: products, isLoading} = useQuery({
//   queryKey: [, search],
//   queryFn: () => dogFoodApi.getAllProducts(search, token),
//   enabled: !!token,
// })

export default ProductContainer
