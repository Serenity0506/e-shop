import { Field, Form, Formik } from "formik"
import { useSelector } from "react-redux"
import { useProducts } from "../../hooks/useProducts"
import { useProductsSearchParams } from "../../hooks/useProductsSearchParams"
import { GridOfProducts } from "../GridOfProducts/GridOfProducts"
import { Loader } from "../Loader/Loader"
import { getSearchSelector } from "../redux/slices/filterSlice"
import { getTokenSelector } from "../redux/slices/userSlice"
import { useAuthRedirect } from "../HOC/useAuthRedirect"

import styles from "./Products.module.css"

export const Products = () => {
  const searchFilter = useSelector(getSearchSelector)
  const [sort, setSort] = useProductsSearchParams()
  const token = useSelector(getTokenSelector)

  useAuthRedirect()

  const { data, isLoading, isError, error } = useProducts({
    isEnabled: !!token,
  })

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (isLoading) return <Loader />

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split("|")

    setSort({
      sortBy: sortBy,
      sortOrder: sortOrder || "",
    })
  }

  const filteredProducts = data
    .filter((i) => i.name.toLowerCase().includes(searchFilter.toLowerCase()))
    .map((p) => ({ ...p, likes_cnt: p.likes.length }))
    .sort((a, b) => {
      const sortResult = sort.sortOrder === "desc" ? -1 : 1
      return a[sort.sortBy] > b[sort.sortBy] ? sortResult : -sortResult
    })

  return (
    <>
      <div className={styles.sort}>
        <p>Сортировка:</p>
        <Formik
          initialValues={{
            sort: "",
          }}
        >
          <Form>
            <Field
              className={styles.field}
              name='sort'
              as='select'
              onChange={handleSortChange}
              value={`${sort.sortBy}${
                sort.sortOrder ? "|" + sort.sortOrder : ""
              }`}
            >
              <option value='default'>По умолчанию</option>
              <option value='price|asc'>По цене (↑)</option>
              <option value='price|desc'>По цене (↓)</option>
              <option value='discount|asc'>По скидке (↑)</option>
              <option value='discount|desc'>По скидке (↓)</option>
              <option value='created_at|asc'>По дате добавления (↑)</option>
              <option value='created_at|desc'>По дате добавления (↓)</option>
              <option value='likes_cnt|asc'>По популярности (↑)</option>
              <option value='likes_cnt|desc'>По популярности (↓)</option>
            </Field>
          </Form>
        </Formik>
      </div>
      <GridOfProducts products={filteredProducts} />
    </>
  )
}

export default Products
