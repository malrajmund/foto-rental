import React, { useState } from "react";
import search_img from "../../img/icons/baseline_search_black_18dp.png";
import cart_img from "../../img/icons/baseline_shopping_cart_black_18dp.png";
import account_img from "../../img/icons/baseline_account_circle_black_18dp.png";
import logo_img from "../../img/icons/logo.png";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge, } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const NavBar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  
  const authLinks = (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav>
        <img src={account_img} width='25' height='25' alt='account' />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem header>Witaj {user?.firstName}!</DropdownItem>
        <DropdownItem>
          <NavLink href={`/dashboard`}>Moje konto</NavLink>
        </DropdownItem>
        <DropdownItem>
          <NavLink href='/chat'>Moje wiadomości</NavLink>
        </DropdownItem>
        <DropdownItem>
          <NavLink href='/OfferForm'>Wystaw ofertę</NavLink>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <NavLink onClick={logout}>Wyloguj się</NavLink>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const guestLinks = (
    <>
      <NavItem>
        <NavLink href='/login'>Logowanie</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/register'>Rejestracja</NavLink>
      </NavItem>
    </>
  );

  const [isOpen, setIsOpen] = useState(false);
  const getCart = () => JSON.parse(window.localStorage.getItem("cart"))?.length;
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color='light' light expand='md' fixed='top'>
      <NavbarBrand href='/'>
        <img alt='logo' width='30' height='30' src={logo_img} /> FotoRental
        </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='ml-auto' navbar>
          {!loading && isAuthenticated ? authLinks : guestLinks}
          <NavItem>
            <NavLink href='/search/results'>
              <img src={search_img} width='25' height='25' alt='search' />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`/basket/${user?._id}`}>
              <img src={cart_img} width='25' height='25' alt='cart' />
              {getCart() ? <Badge color='warning'>{getCart()}</Badge> : null}
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(NavBar);
