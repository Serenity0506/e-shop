import { useAuthRedirect } from "../HOC/useAuthRedirect"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { dogFoodApi } from "../Api/Api/DogFoodApi"
import { Loader } from "../Loader/Loader"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {
  addFavorite,
  removeFavorite,
  getFavoritesSelector,
} from "../redux/slices/favoritesSlice"
import { addProduct } from "../redux/slices/cartSlice"

import styles from "./ProductDetails.module.css"

export const ProductDetails = (props) => {
  useAuthRedirect()

  const dispatch = useDispatch()
  const favorites = useSelector(getFavoritesSelector)

  const { id: productId } = useParams()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["productfetch"],
    queryFn: () => dogFoodApi.getProductsByIds([productId]),
  })

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (isLoading) return <Loader />

  const product = {
    ...data[0],
    isFavorite: favorites.some((f) => f.id === data[0]._id),
  }

  function handleFavorite() {
    if (product.isFavorite) dispatch(removeFavorite(productId))
    else dispatch(addFavorite(productId))
  }

  const addProductToCard = () => {
    dispatch(addProduct(product._id))
  }

  return (
    <div className={styles.container_detail}>
      <div className={styles.flex}>
        <img className={styles.picture} src={product.pictures} alt='Продукт' />
        <div>
          <p className={styles.name}>{product.name}</p>
          <p className={styles.stock}> В наличии: {product.stock} шт</p>

          <button
            className={styles.button_big}
            onClick={props.onEditProductPopupOpen}
          >
            Редактировать товар
          </button>
          <button className={styles.button_big} onClick={props.onCardDelete}>
            Удалить товар
          </button>
        </div>

        <div>
          <p className={styles.button} onClick={handleFavorite}>
            {product.isFavorite ? "💜" : "💔"}
          </p>
          <button
            className={`${styles.button_add} ${
              product.inCart ? styles.button_in_cart : ""
            }`}
            type='button'
            onClick={addProductToCard}
          >
            В корзину
          </button>
        </div>
      </div>
      <ul className={styles.reviews}>
        <textarea
          className={styles.textarea}
          placeholder='Добавить комментарий'
        ></textarea>
        {product.reviews.map((r) => (
          <li key={r._id}>{r.text}</li>
        ))}
      </ul>
    </div>
  )
}

// <div className={styles.container}>
// <Link to={`/products/${product.id}`}>
//   <img className={styles.picture} src={product.pictures} alt='Продукт' />
// </Link>
// <p className={styles.price}> {product.price}&nbsp;&#8381; </p>
// <p className={styles.wight}>{product.wight}</p>
// <p>{product.name}</p>

// <button
//   className={`${styles.button} ${
//     product.inCart ? styles.button_in_cart : ""
//   }`}
//   type='button'
//   onClick={addProductToCard}
// >
//   В корзину
// </button>
// </div>
