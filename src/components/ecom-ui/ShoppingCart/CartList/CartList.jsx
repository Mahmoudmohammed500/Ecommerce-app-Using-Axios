import { memo } from "react";
import CartItem from "../CartItem/CartItem";

const CartList = ({
  products,
  cartItemsID,
  changeQuantityHandler,
  removeProductHandler,
}) => {
  const shoppingCartList = Object.keys(cartItemsID).map((id) => {
    const productsClone = products.find((el) => el.id === id);
    if (productsClone) {
      return(
        <CartItem
          key={productsClone.id}
          data={productsClone}
          changeQuantityHandler={changeQuantityHandler}
          removeProductHandler={removeProductHandler}
        />
      );
    }
    return null;
  });

  return <div>{shoppingCartList}</div>
};

export default memo(CartList);
