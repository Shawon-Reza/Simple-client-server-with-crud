import { data, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";



const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = (_id) => {
        console.log(_id);

        fetch(`http://localhost:5000/users/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    // Update the local state to remove the deleted user
                    const remainingUsers = users.filter((user) => user._id !== _id);
                    setUsers(remainingUsers);
                }
            });
    };

    const handleUpdate = _id => {
        console.log(_id);
        fetch(`http://localhost:5000/users/updates/${_id}`)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div>
            <h1>Users: {users.length}</h1>
            {users.map((user) => (
                <p key={user._id}>
                    {user.name} {user.email} {user._id}{" "}
                    <button onClick={() => handleDelete(user._id)}>x</button>

                    <Link to={`/users/updates/${user._id}`}><button onClick={() => handleUpdate(user._id)}>Update</button></Link>
                </p>
            ))}
        </div>
    );
};

export default Users;
