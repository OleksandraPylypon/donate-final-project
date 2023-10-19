import { Link } from 'react-router-dom';
import logo from '../../images/header/Logo.png';
import Cart from "./icons/cart/IconCart";
import IconEnter from "./icons/enter/IconEnter";
import Button from "../button/Button";
import Navigation from './Navigation';
import { IconSearchMobile } from './icons/search/IconSearch';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import HeartFavorite from "./icons/favorites/Heart";

function Header() {
    const cartCount = useSelector((state) => state.cart.itemCount);
    const favoriteCount = useSelector((state) => state.favorites.itemCount);
    const cartCountFromLS = JSON.parse(localStorage.getItem("CountCartProducts")) || 0;
    const favoritesCountFromLS = JSON.parse(localStorage.getItem("CountFavoritesProducts")) || 0;

    
    return (
        <header className={styles.header}>
            <div className={styles.mobileHeader}>
                <input
                    className={styles.inputMobileHeader}
                    type="text"
                    placeholder="Знайти..."
                />
                <button className={styles.buttonMobileHeader}>
                    <IconSearchMobile />
                </button>
            </div>
            <div className={styles.headerLaptop}>
                <Link to="/" className={styles.logo}><img src={logo} alt="alt" width={70} height={70} /></Link>

                <Navigation />

                <Link to="/favorites">
                    <HeartFavorite />
                </Link>
                {favoritesCountFromLS && favoriteCount === 0 ? null :
                // <span >{favoriteCount}</span>}
                <span >{favoritesCountFromLS}</span>}
                
                <div className={styles.navRightSideMenu}>
                    <Link to="/cart">
                        <Cart />
                    </Link>
                    {cartCountFromLS && cartCount === 0 ? null :
                    // <span >{cartCount}</span>}
                    <span >{cartCountFromLS}</span>}

                    <Button toPage="/log-in" width="56px">
                        <IconEnter/>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header
