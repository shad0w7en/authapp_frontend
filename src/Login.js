import React , {useState} from "react";



const Login = () =>{
    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwtToken , setJwtToken] = useState("");
    const [message , setMessage] = useState("");    

    const [profile , setProfile] = useState(null);

    const handleProfile = async (jwtToken) =>{
        console.log("JWT Token in handleProfile :" , jwtToken);
        try{
            const response = await fetch('http://localhost:8080/api/profile',{
                method : 'GET',
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
        });
        if(response.ok){
            const data = await response.json();
            console.log("daata entry",data);
            setProfile(data);
        }else{
            console.log("Fetching profile failed");
        }
    }catch(error){
        console.log("Error in fetching profile :" , error);
    }
}

    const handleLogin = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/signin',{
                method : 'POST',
                headers: {
                    
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });
            if(response.ok){
                const data = await response.json();
                console.log(data);
                setJwtToken(data.jwtToken);
                setMessage("Login Successful");
                handleProfile(data.jwtToken);
            }else{
                setMessage("Login Failed");
            }
        } catch (error) {
            console.log("Error :" , error);
            setMessage("Login Failed");
        }
    };
    return (<div>
        <form onSubmit={handleLogin}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        {jwtToken && <p>JWT Token: {jwtToken}</p>}
        {profile && (
            <div>
                <h2>Profile</h2>
                <div>Username: {profile.username}</div>
                <div>password: {profile.password}</div>
                <div>Roles : {profile.roles.join(", ")}</div>
                <div>message: {profile.message}</div>
            </div>
        )}
    </div>);
}

export default Login;