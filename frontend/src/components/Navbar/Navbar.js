import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';

import { Icon } from 'react-icons-kit'
import { man } from 'react-icons-kit/icomoon/man'
import { compass } from 'react-icons-kit/icomoon/compass'
import { pencil2 as arrival } from 'react-icons-kit/icomoon/pencil2'
import { checkmark as tally } from 'react-icons-kit/icomoon/checkmark'
import { coinDollar as invoice } from 'react-icons-kit/icomoon/coinDollar'
import { stack as receipt } from 'react-icons-kit/icomoon/stack'
import { printer } from 'react-icons-kit/icomoon/printer'
import { stack as deploy } from 'react-icons-kit/icomoon/stack'
import { ic_view_week_outline as struc } from 'react-icons-kit/md/ic_view_week_outline'
import { ic_credit_card as layout } from 'react-icons-kit/md/ic_credit_card'
import { ic_next_plan_twotone as more } from 'react-icons-kit/md/ic_next_plan_twotone'
import { ic_person as user } from 'react-icons-kit/md/ic_person'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ic_dashboard_outline as proc } from 'react-icons-kit/md/ic_dashboard_outline'
import { ic_explore_twotone as tender } from 'react-icons-kit/md/ic_explore_twotone'
import Logo from '../imgz/Logo.jpg'

import { ic_person_pin } from 'react-icons-kit/md/ic_person_pin'
import { ic_home } from 'react-icons-kit/md/ic_home'
import OtherStyles from '../Styles/OtherStyles';
import { useSignOut } from 'react-auth-kit';


export function LocalLoginLink(props) {
    return (
        <li className="nav-item">
            <Link className="nav-link  " style={{ fontSize: "13px", fontWeight: "bold", color: "#fff", marginLeft: "40px" }} to={`/${props.path} `}>
                <span style={{ textTransform: 'capitalize' }}>  {`${props.path} `} </span>
            </Link>
        </li>
    )
}


function NavbarBar() {

    const [username, setUsername] = useState()
    const [userType, setUserType] = useState()


    const signOut = useSignOut()
    const navigate = useNavigate()
    
    let my_class = "background-color: #2ccdf5;  ";
    const navLinks = {
        color: "#fff",
        textDecoration: "none",
        fontWeight: "bolder",
        fontFamily: "arial black",
        fontSize: "13px",
        marginLeft: "12px"
    };
    const nav_styles = {

        backgroundColor: "#042804bd",
        fontFamily: "arial",
        fontWeight: "bolder",
        zIndex: "1"

    };
    const loginLink = {
        color: "#fff",
        textDecoration: "none",
        fontWeight: "bolder",
        fontFamily: "arial black",
        fontSize: "13px"

    };
    const iconStyle = {
        color: "#00ff33bd",
        marginRight: "5px"

    };
    const iconStyles = {
        color: "#2ccdf5",
        marginRight: "5px"

    };
    const brandStyles = {
        color: "#fff",
        textDecoration: "none",
        fontWeight: "bolder",
        fontFamily: "arial black",
        fontSize: "20px"
    }
    const subMenuTitle = {
        name: "<span style={{color:'#000'}}>Action</span>"
    }
    const firstMenu = {
        marginLeft: '50px'
    }

    useEffect(() => {
        setUsername(localStorage.getItem('token'))
        setUserType(localStorage.getItem('catname'))
        console.log('-----------------------')
        console.log(username)
    })
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('catname')
        localStorage.removeItem('userid')
        localStorage.clear()
        signOut();
        if (localStorage.getItem('token') == '' && localStorage.getItem('catname') == '' && localStorage.getItem('userid') == '') {
            navigate('/login')
        }
    }
    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" style={nav_styles} >
            <Container>
                <Navbar.Brand href="#home">

                    <img
                        src={Logo}
                        width="80"
                        height="80" style={{ borderRadius: '100%' }}
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>


                <Navbar.Brand style={brandStyles} as={Link} to="/">
                    <Icon size={23} style={{ color: 'green' }} icon={ic_home} />
                    BRD</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Nav.Link style={navLinks} as={Link} to="#">
                    <Icon size={18} style={{ color: 'green' }} icon={ic_person_pin} />
                    About us
                </Nav.Link>



                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {(userType === 'admin' || userType === 'vendor') &&
                            <NavDropdown style={navLinks} color='#fff' title={<span style={navLinks}>
                                <Icon style={iconStyle} className={firstMenu} size={22} icon={more} />
                                Users</span>} id="collasible-nav-dropdowns">

                                <NavDropdown.Item as={Link} to="roles">
                                    <span style={{ color: '#000' }}>Roles</span>
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="account">
                                    <span style={{ color: '#000' }}>Users</span>
                                </NavDropdown.Item>

                            </NavDropdown>
                        }
                        {userType === 'proc_officer' &&
                            <NavDropdown style={navLinks} color='#fff' title={<span style={navLinks}>
                                <Icon style={iconStyle} size={22} icon={proc} />
                                Procurement</span>} id="collasible-nav-dropdowns">
                                <NavDropdown.Item as={Link} to="procurement">
                                    <span style={{ color: '#000' }}>New Procurement</span>
                                </NavDropdown.Item>

                            </NavDropdown>
                        }




                        {(userType === 'admin' || userType === 'user' || userType === 'proc_officer' || userType === 'vendor') && <>
                            <NavDropdown style={navLinks} color='#fff' title={
                                <span style={navLinks}>
                                    <Icon style={iconStyle} size={22} icon={tender} />
                                    Tender
                                </span>} id="collasible-nav-dropdowns">

                                {userType === 'proc_officer' &&
                                    <NavDropdown.Item as={Link} to="submission">
                                        Submission
                                    </NavDropdown.Item>
                                }

                                {userType === 'user' &&
                                    <NavDropdown.Item as={Link} to="request">
                                        Request
                                    </NavDropdown.Item>
                                }

                                {userType === 'vendor' && <>
                                    <NavDropdown.Item as={Link} to="resp">
                                        Response
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="resp_att">
                                        Response Att.
                                    </NavDropdown.Item> </>
                                }
                                {userType === 'proc_officer' && <>
                                    <NavDropdown.Item as={Link} to="crit_group">
                                        Criteria Groups
                                    </NavDropdown.Item>

                                    <NavDropdown.Item as={Link} to="criteria">
                                        Criteria
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="tender_crit">
                                        Evaluation
                                    </NavDropdown.Item> </>
                                }


                                {userType === 'admin' && <>
                                    <NavDropdown.Item as={Link} to="comm">
                                        Communication
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="rating">
                                        Rating
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="reporting">
                                        Reporting😉
                                    </NavDropdown.Item>
                                </>
                                }
                            </NavDropdown> </>
                        }

                    </Nav>
                    <Nav>
                        {(userType === undefined || userType==='' || userType===null) ?
                            <Nav.Link as={Link} style={loginLink} eventKey={2} to="/login">
                                Login 
                            </Nav.Link>
                            :
                            <Nav.Link as={Link} onClick={logout}>
                                <span style={{ color: '#fff', fontWeight: 'normal' }}>
                                    Logout 
                                </span>
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>





    )
}

export default NavbarBar


