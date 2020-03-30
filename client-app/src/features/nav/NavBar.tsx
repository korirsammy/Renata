import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ProductsStore from "../../app/stores/productsStore";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  const productsStore = useContext(ProductsStore);

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Renata
        </Menu.Item>
        <Menu.Item name="Products" />
        <Menu.Item>
          <Button
            onClick={productsStore.openCreateForm}
            positive
            content="Create Product"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
