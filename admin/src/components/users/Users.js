import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserBlocking } from "../../database/repository";
import UserCard from './UserCard';

function Users() {
    const [users, setUsers] = useState([]);
  
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUsers(users);
    };
  
    const toggleBlock = async (username, blocked) => {
        console.log(username)
        console.log(blocked)
      await updateUserBlocking(username, blocked);
      // After updating the user's blocked status, fetch users again to get the updated data
      await fetchUsers();
    };
  
    useEffect(() => {
      fetchUsers();
    }, []); // Empty dependency array ensures the effect runs once after the initial render

    return (
        <div style={{width:'90%', textAlign:'left', margin:'0 auto'}}>
            <h1>Users</h1>
            <hr/>
            {users.map((user, index) => (
                <UserCard key={index} user={user} toggleBlock={toggleBlock}></UserCard>
            ))}
        </div>
    );
}

export default Users;
