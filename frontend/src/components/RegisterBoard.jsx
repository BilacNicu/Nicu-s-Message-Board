import "../styles/Login&RegisterBoard.css";
import { React, useState }from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 

function RegisterBoard() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmitRegister = async (e) => {
        e.preventDefault();
  
        if (password !== confirmPassword) {
          alert('Passwords do not match.');
          return; // Prevent the form from being submitted
        }
  
        try {
          const response = await fetch('/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
              // Registration was successful
              console.log('Registration successful:', data.message);
              navigate('/login');
            } else {
              alert(data.message); // Show error message from server
            }
          } catch (error) {
            alert('Network error. Please try again.');
          }
    
      };

return (
    <div className='loginContainer'>
      <h2>Register to Nicu's Message Board</h2>
      <form className="registerForm" onSubmit={handleSubmitRegister}>
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="confirmPasswordInput"
        />
        <button className="submitBtn" type="submit">Register</button>
      </form>
      <div><h>Have and account?</h> <Link to="/login">Log in</Link></div>
      
    </div>
  );
};
  
  export default RegisterBoard;