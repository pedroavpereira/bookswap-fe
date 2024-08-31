import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import FullPageSpinner from "../../components/FullPageSpinner";
import logo from "../../assets/logo.png";
const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postcode, setPostcode] = useState("");

  const { user, register, isLoading } = useUser();

  useEffect(
    function () {
      if (user) {
        navigate("/");
      }
    },
    [user, navigate]
  );

  const convertPostcodeToLatLng = async (postcode) => {
    try {
      const response = await axios.get(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      if (response.data.status === 200) {
        const { latitude, longitude } = response.data.result;
        return { lat: latitude, lng: longitude };
      } else {
        throw new Error("Postcode not found");
      }
    } catch (error) {
      console.error("Error converting postcode:", error);
      return { lat: 0, lng: 0 };
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { lat, lng } = await convertPostcodeToLatLng(postcode);

    await register({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      lat,
      lng,
    });

    // // Check if registration was successful and redirect
    // if (registerUser.fulfilled.match(resultAction)) {
    //   const response = resultAction.payload;
    //   if (response.success) {
    //     console.log("Registration successful!", response);
    //     navigate("/login"); // Redirect to the login page after successful registration
    //   }
    // } else {
    //   console.error("Registration failed:", resultAction.error.message);
    // }
  };

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="register-container">
      <form onSubmit={submitHandler}>
        <img src={logo} />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
