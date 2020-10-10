import React from 'react'
import {Navbar} from 'reactstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';


const NavWrapper = styled.div`
    display:flex;
    background-color:#0000ff;
    justify-content:flex-end;
    a{
        text-decoration:none;
        color:white;
        font-weight:bold;
        padding:1%;
    }
`;
const NavBar = () => {
    return (
        <NavWrapper>
            <Link to ="/">Home</Link>
            <Link to ="/pizza-form">Order Here</Link>
        </NavWrapper>
    )
}

export default NavBar
