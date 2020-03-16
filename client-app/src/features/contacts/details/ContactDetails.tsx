import React, { useContext, useEffect } from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import {observer} from 'mobx-react-lite';
import ContactStore from '../../../app/stores/contactStore';
import { RouteComponentProps, Link } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

interface DetailParams {
    id: string
}

const activityImageStyle = {
    filter: 'brightness(30%)'
  };

const ContactDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    
    const contactStore = useContext(ContactStore);
    const {contact, loadContact, loadingInitial} = contactStore;

    useEffect(() => {
       loadContact(match.params.id)
    },[loadContact, match.params.id])

    if (loadingInitial || !contact) return <LoadingComponent content='Loading contact...' />

    return (
        
        <Card centered >
            <Image size='tiny'   src="/assets/user.png"  style={activityImageStyle} wrapped ui={false} />
            <Card.Content>
            
                <Card.Header>{contact!.firstName}</Card.Header>
                <Card.Meta>
                    <span >{contact!.phoneNumber}</span>
               </Card.Meta>
                <Card.Description>
                {contact!.streetAddress}, {contact!.city}, {contact!.state}, {contact!.postalCode}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>

                    <Button as={Link} to={`/manage/${contact.id}`}
                    basic 
                    color='blue' 
                    content='Edit'/>

                    <Button onClick={() => history.push('/contacts')} 
                    basic 
                    color='grey' 
                    content='Cancel'/>
                    
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(ContactDetails);
