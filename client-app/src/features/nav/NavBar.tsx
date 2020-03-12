import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = ({openCreateForm}) => {
  return (
    <Menu fixed="top" inverted>
        <Container>
            <Menu.Item header>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                Address Book
            </Menu.Item>
            <Menu.Item name="Contacts" />
            <Menu.Item>
                <Button onClick={openCreateForm} positive content="Add Contact" />
            </Menu.Item>
        </Container>
      
    </Menu>
  );
};
