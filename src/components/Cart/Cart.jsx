import { getCartSelector } from '../redux/slices/cartSlice';
import { getTokenSelector } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getQueryCartKey } from '../utils/utils';
import { dogFoodApi } from '../Api/Api/DogFoodApi';
import { Loader } from '../Loader/Loader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from './CartItem/Cartitem';

export function Cart() {
    const navigate = useNavigate()
    const token = useSelector(getTokenSelector);
    const cart = useSelector(getCartSelector);

    useEffect(() => {
      if (!token) {
        navigate("/signin");
      }
      // eslint-disable-next-line 
    }, [token])

    const productIds = cart.map((product) => product.id)

    const {
      data, isLoading, isError, error, refetch
    } = useQuery({
      queryKey: [getQueryCartKey(productIds)],
      queryFn: () => dogFoodApi.getProductsByIds(productIds),
      enabled: !!(token),
      keepPreviousData: true
    });
  
    if (isError) {
      return (
        <p>Error: {error.message}</p>
      )
    }
  
    if (isLoading) return <Loader />

    if (!data?.length) {
      return (
        <span>Корзина пуста</span>
      )
    }

    const preparedData = cart.map(p => ({
      ...p,
      ...data.find(i => i._id === p.id)
    }))

    return (
      <ul>
        {preparedData.map(p => (
          <CartItem
            key={p._id}
            product={p}
          />
        ))}
      </ul>
    );
  }