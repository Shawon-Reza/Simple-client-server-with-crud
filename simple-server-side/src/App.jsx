
import './App.css'

function App() {

const handleadduser=(event)=>{
  event.preventDefault();
  const name= event.target.name.value
  const email= event.target.email.value
  const user={name,email}
  console.log(user);

  fetch("http://localhost:5000/users",{
    method: "POST",
    headers:{
      "content-Type": "application/json"
    },
    body : JSON.stringify(user)
    
  })
  .then(res=>res.json())
  .then(data=>console.log(data))
}

  return (
    <>
   
      <h1>Client side</h1>
      <form onSubmit={handleadduser}>
        <input type="text" name="name" id="" required />
        <input type="email" name="email" id="" required />
        <input type="submit" value="Add" />

        
         
      </form>
     
    </>
  )
}

export default App
