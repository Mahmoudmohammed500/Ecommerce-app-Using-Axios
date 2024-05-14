import useGetProductsByItems from "../../../../hooks/use-get-products-by-items";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import { Loading, LottieAnimation } from "../../../Layout";
import styles from "./styles.module.css";

const { container, button, cartList, cartListWithScroll, cartItem } = styles;

const CartDrop = ({ close }) => {
  const navigate = useNavigate();

  const {
    loading,
    error,
    products,
    cartItemsID,
    cartRemoveRecord,
  } = useGetProductsByItems();

  const cartListScrollStatus = !products.length
    ? cartList
    : `${cartList} ${cartListWithScroll}`;

  const navigateHandler = () => {
    close();
    navigate("shopping-cart");
  };

  const itemsList = Object.keys(cartItemsID).map((id) => {
    const product = products.find((el) => el.id === id);
    const quantity = cartItemsID[id];

    if (product) {
      return (
        <div className={cartItem} key={product.id}>
          <img src={product.img} alt={product.title} />
          <h2>{product.title}</h2>
          <h3>
            {product.price} EGP X {quantity}
          </h3>
          <Button variant="info" onClick={() => cartRemoveRecord(product.id)}>
            Remove
          </Button>
        </div>
      );
    }
    return null;
  });

  return (
    <div className={container} id="cartDrop">
      <Loading loading={loading} error={error}>
        <div className={cartListScrollStatus}>{itemsList}</div>
      </Loading>
      <Button className={button} variant="dark" onClick={navigateHandler}>
        Go to checkout
      </Button>
    </div>
  );
};

export default CartDrop;