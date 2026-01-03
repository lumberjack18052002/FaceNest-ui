import React, { useEffect, useState } from 'react';
import AddProfile from './AddProfile';

const ProfileList = () => {
    const [profiles,setProfiles]=useState([]);

    const loadProfiles=()=>{
        fetch("http://localhost:8080/profiles/allprofiles")
        .then(res=>res.json())
        .then(data=>setProfiles(data));
    };
    useEffect(()=>{loadProfiles(); 
    },[]);
    return (
        <div>
            <AddProfile onProfileAdded={loadProfiles}/>
            <h1>Profile List</h1>
            {profiles.length===0 && <p>No profiles found</p>}
            {profiles.map(p=>(
                <div key={p.id}>
                    <p>{p.name} - {p.email}</p>
                </div>
            ))} 
        </div>
    );
};

export default ProfileList;