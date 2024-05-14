import React, { useEffect, useState } from "react";
import Login from "./Login";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import $ from 'jquery';

const { animatedtext } = styles;

const NewCollections = () => {
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

  return (
    <div>
      {islogedin ? (
        <div className="text-center text-info">
          <h1>There are no new collections now.</h1>
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

export default NewCollections;
