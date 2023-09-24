import React, { useState, useEffect } from 'react';
import { getAllUsers } from "../../database/repository";
import UserCard from './UserCard';

function Users(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const users = await getAllUsers();
            setUsers(users);
        }
        fetchUsers();
    }, []);

    return (
        <div style={{width:'60%', textAlign:'left', margin:'0 auto'}}>
            <h1>Users</h1>
            <hr/>
            {users.map((user, index) => (
                <UserCard user={user}></UserCard>
            ))}
        </div>
    );
}

export default Users;
