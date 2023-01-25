import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContextProvider";
import { dogFoodApi } from "../Api/Api/DogFoodApi";
import { Loader } from "../Loader/Loader";
import ProductContainer from "./ProductContainer";

import styles from './Products.module.css';


export const Products = ({items}) => {
  const { token } = useAppContext()
  const navigate = useNavigate()
  console.log( { token }  )

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
    // eslint-disable-next-line 
  }, [token])

    const {data, isLoading, isError, error } = useQuery({

    queryKey: ["productsfetch"],
    queryFn: () => dogFoodApi.getAllProducts(),
    enabled: (token !== undefined) && (token !== ''),
  })  

  console.log(items)

  if (isError) {
    return (
      <p>Error: {error.message}</p>
    )
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.products}>
      {data.products.map(({ _id: id, ...restProduct }) => (
        <ProductContainer
          key={id}
          id={id}
          product={restProduct}
        />
      ))}
    </div>
  )
}


export default Products


{/* <div className={ProductsStyles.errorMessage}>
<p>{error.message}</p>
<button onClick={refetch} type="button">
  Повторить запрос
</button>
</div> */}


        // // if (!items.products.length) return <p>Ошибка</p>

