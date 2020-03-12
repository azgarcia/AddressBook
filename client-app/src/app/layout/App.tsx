import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import { IContact } from '../models/contact';
import { NavBar } from '../../features/nav/NavBar';
import { ContactDashboard } from '../../features/contacts/dashboard/ContactDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';



const App = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectContact = (id: string) =>{
    setSelectedContact(contacts.filter(a => a.id === id)[0])
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedContact(null);
    setEditMode(true);
  }

  const handleCreateContact = (contact: IContact) => {
    setSubmitting(true);
    agent.Contacts.create(contact).then(() => {
      setContacts([...contacts, contact])
      setSelectedContact(contact); // displays newly created contact in details view
      setEditMode(false); // removes, turns off edit mode
    }).then(() => setSubmitting(false))
    
    
  }

  const handleEditContact = (contact: IContact) => {
    setSubmitting(true);
    agent.Contacts.update(contact).then(() => {
      setContacts([...contacts.filter(c => c.id !== contact.id), contact])
      setSelectedContact(contact);
      setEditMode(false);
    }).then(() => setSubmitting(false))
    
  }

  const handleDeleteContact = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Contacts.delete(id).then(() => {
      setContacts([...contacts.filter(c => c.id !== id)])
    }).then(() => setSubmitting(false))
    
  }

  useEffect(() => {
    agent.Contacts.list()
      .then((response) => {
        setContacts(response)
      }).then(() => setLoading(false));
  }, []);
  
  if (loading) return <LoadingComponent content="Loading address book..."/>

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm}/>
        <Container style={{marginTop: '7em'}}>
            <ContactDashboard 
            contacts={contacts} 
            selectContact={handleSelectContact}
            selectedContact={selectedContact}
            editMode={editMode}
            setEditMode={setEditMode}
            setSelectedContact={setSelectedContact}
            createContact={handleCreateContact}
            editContact={handleEditContact}
            deleteContact={handleDeleteContact}
            submitting={submitting}
            target={target}
            />
        </Container>
    
       
    
    </Fragment>
  );

}


export default App;
