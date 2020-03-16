import React, {useState, FormEvent, useContext, useEffect} from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IContact } from '../../../app/models/contact'
import {v4 as uuid} from 'uuid';
import {observer} from 'mobx-react-lite';
import ContactStore from '../../../app/stores/contactStore';
import { RouteComponentProps } from 'react-router-dom';

interface DetailsParams {
    id: string;
}


const ContactForm: React.FC<RouteComponentProps<DetailsParams>> = ({match, history}) => {

    const contactStore = useContext(ContactStore)

    const {createContact, editContact, submitting, contact: initialFormState, loadContact, clearContact} = contactStore;

    const [contact, setContact] = useState<IContact>({
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
    });

    useEffect(() => {
        if (match.params.id && contact.id.length === 0) {
            loadContact(match.params.id).then(
                () => initialFormState && setContact(initialFormState)); // only execute setContact if we have a contact in our initial form state
        }
        return () => {
            clearContact();
        }
    }, [loadContact, clearContact, match.params.id, initialFormState, contact.id.length]);

    const handleSubmit = () => {
        if (contact.id.length === 0) {
            let newContact = {
                ...contact,
                id: uuid()
            }
            createContact(newContact).then(() => history.push(`/contacts/${newContact.id}`));
        } else {
            editContact(contact).then(() => history.push(`/contacts/${contact.id}`));
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setContact({...contact, [name]: value})
    }

    return (
        <Grid>
            <Grid.Column width={10}>
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
                <Button onClick={() => history.push('/contacts')} floated="right" type='button' content="Cancel"/>

            </Form>
        </Segment>
            </Grid.Column>
        </Grid>
       
    )
}

export default observer(ContactForm);
