import { renderHook } from '@testing-library/react';
import React from 'react';

function  AddProfile ({onProfileAdded}){
    const [name,setName]=React.useState("");
    const [email,setEmail]=React.useState("");
    const [error, setError] = React.useState(null);

    const handleSubmit=(e)=>{
    e.preventDefault();

    const profile={ name, email };

    fetch("http://localhost:8080/profiles/createProfile",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(profile)
    })
    .then(async res=>
        {
            if(!res.ok){
                const err=await res.json();
                throw err;
            }
            return res.json();
        })
    .then(()=>{
        setName("");
        setEmail("");
        onProfileAdded();
    })
    .catch((err)=>{
        setError(err.message || "Something went wrong");
    });
};

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Profile</h1>
            {error && <p style={{color:"red"}}>{error}</p>}
                    <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                    <br/>
                    <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <br/>   
                <button type="submit">Save</button>
        </form>
    );
};

export default AddProfile;