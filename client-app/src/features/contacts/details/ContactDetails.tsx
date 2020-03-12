import React from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { IContact } from '../../../app/models/contact'

interface IProps {
    contact: IContact
    setEditMode: (editMode: boolean) => void;
    setSelectedContact: (contact: IContact | null) => void;
}

export const ContactDetails: React.FC<IProps> = ({contact, setEditMode, setSelectedContact}) => {
    return (
        <Card fluid>
            <Image src="assets/logo.png" wrapped ui={false} />
            <Card.Content>
                <Card.Header>{contact.firstName}</Card.Header>
                <Card.Meta>
                    <span >{contact.phoneNumber}</span>
               </Card.Meta>
                <Card.Description>
                {contact.streetAddress}, {contact.city}, {contact.state}, {contact.postalCode}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group width={2}>
                    <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit'/>
                    <Button onClick={() => setSelectedContact(null)} basic color='grey' content='Cancel'/>
                    
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
