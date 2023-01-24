import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContextProvider";
import { dogFoodApi } from "../Api/Api/DogFoodApi";
import ProductContainer from "./ProductContainer";

import ProductsStyles from './Products.module.css';


export const Products = () => {
  const { token } = useContext(AppContext)
  const navigate = useNavigate()
  console.log( { token }  )

    useEffect(() => {
      if (!token) {
      navigate('/signin')
      }
  }, [token]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["productsfetch"],
    queryFn: () => dogFoodApi.getAllProducts(),
    enabled: (token !== undefined) && (token !== ''),
  })  


  if (isError)
  return (
    <div className={ProductsStyles.products}>
      <h1>Product Page</h1>
      <p>
        Произошла ошибка:&nbps;
        {error}
      </p>
    </div>
  )

    return (
      <div className={ProductsStyles.products}>
        <h1 className={ProductsStyles.header}>Все товары</h1>
        <div className={ProductsStyles.container}>
          {data.products.map((product) => (
            <ProductContainer
              key={data.id}
              product={product}
            />
          ))}
        </div>
      </div>
    )
}

export default Products




//   const [product, setProduct] = useState([]);ProductCard
//   const addNewProduct = (title) => {
//     const newProduct = {
//       id: crypto.randomUUID(),
//       title: title
//     }

//     setProduct((prev) => [newProduct, ...prev])
//   }

//     return <h1 className='main'>Каталог</h1>
// }
