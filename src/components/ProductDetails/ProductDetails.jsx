import { useAuthRedirect } from "../HOC/useAuthRedirect"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { dogFoodApi } from "../Api/Api/DogFoodApi"
import { Loader } from "../Loader/Loader"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {
  addFavorite,
  removeFavorite,
  getFavoritesSelector,
} from "../redux/slices/favoritesSlice"
import {
  addProduct,
  getCartSelector,
  removeProduct,
} from "../redux/slices/cartSlice"

import styles from "./ProductDetails.module.css"
import { useState } from "react"
import { getUserSelector } from "../redux/slices/userSlice"
import { openEditProductPopup } from "../redux/slices/mutateProductSlice"

export const ProductDetails = (props) => {
  useAuthRedirect()

  const dispatch = useDispatch()
  const favorites = useSelector(getFavoritesSelector)
  const user = useSelector(getUserSelector)
  const cart = useSelector(getCartSelector)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { id: productId } = useParams()
  const [comment, setComment] = useState("")

  const {
    // data: addCommentData,
    // error: addCommentError,
    mutate: addCommentMutation,
    isLoading: addCommentIsLoading,
    // isError: addCommentIsError,
  } = useMutation({
    mutationFn: () => dogFoodApi.addComment({ productId, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productfetch"] })
    },
  })

  const deleteProduct = useMutation({
    mutationFn: () => dogFoodApi.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productfetch"] })
      queryClient.invalidateQueries({ queryKey: ["productsfetch"] })
      dispatch(removeFavorite(productId))
      dispatch(removeProduct(productId))
      navigate("/products")
    },
  })

  const deleteComment = useMutation({
    mutationFn: (reviewId) => dogFoodApi.deleteComment({ productId, reviewId }), //анонимная функция
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productfetch"] })
      queryClient.invalidateQueries({ queryKey: ["productsfetch"] })
    },
  })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["productfetch", productId],
    queryFn: () => dogFoodApi.getProductsByIds([productId]),
    enabled: !deleteProduct.isLoading,
  })

  if (isError || deleteProduct.isError) {
    return <p>Error: {error.message}</p>
  }

  if (isLoading || deleteProduct.isLoading) return <Loader />

  const [productRaw] = data

  const product = {
    ...productRaw,
    inCart: cart.some((i) => i._id === productRaw._id),
    isFavorite: favorites.some((f) => f._id === productRaw._id),
    isMine: productRaw.author._id === user.id,
    reviews: productRaw.reviews.map((r) => ({
      ...r,
      isMine: r.author === user.id,
    })),
  }

  function handleFavorite() {
    if (product.isFavorite) dispatch(removeFavorite(productId))
    else dispatch(addFavorite(productId))
  }

  const addProductToCard = () => {
    dispatch(addProduct(product._id))
  }

  const handleCardDelete = () => {
    deleteProduct.mutate()
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    addCommentMutation()
    setComment("")
  }

  const handleEditProduct = () => {
    dispatch(openEditProductPopup(product))
  }

  const handleCommentDelete = (reviewId) => {
    deleteComment.mutate(reviewId)
  }

  return (
    <div className={styles.container_detail}>
      <div className={styles.flex}>
        <img className={styles.picture} src={product.pictures} alt='Продукт' />
        <div>
          <p className={styles.name}>{product.name}</p>
          <p className={styles.stock}> В наличии: {product.stock} шт</p>

          <button
            className={`${styles.button_big} ${
              !product.isMine ? styles.button_disable : ""
            }`}
            onClick={handleEditProduct}
          >
            Редактировать товар
          </button>
          <button
            className={`${styles.button_big} ${
              !product.isMine ? styles.button_disable : ""
            }`}
            onClick={handleCardDelete}
          >
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
      <form name='comment' onSubmit={handleAddComment}>
        <textarea
          name='comment'
          className={`${styles.textarea} ${
            addCommentIsLoading ? styles.button_disable : ""
          }`}
          placeholder='Добавить комментарий'
          value={comment}
          onInput={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          className={`${styles.button_add} ${
            addCommentIsLoading ? styles.button_disable : ""
          }`}
          type='submit'
        >
          Добавить
        </button>
      </form>
      <ul className={styles.reviews}>
        {product.reviews.map((r) => (
          <li key={r._id}>
            {r.text}
            <button
              className={`${styles.button_small} ${
                !r.isMine ? styles.button_small_dis : ""
              }`}
              onClick={() => handleCommentDelete(r._id)}
            >
              ☠️
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
