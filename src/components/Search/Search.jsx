import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { changeSearchFilter, getSearchSelector } from "../redux/slices/filterSlice";
import styles from './Search.module.css';
import { getTokenSelector } from "../redux/slices/userSlice";

export function Search() {
  const searchValueFromStore = useSelector(getSearchSelector)
  const [searchValue, setSearchValue] = useState(searchValueFromStore);
  const token = useSelector(getTokenSelector)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const changeSearchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const redirectToProducts = () => {
    if (location.pathname !== '/products')
      navigate("/products");
  }

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  useEffect(() => {
    setSearchValue(searchValueFromStore)
  }, [searchValueFromStore])

  return (
    token && <input
      onInput={changeSearchHandler}
      onFocus={redirectToProducts}
      value={searchValue}
      placeholder="Поиск"
      type="text"
      className={styles.search_input}
    />
  );
}
