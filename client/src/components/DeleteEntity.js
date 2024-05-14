import React, { useState } from 'react';
import '../css/delete.css'
import { useNavigate } from "react-router-dom";

export default function DeleteEntity() {
  const navigate = useNavigate()
  const [entityName, setEntityName] = useState('');
  const [entryName, setEntryName] = useState('');
  const [attribute, setAttribute] = useState('');
  const [message, setMessage] = useState('');

  const Home = () => {
    navigate('/')
  }

  const handleEntityNameChange = (e) => {
    setEntityName(e.target.value);
  };

  const handleEntryNameChange = (e) => {
    setEntryName(e.target.value);
  };

  const handleAttributeChange = (e) => {
    setAttribute(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/delete-entity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entityName, entryName, attribute }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage('Entity deleted successfully');
      console.log(data);
      setEntityName('');
      setAttribute('');
      setEntryName('');
    } else {
      setMessage('Error deleting entity');
      console.error('Error deleting entity');
    }
  };

  return (
    <div>
      <h1>Delete Entity!!</h1>
      <form onSubmit={handleSubmit} id='form2'>
        <br />
        <label id='label2' style={{ marginLeft: "-100px" }}>
          Enter the entity name:
          <input
            style={{ marginLeft: "10px" }}
            id='input2'
            type="text"
            value={entityName}
            onChange={handleEntityNameChange}
          />
        </label>
        <br />
        <br />
        <label id='label2' style={{ marginLeft: "-10px" }}>
          Enter the attribute name from which you want to delete your entry:
          <input
            style={{ marginLeft: "10px" }}
            id='input2'
            type="text"
            value={attribute}
            onChange={handleAttributeChange}
          />
        </label>
        <br />
        <br />
        <label id='label2' style={{ marginLeft: "-16px" }}>
          Enter the entry you want to delete:
          <input
            style={{ marginLeft: "10px"}}
            id='input2'
            type="text"
            value={entryName}
            onChange={handleEntryNameChange}
          />
        </label>
        <br />
        <button className='button-3' type="submit">Delete Entity</button>
        {message && <p style={{color:"blue"}}>{message}</p>}
      </form>
      <button onClick={Home} className='button-1'>Go to home page!</button>
    </div>
  );
}
