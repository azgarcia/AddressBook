import React, { useEffect, Fragment, useContext } from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import {observer} from 'mobx-react-lite';
import ContactDashboard from '../../features/contacts/dashboard/ContactDashboard';
import NavBar from '../../features/nav/NavBar';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ContactForm from '../../features/contacts/form/ContactForm';
import ContactDetails from '../../features/contacts/details/ContactDetails';



const App: React.FC<RouteComponentProps> = ({location}) => {

  return (
    <Fragment>
      
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
       
       <Fragment>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
                <Route exact path='/contacts' component={ContactDashboard} />
                <Route path='/contacts/:id' component={ContactDetails} />
                <Route key={location.key} path= {['/createContact', '/manage/:id']} component={ContactForm} />
            </Container>
        </Fragment>

      )} />
      
    </Fragment>
  );
}

export default withRouter(observer(App));

