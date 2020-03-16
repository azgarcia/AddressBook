import React, { useContext } from 'react'
import { Item, Image, Button, Label, Segment } from 'semantic-ui-react'
import {observer} from 'mobx-react-lite';
import ContactStore from '../../../app/stores/contactStore';
import { Link } from 'react-router-dom';
import ContactListItem from './ContactListItem';


const ContactList: React.FC = () => {
    const contactStore = useContext(ContactStore);

    const { contactsByOrder,  deleteContact, submitting, target} = contactStore; 
  

    return (
        <Segment clearing>
            
            <Item.Group>
            {contactsByOrder.map(contact => (
                    <ContactListItem key={contact.id} contact={contact} /> 
                                                            
                ))}
            </Item.Group>
                
               
                
                
                
            
        </Segment>
        
    )
}

export default observer(ContactList);