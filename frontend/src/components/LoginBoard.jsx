import "../styles/Login&RegisterBoard.css";
import {React, useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../components/AuthContext.jsx';

function LoginBoard() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    

    const handleLogin = async (e) => {
        e.preventDefault();
        login(username, password);
      
    };
    

return (
    <div className='loginContainer'>
        <h2>Login</h2>
        <form className="registerForm" onSubmit={handleLogin}>
        <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="usernameInput"
            />
        <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="passwordInput"
            />
           <button className="submitBtn" type="submit">Login</button>
        </form>
        <div><h>Don't have and account?</h> <Link to="/register">Create Account</Link></div>
    </div>
);
};
export default LoginBoard;