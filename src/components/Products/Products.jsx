import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import { useProducts } from '../../hooks/useProducts'
import { useProductsSearchParams } from '../../hooks/useProductsSearchParams'
import { GridOfProducts } from '../GridOfProducts/GridOfProducts'
import { Loader } from '../Loader/Loader'
import { getTokenSelector } from '../redux/slices/userSlice'
import { useAuthRedirect } from '../HOC/useAuthRedirect'

import styles from './Products.module.css'

export const Products = () => {
  useAuthRedirect()

  const [searchParams, setSearchParams] = useProductsSearchParams()
  const token = useSelector(getTokenSelector)

  const { data, isLoading, isError, error } = useProducts({
    isEnabled: !!token,
  })

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (isLoading) return <Loader />

  const handleSortChange = (e) => {
    const [sort, order] = e.target.value.split('|')

    setSearchParams({
      ...searchParams,
      sort,
      order: order || '',
    })
  }

  const sortResult = searchParams.order === 'desc' ? -1 : 1

  const filteredProducts = data
    .filter((i) => i.name.toLowerCase().includes(searchParams.search.toLowerCase()))
    .map((p) => ({ ...p, likes_cnt: p.likes.length }))
    .sort((a, b) => a[searchParams.sort] > b[searchParams.sort] ? sortResult : -sortResult)

  return (
    <>
      <div className={styles.sort}>
        <p>Сортировка:</p>
        <Formik
          initialValues={{
            sort: '',
          }}
        >
          <Form>
            <Field
              className={styles.field}
              name='sort'
              as='select'
              onChange={handleSortChange}
              value={`${searchParams.sort}${searchParams.order ? '|' + searchParams.order : ''
                }`}
            >
              <option value=''>По умолчанию</option>
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
