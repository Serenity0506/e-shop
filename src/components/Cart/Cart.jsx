import { getCartSelector } from '../redux/slices/cartSlice';
import { getTokenSelector } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { CartInside } from './CartInside/CartInside';
import { getQueryCartKey } from '../utils/utils';
import { dogFoodApi } from '../Api/Api/DogFoodApi';




export function Cart() {
    const token = useSelector(getTokenSelector);
    const cart = useSelector(getCartSelector);


    const {
      data, isLoading, isError, error, refetch
    } = useQuery({
      queryKey: [getQueryCartKey(cart.length)],
      queryFn: () => dogFoodApi.getProductsByIds(cart.map((product) => product.id), token),
      enabled: !!(token),

    });
  

    return (
      <CartInside
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    );
  }