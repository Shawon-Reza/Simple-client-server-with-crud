import { useLoaderData } from "react-router-dom";


const Users = () => {
    const handledelete = (_id) => {
        console.log(_id);

        fetch(`http://localhost:5000/users/${_id}`,{
            method: "DELETE"
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }




    const users = useLoaderData()
    console.log(users);
    return (
        <div>
            <h1>users{users.length}</h1>
            {
                users.map(user => <p key={user._id}>{user.name} {user.email} {user._id} <button onClick={() => handledelete(user._id)}>x</button></p>)
            }
        </div>
    );
};

export default Users;