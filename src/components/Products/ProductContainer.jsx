import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addProduct } from "../redux/slices/cartSlice"
import { addFavorite, removeFavorite } from "../redux/slices/favoritesSlice"
import styles from "./ProductContainer.module.css"

function ProductContainer({ product }) {
  const dispatch = useDispatch()

  const addProductToCard = () => {
    dispatch(addProduct(product._id))
  }

  function handleFavorite() {
    if (product.isFavorite) dispatch(removeFavorite(product._id))
    else dispatch(addFavorite(product._id))
  }

  const ProductDiscountPrice = () => {
    if (!!product.discount)
      return (
        <>
          <p className={`${styles.price} ${styles.price_discount}`}>
            {product.price}&nbsp;&#8381;
          </p>
          <p className={styles.wight}>
            {product.discount > 0 ? "Скидка" : "Накидка"}:{" "}
            {Math.abs(product.discount)}&nbsp;%
          </p>
        </>
      )
  }

  return (
    <div className={styles.container}>
      <span
        title={product.likes_cnt}
        className={styles.like}
        onClick={handleFavorite}
      >
        {product.isFavorite ? "💜" : "💔"}
      </span>
      <Link to={`/products/${product._id}`}>
        <img className={styles.picture} src={product.pictures} alt='Продукт' />
      </Link>
      <p className={styles.price}> {product.priceWithDicsount}&nbsp;&#8381; </p>
      <ProductDiscountPrice />
      <p className={styles.wight}>Вес: {product.wight || "не указан"}</p>
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
