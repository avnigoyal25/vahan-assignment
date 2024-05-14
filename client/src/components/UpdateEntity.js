import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/update.css';

export default function UpdateEntity() {
  const navigate = useNavigate()
  const [entityName, setEntityName] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [attributeName, setAttributeName] = useState('');
  const [attributeValue, setAttributeValue] = useState('');
  const [newAttributeName, setNewAttributeName] = useState('');
  const [newAttributeValue, setNewAttributeValue] = useState('');
  const [message, setMessage] = useState('');

  const Home=()=>{
    navigate('/')
}

  const handleAddAttribute = () => {
    if (newAttributeName && newAttributeValue) {
      setAttributes([
        ...attributes,
        {
          name: newAttributeName,
          value: newAttributeValue,
        }
      ]);
      setNewAttributeName('');
      setNewAttributeValue('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/update-entity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entityName, attributeName, attributeValue, attributes }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setMessage('Entity updated successfully');
      setEntityName('');
      setAttributeName('');
      setAttributeValue('');
      setAttributes([]);
    } else {
      const errorData = await response.json();
      setMessage(errorData.error || 'Error updating entity');
    }
  };

  return (
    <div>
      <h1>Update Entity!!</h1>
      <form onSubmit={handleSubmit} id='form4'>
        <label id='label4'>
          Entity Name:
          <input
            id='input4'
            type="text"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label id='label4'>
          Attribute Name to Identify:
          <input
           id='input4'
            type="text"
            value={attributeName}
            onChange={(e) => setAttributeName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label id='label4'>
          Identified Attribute Value:
          <input
            id='input4'
            type="text"
            value={attributeValue}
            onChange={(e) => setAttributeValue(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label id='label4'>
          Attribute Name to Change:
          <input
            id='input4'
            type="text"
            value={newAttributeName}
            onChange={(e) => setNewAttributeName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label id='label4'>
          New Attribute Value:
          <input
            id='input4'
            type="text"
            value={newAttributeValue}
            onChange={(e) => setNewAttributeValue(e.target.value)}
          />
        </label>
        <br />
        <button className='button-3' type="button" onClick={handleAddAttribute}>
          Add Attribute
        </button>
        <ul>
          {attributes.map((attr, index) => (
            <li style={{listStyle:"none",fontStyle:"italic",color:"red"}} key={index}>
              {attr.name} will be updated to "{attr.value}" 
            </li>
          ))}
        </ul>
        <button className='button-7' type="submit">Update Entity</button>
        {message && <p style={{color:"brown"}}>{message}</p>}
      </form>
      <button onClick={Home} className='button-1'>Go to home page!</button>
    </div>
  );
}
