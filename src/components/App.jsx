import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Contacts } from 'components/Contacts/Contacts';
import { AddContactForm } from 'components/AddContactForm/AddContactForm';
import { Filter } from 'components/Filter/Filter';
import styles from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      const parsedContacts = JSON.parse(contacts);
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (isFirstMount) {
      setIsFirstMount(false);
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, isFirstMount]);

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filterChange = e => {
    setFilter(e.target.value);
  };

  const contactsChange = (name, number) => {
    setContacts(prevState => {
      if (
        prevState.find(contact =>
          contact.name.toLowerCase().includes(name.toLowerCase())
        )
      ) {
        return alert(`${name} is already in contacts`);
      }
      return {
        contacts: [...prevState, { name: name, number: number, id: nanoid() }],
      };
    });
  };

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.header}>Phonebook</h1>

        <AddContactForm contactsChange={contactsChange} />
        <h2 className={styles.header}>Contacts</h2>
        <Filter filterChange={filterChange} />
        <Contacts
          contacts={contacts}
          filter={filter}
          deleteContact={deleteContact}
        />
      </section>
    </>
  );
};
