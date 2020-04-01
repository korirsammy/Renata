import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
 

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Renata
        </Menu.Item>
        <Menu.Item name="Products" as={NavLink} to='/products'/>
        <Menu.Item>
          <Button
            as={NavLink} to='/createProduct'
            positive
            content="Create Product"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);