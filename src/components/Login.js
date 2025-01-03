import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { LOGIN_URL } from "../api/urls";
import axios from "../api/axios";

export const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMessage("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, password);
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = response.data.accessToken;
      console.log('data', response.data);
      setAuth({ user, password, accessToken });
      setUser("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if(!error.response) {
        setErrMessage("Server error");
      } else if(error.response.status === 400) {
        setErrMessage("Missing username or password");
      } else if (error.response.status === 401) {
        setErrMessage("Unauthorized");
      } else {
        setErrMessage("Login Failed");
      }
      errRef.current.focus();
    }
  };
  useEffect(() => {
    console.log("Auth state updated:", auth);
  }, [auth]);
  return (
    <>
      {success ? (
        <section>
          <h1>Home</h1>
          <br />
          <p>Logged in successfully!</p>
          <br />
          <Link to="/admin">Go to the Admin page</Link>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMessage ? "errMessage" : "offscreen"}>
            {errMessage}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="user">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              ref={userRef}
              value={user}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>Sign In</button>
          </form>
          <p className="login-container">
            Don`t you have an account? <br />
            <Link to="/">Sign Up</Link>
          </p>
        </section>
      )}
    </>
  );
};
