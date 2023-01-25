import styles from './ProductContainer.module.css';

function ProductContainer({ product }) {
  if (product) {
    const addProductToCard = () => {
      console.log('Продукт добавили')
    }

    return (
      <div className={styles.container}>
          <img className={styles.picture} src={product.pictures} alt='Продукт' />
        <p className={styles.price}> {product.price}&nbsp;&#8381; </p>
        <p className={styles.wight}>{product.wight}</p>
        <p>{product.name}</p>
      
        <button
          className={styles.button}
          type="button"
          onClick={ addProductToCard }
        >
          В корзину
        </button>
      </div>
    )
  }
}

export default ProductContainer