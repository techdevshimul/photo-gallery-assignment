import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, NavItem, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { categoriesUrl, formsUrl, itemsUrl, loginUrl, logoutUrl } from '../../Redux/dataBase';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId
    }
}
const Header = props => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navToggle = () => {
        setIsNavOpen(!isNavOpen);
    }

    let links = null;
    let userIdMatched = null;
    let verifiedUser = "rADcW9tPZGTTnsfkOFH9PSxu3rs1";

    if (verifiedUser === props.userId) {
        userIdMatched = (
            <NavItem>
                <Link to={formsUrl} className="nav-link">Forms</Link>
            </NavItem>
        )
    }

    if (props.token === null) {
        links = (<Nav className="me-auto" navbar>
            <NavItem>
                <Link to="/" className="nav-link" >Home</Link>
            </NavItem>
            <NavItem>
                <Link to={itemsUrl} className="nav-link" >Photos</Link>
            </NavItem>
            <NavItem>
                <Link to={categoriesUrl} className="nav-link" >Categories</Link>
            </NavItem>
            <NavItem>
                <Link to={loginUrl} className="nav-link" >Login</Link>
            </NavItem>
        </Nav>)
    } else {
        links = (
            <Nav className="me-auto" navbar>
                <NavItem>
                    <Link to="/" className="nav-link" onClick={navToggle}>Home</Link>
                </NavItem>
                <NavItem>
                    <Link to={itemsUrl} className="nav-link">Photos</Link>
                </NavItem>
                {userIdMatched}
                <NavItem>
                    <Link to={categoriesUrl} className="nav-link">Categories</Link>
                </NavItem>
                <NavItem>
                    <Link to={logoutUrl} className="nav-link">Logout</Link>
                </NavItem>
            </Nav>)
    }

    return (
        <div>
            <Navbar color="light" expand="sm" style={{ textAlign: "center" }}>
                <NavbarToggler onClick={navToggle} />
                <NavbarBrand href="/">
                    Photo Gallery App
                </NavbarBrand>

                <Collapse isOpen={isNavOpen} navbar>
                    {links}
                </Collapse>
            </Navbar>
        </div>
    )
}

export default connect(mapStateToProps)(Header);