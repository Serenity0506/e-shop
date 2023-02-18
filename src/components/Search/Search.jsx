import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { changeSearchFilter } from "../redux/slices/filterSlice";
import styles from './Search.module.css';
import { getTokenSelector } from "../redux/slices/userSlice";


export function Search() {
  //при монтировании компонента попадаем сюда, в инпуте пустая строка
  const [searchValue, setSearchValue] = useState('');
  const token = useSelector(getTokenSelector)

  //отправляем пустую строку в юзДебоунс

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const searchValueStore = useSelector(getFilterSelector);
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const changeSearchHandler = (e) => {
    navigate("/products");
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  return (
    token && <input
      onInput={changeSearchHandler}
      value={searchValue}
      placeholder="Поиск"
      type="text"
      className={styles.search_input}
    />
  );
}
