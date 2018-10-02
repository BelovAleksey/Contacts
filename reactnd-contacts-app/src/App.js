import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
  }
  componentDidMount() {
    ContactsAPI.getAll()
    .then((contacts)=>(this.setState(() => ({contacts}))))
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({ 
      contacts: currentState.contacts.filter(el => {return el.id !== contact.id})
    }))
    ContactsAPI.remove(contact)
  }
  render() {
    return (
      <div>
        <ListContacts contacts={this.state.contacts}
        onClickDelete={this.removeContact}
        />
      </div>
    )
  }
}

export default App