import ProductContainerStyles from './ProductContainer.module.css';

function ProductContainer({ product }) {
  if (product) {
    const addProductToCard = () => {
      console.log('Продукт добавили')
    }

    return (
      <div className={ProductContainerStyles.container}>
        <div className={ProductContainerStyles.picture}>
          <img src={product.pictures} alt='Товар' />
        </div>
        <p> {product.price} &nbsp;&#8381; </p>
        <p>{product.wight}</p>
        <p>{product.name}</p>
      
        <button
          className={ProductContainerStyles.button}
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