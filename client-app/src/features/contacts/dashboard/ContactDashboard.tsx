import React, {  useContext, useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';
import ContactList from './ContactList';
import ContactStore from '../../../app/stores/contactStore'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';



const ContactDashboard: React.FC = () => {

    const contactStore = useContext(ContactStore);

    useEffect(() => {
        contactStore.loadContacts();
      }, [contactStore]);
      
      if (contactStore.loadingInitial) return <LoadingComponent content="Loading address book..."/>;

    return (
      <Grid relaxed centered columns={1} >
      <Grid.Row >
        <Grid.Column width='10'>
           <ContactList />
        </Grid.Column>
        
      </Grid.Row>
    </Grid>
    )
}

export default observer(ContactDashboard);
