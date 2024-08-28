import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { loginUser } from "../../redux/actions/loginActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const { loading, error } = useSelector((state) => state.login || {});

  const submitHandler = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));

    // Check if the login was successful
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/"); // Redirect to homepage
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
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
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
      <p>
        <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
