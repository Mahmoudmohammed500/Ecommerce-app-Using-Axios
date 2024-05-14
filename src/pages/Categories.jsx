import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actGetCategories } from "../store/category/categorySlice";
import { Category } from "../components/ecom-ui";
import { GridList } from "../components/Layout";
import Login from "./Login";
import styles from "./styles.module.css";
import $ from 'jquery';

const { animatedtext } = styles;

const Categories = () => {
  const dispatch = useDispatch();
  const { loading, error, records } = useSelector((state) => state.categories);
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
    const promise = dispatch(actGetCategories());
    return () => promise.abort();
  }, [dispatch]);

  return (
    <div>
      {islogedin ? (
        <div>
          <GridList
            records={records}
            loading={loading}
            error={error}
            lottieAnimation="fixing"
          >
            <Category />
          </GridList>
        </div>
      ) : (
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

export default Categories;
