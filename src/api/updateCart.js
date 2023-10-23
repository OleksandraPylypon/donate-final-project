import axios from "axios";
import store from "../redux/store";
import { setAuthToken } from "../redux/actions/authActions";
import { NEW_CART_URL } from "../endpoints/endpoints";



const selectCartForApi = (state) => state.cart.items.map((item) => ({
  product: item.id,
  cartQuantity: item.quantity,
}));

export default function updateCart() {
  const { token } = store.getState().auth;
  store.dispatch(setAuthToken(token));

  const state = store.getState();

  const newCart = {
    products: selectCartForApi(state),
  };

  axios
    .put(NEW_CART_URL, newCart)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
