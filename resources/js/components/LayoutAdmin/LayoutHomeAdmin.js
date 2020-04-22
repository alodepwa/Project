import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Form,
    FormControl,
    Button,
    Dropdown,
    InputGroup

} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
export default function LayoutHomeAdmin() {
    const get_data = useSelector(state => console.log(state));
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto ">
                    <Navbar.Brand href="#">Admin</Navbar.Brand>
                    <Button className="btn btn-link navbar-collapse" id="sidebarToggle" href="#">
                        <i className="fas fa-bars text-light"></i>
                    </Button>
                </Nav>

                <Nav>
                    <Form inline>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Seach for..."
                                aria-label="Seach for..."
                                aria-describedby="basic-addon"
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary btn-warning"><i className="fas fa-search"></i></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            <i className="fas fa-user fa-fw"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu-right">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
            {/* end navbar */}
            <div className="w-100">
                <div className="w-100" id="layoutSidenav">
                    <div className="sb-sidenav" id="menu-right">
                        <div className="bg-dark" id="layoutSidenav_nav">
                            <Navbar className="d-flex flex-column" id="sb-navbar">
                                <Nav className="nav-link">
                                    <Navbar.Brand href="#" className="text-light"><i className="fas fa-tachometer-alt mr-2"></i>Admin Mananger</Navbar.Brand>
                                </Nav>
                                <Nav className="d-flex flex-column nav-link">
                                    <NavbarBrand href="#" className="text-light collapsed" data-toggle="collapse" data-target="#collapseLayoutOne"
                                        aria-expanded="false" aria-controls="collapseLayoutOne"><i className="fas fa-columns mr-2"></i>Layout One</NavbarBrand>
                                    <NavItem className="collapse" id="collapseLayoutOne" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <Nav className="d-flex flex-column">
                                            <NavLink className="text-light">one</NavLink>
                                            <NavLink className="text-light">two</NavLink>
                                        </Nav>
                                    </NavItem>
                                </Nav>
                                <Nav className="d-flex flex-column nav-link">
                                    <NavbarBrand href="#" className="text-light collapsed" data-toggle="collapse" data-target="#collapseLayoutTwo"
                                        aria-expanded="false" aria-controls="collapseLayoutTwo"><i className="fas fa-columns mr-2"></i>Layout One</NavbarBrand>
                                    <NavItem className="collapse" id="collapseLayoutTwo" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <Nav className="d-flex flex-column">
                                            <NavLink className="text-light">one</NavLink>
                                            <NavLink className="text-light">two</NavLink>
                                        </Nav>
                                    </NavItem>
                                </Nav>
                                <Nav className="d-flex flex-column nav-link">
                                    <NavbarBrand href="#" className="text-light collapsed" data-toggle="collapse" data-target="#collapseLayoutThree"
                                        aria-expanded="false" aria-controls="collapseLayoutThree"><i className="fas fa-columns mr-2"></i>Layout One</NavbarBrand>
                                    <NavItem className="collapse" id="collapseLayoutThree" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <Nav className="d-flex flex-column">
                                            <NavLink className="text-light">one</NavLink>
                                            <NavLink className="text-light">two</NavLink>
                                        </Nav>
                                    </NavItem>
                                </Nav>

                            </Navbar>

                        </div>
                    </div>
                    <div className="d-flex justify-content-between" id="layoutSidenav_content">
                        <div className="mt-4" >
                            <main>
                                {/* <BrowserRouter>
                                    <Switch>
                                        <Route exact path="/" component={LayoutAdminContent} />


                                    </Switch>
                                </BrowserRouter> */}
                            </main>
                            <div className="py-4 bg-light mt-auto">
                                <div className="container-fluid">
                                    <div className="d-flex align-items-center justify-content-between small">
                                        <div className="text-muted">Copyright &copy; Your Website 2020</div>
                                        <div className="text-uppercase">
                                            <a href="#">Contacts us</a>
                                        &middot;
                                        <a href="#">Toan &amp; Trung</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* footer */}
            </div>

        </div>
    )
}
