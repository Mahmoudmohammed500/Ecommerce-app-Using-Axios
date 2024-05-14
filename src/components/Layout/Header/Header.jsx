import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { CartHeaderIcon } from '../../ecom-ui';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/use-auth';
import styles from './styles.module.css';

const Header = () => {
  const { header, headerTop, mainNav, secNav, activeLink } = styles;
  const { islogedin } = useSelector((state) => state.auth);
  const { logout } = useAuth();

  return (
    <header className={header}>
      <div className={headerTop}>
        <h1>
          Our <Badge bg="info">Ecom</Badge>
        </h1>
        <CartHeaderIcon />
      </div>
      <nav>
        <ul className={mainNav}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeLink : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) => (isActive ? activeLink : undefined)}
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new-collections"
              className={({ isActive }) => (isActive ? activeLink : undefined)}
            >
              New Collections
            </NavLink>
          </li>
        </ul>
        <ul>
          {!islogedin ? (
            <div className={secNav}>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </div>
          ) : (
            <div className={secNav}>
              <li>
                <NavLink onClick={() => logout()}>Log out</NavLink>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;