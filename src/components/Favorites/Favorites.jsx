import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { dogFoodApi } from "../Api/Api/DogFoodApi"
import { Loader } from "../Loader/Loader"
import ProductContainer from "../Products/ProductContainer"
import { getFavoritesSelector } from "../redux/slices/favoritesSlice"
import styles from "./Favorites.module.css"

export const Favorites = (product) => {
  const favorites = useSelector(getFavoritesSelector)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["favoritesfetch"],
    queryFn: () => dogFoodApi.getProductsByIds(favorites.map((f) => f.id)),
  })

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (isLoading) return <Loader />

  return (
    <>
      <div className={styles.container_detail}>
        {data.map((product) => (
          <ProductContainer key={product._id} product={product} />
        ))}
      </div>
    </>
  )
}

//объявляем переменную favorites из редакса
//вызываем с сервера метод апи, в который передаем массив идентияифкаторов продуктов
//в ответ получаем массив с полными карточками этих продуктов
//записываем его в дата
//проходимся мэп по дата, возвращаем массив хтмл разметки
