import React, { useState } from 'react'
import '../css/create.css'
import { useNavigate } from "react-router-dom";

export default function CreateEntity() {
    const navigate = useNavigate()
    const [entityName, setEntityName] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [attributeName, setAttributeName] = useState('');
    const [attributeType, setAttributeType] = useState('');
    const [attributeValue, setAttributeValue] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const Home=()=>{
        navigate('/')
    }

    const handleAddAttribute = () => {
        if (attributeName && attributeType && attributeValue) {
            setAttributes([...attributes, { name: attributeName, type: attributeType, value: attributeValue }]);
            setAttributeName('');
            setAttributeType('');
            setAttributeValue('');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (attributes.length === 0) {
            alert("Please add at least one attribute.");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/api/entities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ entityName, attributes })
            });
    
            if (response.ok) {
                const result = await response.json();
                
                console.log('Entity created:', result);

                
                setEntityName('');
                setAttributes([]);
                setAttributeName('');
                setAttributeType('');
                setAttributeValue('');
                setSuccessMessage('Entity created successfully!');

                
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } else {
                throw new Error('Failed to create entity');
            }
        } catch (error) {
            console.error('Error submitting entity:', error);
        }
    };
    return (
        <div>
            <h1>Create entity!!!</h1>
            {successMessage && <p>{successMessage}</p>}
                <form onSubmit={handleSubmit} id='form1'>
                    <label id='label1'>
                        Entity Name:
                        <input
                           id='input1'
                            type="text"
                            value={entityName}
                            onChange={(e) => setEntityName(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <br />
                    <label id='label1'>
                        Attribute Name:
                        <input
                            id='input1'
                            type="text"
                            value={attributeName}
                            onChange={(e) => setAttributeName(e.target.value)}
                        />
                    </label>
                    <br />
                    <br />
                    <label id='label1' style={{marginLeft:"-190px"}}>
                        Attribute Type:
                        <select
                            id='input1'
                            value={attributeType}
                            onChange={(e) => setAttributeType(e.target.value)}
                        >
                            <option value="">Select Type</option>
                            <option value="int">Integer</option>
                            <option value="string">String</option>
                            <option value="email">Email</option>
                            <option value="date">Date</option>
                        </select>
                    </label>
                    <br />
                    <br />
                    <label id='label1'>
                        Attribute Value:
                        <input
                            id='input1'
                            type="text"
                            value={attributeValue}
                            onChange={(e) => setAttributeValue(e.target.value)}
                        />
                    </label>
                    <br />
                    <br />
                    <button type="button" onClick={handleAddAttribute} className='button-3'>
                        Add Attribute
                    </button>
                    <ul>
                        {attributes.map((attr, index) => (
                            <li style={{listStyle:"none",fontStyle:"italic",color:"red"}} key={index}>
                                {attr.name} - {attr.type} - {attr.value}
                            </li>
                        ))}
                    </ul>
                    <button type="submit" className='button-7'>Create Entity</button>
                </form>
                <button onClick={Home} className='button-1'>Go to home page!</button>
        </div>
    );
}
