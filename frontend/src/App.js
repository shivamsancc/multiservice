import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [homeMessage, setHomeMessage] = useState('');
  const [aboutMessage, setAboutMessage] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [listMessage, setListMessage] = useState('');

  useEffect(() => {
    // Fetch data from HomePage service
    axios.get('/api/homepage')
      .then(response => setHomeMessage(response.data))
      .catch(error => console.error('Error fetching home message:', error));

    // Fetch data from AboutPage service
    axios.get('/api/aboutpage')
      .then(response => setAboutMessage(response.data))
      .catch(error => console.error('Error fetching about message:', error));

    // Fetch data from ContactPage service
    axios.get('/api/contactpage')
      .then(response => setContactMessage(response.data))
      .catch(error => console.error('Error fetching contact message:', error));

    // Fetch data from ListService
    axios.get('/api/listservice')
      .then(response => setListMessage(response.data))
      .catch(error => console.error('Error fetching list message:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend Service</h1>
        <div>
          <h2>HomePage Message</h2>
          <p>{homeMessage}</p>
        </div>
        <div>
          <h2>AboutPage Message</h2>
          <p>{aboutMessage}</p>
        </div>
        <div>
          <h2>ContactPage Message</h2>
          <p>{contactMessage}</p>
        </div>
        <div>
          <h2>ListService Message</h2>
          <p>{listMessage}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
