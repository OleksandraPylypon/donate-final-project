import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateInputValue } from '../../redux/actionsCreators/inputValueActionsCreators';
import Context from "../Context";
import { IconSearch } from './icons/search/IconSearch';
import Button from "../button/Button";
import styles from './Header.module.scss';

function SearchInHeader() {
    const [isLinkVisible, setIsLinkVisible] = useState(true);
    const inputValueFromRedux = useSelector((state) => state.inputValue.inputValue);
    const [inputValue, setInputValue] = useState(inputValueFromRedux);
    const context = useContext(Context);

    const handleClick = () => {
        setIsLinkVisible(false);
        context.setIsLinkVisible(false);
    };
    const dispatch = useDispatch();

    const handleInputDoubleClick = (event) => {
        event.preventDefault()
        setIsLinkVisible(true);
        setInputValue('')
        context.setIsLinkVisible(true);
    };

    const crossStyle = {
        height: "18px",
    }


    useEffect(() => {
        setInputValue(inputValueFromRedux);
    }, [inputValueFromRedux]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        dispatch(updateInputValue(value));
        setInputValue(value);
    };
      
    // const handleButtonSubmit = () => {
    //     console.log('Значення інпуту:', inputValue);
    // };

    return (
        <div className={styles.hiddenSearchMenu}>
            {isLinkVisible ? (
                <a href="#1" onClick={handleClick}>
                    <div className={styles.iconSearch}>
                        <IconSearch />
                    </div>
                </a>
            ) : (
                <div className={styles.searching}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Пошук..."
                        onDoubleClick={handleInputDoubleClick}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <div className={styles.searchButtons}>
                        <Button
                            toPage="/products-search"
                            type="submit"
                            name="find"
                            className={styles.searchBtn}
                            text="Знайти"
                            width="80px"
                            // onClick={handleButtonSubmit}
                        />
                        <Button
                            onClick={handleInputDoubleClick}
                            className={`${styles.searchBtn} ${styles.closeSearchBtn}`}
                            width="60px"
                            jc="center"
                            ala="center"
                            padding="20px">
                            <span style={crossStyle}>
                                &#x2715;
                            </span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchInHeader;
