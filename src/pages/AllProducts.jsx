import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cart/cartSlice";
import { actGetProducts } from "../store/product/productSlice";
import { Product } from "../components/ecom-ui";
import { GridList } from "../components/Layout";
import Login from "./Login";
import styles from "./styles.module.css";
import $ from 'jquery';

const { animatedtext , index } = styles;
const AllProducts = () => {
    const dispatch = useDispatch();
    const { loading, error, records } = useSelector((state) => state.products);
    const { islogedin } = useSelector((state) => state.auth);

    const [toggle, setToggle] = useState(false);

    useEffect(() => {
      // Function to toggle the animation
      const toggleAnimation = () => {
        if (toggle) {
          $('.animated-text').css('opacity', '0');
        } else {
          $('.animated-text').css('opacity', '1');
        }
        setToggle(!toggle);
      };
  
      // Toggle the animation after 1 second
      setTimeout(toggleAnimation, 500);
    }, [toggle]);
  

    useEffect(() => {
        const promise = dispatch(actGetProducts());
        return () => promise.abort();
    }, [dispatch]);

    const selectedProduct = (data) => {
        const { id, max } = data;
        dispatch(addToCart({ id, max }));
    };

    return (
        <div>
            {
                islogedin ? (
                    <GridList 
                        error={error}
                        loading={loading}
                        records={records}
                        selectedProduct={selectedProduct}
                        lottieAnimation="notFound"
                    >
                        <Product />
                    </GridList>
                ) :
                    (
                        <div>
                            <div className="invalid-feedback d-block text-center mt-4">
                                <h3>You are not logged in <span className="animatedtext animated-text">!</span> , please log in to access this content.</h3>
                            </div>
                            <Login />
                        </div>
                    )
            }
        </div>
    );
};

export default AllProducts;
