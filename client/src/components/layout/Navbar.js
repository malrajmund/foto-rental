import React, { useState } from 'react';
import search_img from '../../img/icons/baseline_search_black_18dp.png';
import cart_img from '../../img/icons/baseline_shopping_cart_black_18dp.png';
import logo_img from '../../img/icons/logo.png';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
    <div>
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand href="/">
          <img alt="logo"  width="30" height="30"  src={logo_img}/>{' '}
          FotoRental</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto"navbar>
            <NavItem>
              <NavLink href="/login">Logowanie</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register">Rejestracja</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/">
                    <img src={search_img} width="25" height="25" alt="search"/>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/">
                    <img src={cart_img} width="25" height="25" alt="cart"/>
                </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    )
}

export default NavBar
