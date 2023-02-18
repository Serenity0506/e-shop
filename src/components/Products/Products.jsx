import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dogFoodApi } from "../Api/Api/DogFoodApi";
import { Loader } from "../Loader/Loader";
import { getCartSelector } from "../redux/slices/cartSlice";
import { getSearchSelector } from "../redux/slices/filterSlice";
import { getTokenSelector } from "../redux/slices/userSlice";
import ProductContainer from "./ProductContainer";

import styles from './Products.module.css';


export const Products = () => {
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)
  const searchFilter = useSelector(getSearchSelector)
  const cart = useSelector(getCartSelector)

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
    // eslint-disable-next-line 
  }, [token])

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["productsfetch"],
    queryFn: () => dogFoodApi.getAllProducts(),
    enabled: (token !== undefined) && (token !== ''),
  })

  if (isError) {
    return (
      <p>Error: {error.message}</p>
    )
  }

  if (isLoading) return <Loader />

  const filteredProducts =
    data.products
      .filter(i => i.name.toLowerCase().includes(searchFilter.toLowerCase()))
      .map(p => ({
        id: p._id,
        ...p,
        inCart: cart.some(i => i.id === p._id)
      }))

  return (
    <div className={styles.products}>
      {filteredProducts
        .map((product) => (
          <ProductContainer
            key={product.id}
            id={product.id}
            product={product}
          />
        ))}
    </div>
  )
}




export default Products