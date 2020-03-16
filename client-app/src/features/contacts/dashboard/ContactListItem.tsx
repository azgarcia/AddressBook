import React, { useContext } from "react";
import { Item, Image, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ContactStore from "../../../app/stores/contactStore";
import { Link } from "react-router-dom";
import { IContact } from "../../../app/models/contact";

const ContactListItem: React.FC<{ contact: IContact }> = ({ contact }) => {
  const contactStore = useContext(ContactStore);
  const { deleteContact, submitting, target } = contactStore;

  return (
    <Segment.Group raised>
      <Segment>
        <Item.Group >
          <Item>
            <Item.Image
              size="tiny"
              circular
              src="/assets/user.png"
            />

            <Item.Content verticalAlign='middle'>
              <Item.Header  as="a">
                {contact.firstName + " " + contact.lastName}
              </Item.Header>

              <Item.Extra>
                <Button
                  compact
                  as={Link}
                  to={`/contacts/${contact.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
    

                <Button 
                  basic
                  compact
                  name={contact.id}
                  loading={target === contact.id && submitting}
                  onClick={e => deleteContact(e, contact.id)}
                  floated="right"
                  content="Delete"
                  color="grey"
                />
              </Item.Extra>
            </Item.Content>

          </Item>
        </Item.Group>
      </Segment>

    
    </Segment.Group>
  );
};

export default ContactListItem;
