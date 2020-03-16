import {observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IContact } from '../models/contact';
import agent from '../api/agent';

configure({enforceActions: 'always'})

class ContactStore {
    @observable contactRegistry = new Map();
    @observable contact: IContact | null = null; 
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get contactsByOrder() {
        return Array.from(this.contactRegistry.values()).sort();
    }

     @action loadContacts = async () => {
        this.loadingInitial = true; 
        try {
            const contacts = await agent.Contacts.list();
            runInAction('loading contacts',() => {
                contacts.forEach(contact => {            
                    this.contactRegistry.set(contact.id, contact)         
                }); 
                this.loadingInitial = false;
            });  
        } catch (error) {
            runInAction('load contacts error',() => {
               this.loadingInitial = false;
            });
           console.log(error); 
        }   
    }; 


    @action loadContact = async (id: string) => {
        let contact = this.getContact(id);
        if (contact) {
            this.contact = contact;
        } else {
            this.loadingInitial = true;
            try {
              contact = await agent.Contacts.details(id);
              runInAction('getting contact', () => {
                  this.contact = contact;
                  this.loadingInitial = false;
              })
            } catch (error) {
                runInAction('get contact error',() => {
                    this.loadingInitial = false;
                })
              console.log(error);  
            }
        }
    }

    @action clearContact = () => {
       this.contact = null; 
    }

    getContact = (id: string) => {
        return this.contactRegistry.get(id);
    }

  

    @action createContact = async (contact: IContact) => {
        this.submitting = true;
        try {
            await agent.Contacts.create(contact);
            runInAction('creating contact',() => {
                this.contactRegistry.set(contact.id, contact);
                this.submitting = false;
            })
            
        } catch (error) {
            runInAction('create contact error',() => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action editContact = async (contact: IContact) => {
        this.submitting = true;
        try {
            await agent.Contacts.update(contact);
            runInAction('editing contact',() => {
                this.contactRegistry.set(contact.id, contact)
                this.contact = contact;
                this.submitting = false;
            })
           
        } catch (error) {
            runInAction('edit contact error',() => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action deleteContact = async (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Contacts.delete(id);
            runInAction('deleting contact',() => {
                this.contactRegistry.delete(id); 
                this.submitting = false;
                this.target = '';
            })   
        } catch (error) {
            runInAction('deleting contact error',() => {
                this.submitting = false;
                this.target = ''; 
            })
            console.log(error);
        }
    }


   
}

export default createContext(new ContactStore())