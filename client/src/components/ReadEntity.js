import React, { useState } from 'react'
import '../css/read.css';
import { useNavigate } from "react-router-dom";

export default function ReadEntity() {
  const navigate = useNavigate()
  const [entityName, setEntityName] = useState('');
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const Home=()=>{
    navigate('/')
}

  const handleInputChange = (e) => {
    setEntityName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/read-entity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entityName }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.length === 0) {
        setErrorMessage('No data found for the specified entity name.');
        setData([]);
      } else {
        setErrorMessage('');
        setData(data); 
        setEntityName('');
      }
    } else {
      console.error('Error reading entity');
      setErrorMessage('Entity not found');
      setEntityName('');
    }
  };


  return (
    <div>
      <h1>Read Entity!!</h1>
      <form onSubmit={handleSubmit} id='form3'>
        <label id='label3'>
          Enter the entity name which you want to read!
          <br />
          <input
          style={{marginLeft:"-260px"}}
            type="text"
            value={entityName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button className='button-3' type="submit">Read Entity</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {data.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, idx) => (
                  <td key={idx}>{value !== null ? value : 'N/A'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={Home} className='button-1'>Go to home page!</button>
    </div>
  )
}