import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    contacts: [],
    screen: 'list'
  };
  componentDidMount() {
    ContactsAPI.getAll().then(contacts => this.setState(() => ({ contacts })));
  }
  removeContact = contact => {
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(el => {
        return el.id !== contact.id;
      })
    }));
    ContactsAPI.remove(contact);
  };
  CreateContact = contact => {
    ContactsAPI.create(contact).then(contact =>
      this.setState(currentState => ({
        contacts: currentState.contacts.concat([contact])
      }))
    );
  };
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onClickDelete={this.removeContact}
              onNavigate={() => {
                this.setState(() => ({ screen: 'create' }));
              }}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                this.CreateContact(contact);
                history.push('/');
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
