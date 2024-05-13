import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserAdd.css'

export default function UserAdd() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3002/user')
            .then(response => setUsers(response.data))
            .catch(error => {
                console.error('Error fetching users:', error);
                setError('An error occurred while fetching users. Please try again later.');
            });
    }, []);

    return (
        <div>
            <div className='user-table'>
                {error ? (
                    <div>Error: {error}</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Crud</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr>
                                    <td>{user.FirstName}</td>
                                    <td>{user.LastName}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.PhoneNumber}</td>
                                    <td>
                                        <button className='edit' type='button'>Edit</button>
                                        <button className='delete' type='button'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
