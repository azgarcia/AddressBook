import React, {useState, FormEvent} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IContact } from '../../../app/models/contact'
import {v4 as uuid} from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;  
  contact: IContact
  createContact: (contact: IContact) => void;
  editContact: (contact: IContact) => void;
  submitting: boolean
}

export const ContactForm: React.FC<IProps> = ({setEditMode, contact: initialFormState, createContact, editContact, submitting }) => {
    
    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState
        } else {
            return {
                id: '',
                firstName: '',
                lastName: '',
                relatedName: '',
                phoneNumber: '',
                email: '',
                streetAddress: '',
                city: '',
                state: '',
                postalCode: '',
                notes: ''
            };
        }
    };

    const [contact, setContact] = useState<IContact>(initializeForm);

    const handleSubmit = () => {
        if (contact.id.length === 0) {
            let newContact = {
                ...contact,
                id: uuid()
            }
            createContact(newContact);
        } else {
            editContact(contact);
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setContact({...contact, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='firstName' placeholder='First Name' value={contact.firstName}/>
                <Form.Input onChange={handleInputChange} name='lastName' placeholder='Last Name' value={contact.lastName} />
                <Form.Input onChange={handleInputChange} name='phoneNumber' placeholder='Phone Number' value={contact.phoneNumber} />
                <Form.Input onChange={handleInputChange} name='email' placeholder='Email' value={contact.email} />
                <Form.Input onChange={handleInputChange} name='streetAddress' placeholder='Address' value={contact.streetAddress}/>
                <Form.Input onChange={handleInputChange} name='city' placeholder='City' value={contact.city} />
                <Form.Input onChange={handleInputChange} name='state' placeholder='State' value={contact.state}/>
                <Form.Input onChange={handleInputChange} name='postalCode' placeholder='Postal Code' value={contact.postalCode} />
                <Form.TextArea onChange={handleInputChange} name='notes' rows={2} placeholder='Notes' value={contact.notes}/>
                
                <Button loading={submitting} floated="right" positive type='submit' content="Submit"/>
                <Button onClick={() => setEditMode(false)} floated="right" type='button' content="Cancel"/>

            </Form>
        </Segment>
    )
}
