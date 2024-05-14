import React from 'react'
import { useNavigate } from "react-router-dom";
import '../css/home.css'

export default function Home() {
    const navigate = useNavigate()

    const createEntity=()=>{
        navigate('/create')
    }
    const deleteEntity=()=>{
        navigate('/delete')
    }
    const updateEntity=()=>{
        navigate('/update')
    }
    const readEntity=()=>{
        navigate('/read')
    }



    return (
        <div className="App">
            <h1>CRUD Application</h1>
            <button onClick={createEntity} className='button-36'>Create entity</button>
            <button onClick={deleteEntity} className='button-36'>Delete entity</button>
            <button onClick={readEntity} className='button-36'>Read entity</button>
            <button onClick={updateEntity} className='button-36'>Update entity</button>
        </div>
    )
}
