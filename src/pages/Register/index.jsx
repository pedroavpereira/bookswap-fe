import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { registerUser } from "../../redux/actions/userActions";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postcode, setPostcode] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.user);
  const { loading, error, userInfo } = userRegister;

  // Function to convert postcode to lat and lng using Postcodes.io API
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
      return { lat: 0, lng: 0 }; // Default values if there's an error
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { lat, lng } = await convertPostcodeToLatLng(postcode); // Convert postcode asynchronously
    dispatch(
      registerUser({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        lat,
        lng,
      })
    );
  };

  // UseEffect to log a message when registration is successful
  useEffect(() => {
    if (userInfo) {
      console.log("Registration successful!", userInfo);
    }
  }, [userInfo]);

  return (
    <div>
      <form onSubmit={submitHandler}>
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
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userInfo && <p>Registration successful!</p>}
    </div>
  );
};

export default Register;
