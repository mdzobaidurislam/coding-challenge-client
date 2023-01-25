import React, { useEffect, useState } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import profile from "./../../profile.png";
const NavMenu = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const NameUser = localStorage.getItem("name");
    setUserName(NameUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/task" className="nav-link">
                Task
              </NavLink>
            </Nav>
            <Nav>
              <NavLink to="/task" className="nav-link">
                <Image
                  style={{ width: "40px", marginRight: "10px" }}
                  src={profile}
                  alt={userName && userName}
                  thumbnail={true}
                  rounded={true}
                  roundedCircle={true}
                  className=""
                />
                {userName && userName}
              </NavLink>
              <Button onClick={handleLogout} className="nav-link">
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavMenu;
