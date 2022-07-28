import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotes, getByCategory } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import LoginButton from "../Auth0/login";
import LogoutButton from "../Auth0/logout";
import { useAuth0 } from "@auth0/auth0-react";
import S from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function MainNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated,  } = useAuth0();

  useEffect(() => {
    user?.email && dispatch(getNotes(user?.email));
  }, [user, dispatch]);

  const handleOnCategory = (category) => {
    user?.email&&dispatch(getByCategory(category, user.email))
    navigate('/mynotes')
  }

 

  return (
    <div>
      <Navbar bg="danger" expand="lg">
        <Container>
          <Navbar.Brand onClick={()=>navigate("/")}>Notes App</Navbar.Brand>
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <NavDropdown title="Categories" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={()=>handleOnCategory('Family')}>Family</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleOnCategory('Study')}>Study</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleOnCategory('Clients')}>Clients</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleOnCategory('Job')}>Job</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleOnCategory('Events')}>Events</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleOnCategory('Rutine')}>Rutine</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleOnCategory('Friends')}>Friends</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>user?.email && dispatch(getNotes(user?.email))}>All</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/create")}>
                Create New Note
              </Nav.Link>
              <Nav.Link onClick={() => {
                navigate("/myNotes");
                dispatch(getNotes(user?.email));
                }}>My Notes</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {isAuthenticated ? (
            <div className={S.LoginContainer}>
              <div>
                <NavDropdown title={user.nickname}>
                  { user?.email ? (
                    <div>
                      <NavDropdown.Item onClick={() => navigate("/mynotes")}>
                        My notes
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => navigate("/create")}>
                        Create Note
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <LogoutButton />
                    </div>
                  ) : (
                    <>
                      <p>please verify you email </p>
                      <LogoutButton />
                    </>
                  )}
                </NavDropdown>
              </div>
              <Container>
                <Link to="/">
                  <img className={S.picture} src={user.picture} alt='logo'/>
                </Link>
              </Container>
            </div>
          ) : (
            <LoginButton />
          )}
        </Container>
      </Navbar>
    </div>
  );
}
