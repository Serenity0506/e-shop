import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { changeSearchFilter } from "../redux/slices/filterSlice";
import {stylesSearch} from './stylesSearch'


export function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
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
      <input
        onInput={changeSearchHandler}
        value={searchValue}
        placeholder="Искать продукты"
        type="text"
        className={stylesSearch.input}
      />
    );
  }
  