import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { dogFoodApi } from "../Api/Api/DogFoodApi"
import { GridOfProducts } from "../GridOfProducts/GridOfProducts"
import { Loader } from "../Loader/Loader"
import { getCartSelector } from "../redux/slices/cartSlice"
import { getFavoritesSelector } from "../redux/slices/favoritesSlice"
import styles from "./Favorites.module.css"

export const Favorites = () => {
  const favorites = useSelector(getFavoritesSelector)
  const cart = useSelector(getCartSelector)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["favoritesfetch", favorites],
    queryFn: () => dogFoodApi.getProductsByIds(favorites.map((f) => f._id)),
  })

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (isLoading) return <Loader />

  const dataWithId = data.map((p) => ({
    id: p._id,
    inCart: cart.some((cp) => cp._id === p._id),
    ...p,
  }))

  return (
    <>
      {dataWithId.length ? (
        <GridOfProducts products={dataWithId} />
      ) : (
        <p>Любимых продуктов нет :(</p>
      )}
    </>
  )
}

//объявляем переменную favorites из редакса
//вызываем с сервера метод апи, в который передаем массив идентияифкаторов продуктов
//в ответ получаем массив с полными карточками этих продуктов
//записываем его в дата
//проходимся мэп по дата, возвращаем массив хтмл разметки
