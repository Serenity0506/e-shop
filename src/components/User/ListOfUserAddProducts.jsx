import { useSelector } from "react-redux"
import { getUserSelector } from "../redux/slices/userSlice"
import { useProducts } from "../../hooks/useProducts"
import { Loader } from "../Loader/Loader"
import { GridOfProducts } from "../GridOfProducts/GridOfProducts"

export const ListOfUserAddProducts = () => {
  const user = useSelector(getUserSelector)

  const { data, isLoading, isError, error } = useProducts({ isEnabled: true })

  if (isLoading) return <Loader />

  if (isError) return <p>{error}</p>

  const myProducts = data.filter((p) => p.author._id === user.id)

  return (
    <>
      {myProducts.length === 0 && <p>Продуктов нет :(</p>}
      <GridOfProducts products={myProducts} />
    </>
  )
}