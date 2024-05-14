import styles from "./styles.module.css";

const CartTotalPrice = ({ totalPrice }) => {
  const { total } = styles;
  return (
    <div className={total}>
      <span>TotalPrice</span>
      <span className="mb-5">${totalPrice ? totalPrice : null}</span>
    </div>
  );
};

export default CartTotalPrice;
