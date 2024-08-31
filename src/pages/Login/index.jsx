import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
<<<<<<< HEAD
import { useUser } from "../../contexts/UserContext";
import FullPageSpinner from "../../components/FullPageSpinner";
=======
import { loginUser } from "../../redux/actions/loginActions";
import logo from '../../assets/logo.png'
>>>>>>> dev

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, isLoading } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(
    function () {
      if (user) {
        navigate("/");
      }
    },
    [user, navigate]
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    login({ email, password });
    setEmail("");
    setPassword("");
  };

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="login-container">
      <form onSubmit={submitHandler}>
        <img src={logo}/>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p> Don't have an account? <a href="/signup">Register here</a></p>
    </div>
  );
};

export default Login;
