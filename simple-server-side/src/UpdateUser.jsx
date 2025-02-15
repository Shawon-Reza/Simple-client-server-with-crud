import { useLoaderData } from "react-router-dom";

const UpdateUser = () => {
    const user = useLoaderData();
    console.log(user);

    const handleUpdate = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updateuser = { name, email }
        console.log(updateuser);

        fetch(`http://localhost:5000/users/updates/${user._id}`,
            {
                method: "PUT",
                headers: {
                    "content-Type": 'application/json'
                },
                body : JSON.stringify(updateuser)
            }
        )
            .then(res => res.json())
            .then(data => console.log(data));

    }

    return (
        <div>
            <p>Update User Name {user.name} {user.length}</p>

            <form onSubmit={handleUpdate} >

                <input type="text" name="name" defaultValue={user.name} id="" />
                <input type="email" name="email" defaultValue={user.email} id="" />
                <input type="submit" value="Upadates" />
            </form>
        </div>
    );
};

export default UpdateUser;