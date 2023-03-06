import { useSelector } from "react-redux"
import ProductContainer from "../Products/ProductContainer"
import { getCartSelector } from "../redux/slices/cartSlice"
import { getFavoritesSelector } from "../redux/slices/favoritesSlice"
import { getUserSelector } from "../redux/slices/userSlice"
import styles from "./GridOfProducts.module.css"

export const GridOfProducts = ({ products }) => {
  const cart = useSelector(getCartSelector)
  const favorites = useSelector(getFavoritesSelector)
  const user = useSelector(getUserSelector)

  const productsPlus = products
    .filter((p) => !p.err)
    .map((p) => ({
      ...p,
      inCart: cart.some((i) => i._id === p._id),
      isFavorite: favorites.some((f) => f._id === p._id),
      priceWithDicsount: p.price - (p.discount / 100) * p.price,
      discount: p.discount,
      isMine: p.author._id === user.id,
      likes_cnt: p.likes.length,
    }))

  return (
    <>
      <div className={styles.products}>
        {productsPlus.map((product) => (
          <ProductContainer key={product._id} product={product} />
        ))}
      </div>
    </>
  )
}
