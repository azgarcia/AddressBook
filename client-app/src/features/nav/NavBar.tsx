import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import {observer} from 'mobx-react-lite';
import { NavLink } from "react-router-dom";


const NavBar: React.FC = () => {

  return (
    <Menu fixed="top" inverted>
        <Container>
            <Menu.Item header as={NavLink} exact to='/'>
                <img src="/assets/user.png" alt="logo" style={{marginRight: '10px'}}/>
                Address Book
            </Menu.Item>

            <Menu.Item name="Contacts" as={NavLink} to='/contacts'/>

            <Menu.Item>
                <Button inverted color='black' as={NavLink} to='/createContact'  content="Add Contact" />
            </Menu.Item>

        </Container>
      
    </Menu>
  );
};

export default observer(NavBar);
