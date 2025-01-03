import { useEffect, useState, useRef } from "react";
import { USER_REGEX, PASSWORD_REGEX } from "../regExpValid";
import { UserValidation } from "./validation/User_Validation";
import { PasswordValidation } from "./validation/Password_Validation";
import { ConfirmPassword } from "./validation/Confirm_Password";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { REGISTER_URL } from "../api/urls";

export const Register = () => {
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMessage("");
  }, [user, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkUser = USER_REGEX.test(user);
    const checkPassword = PASSWORD_REGEX.test(password);
    if (!checkUser || !checkPassword) {
      setErrMessage("Invalid entry. Please try again.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);

      setSuccess(true);
      if(response.status === 201) {
        setErrMessage("User registered successfully");
        console.log("User registered successfully111");
      }
      setUser("");
      setPassword("");
      setMatchPassword("");
    } catch (error) {
      if (!error.response) {
        setErrMessage("No Server Response");
      } else if (error.response.status === 409) {
        setErrMessage("User already exists");
      } else {
        setErrMessage("Registration failed");
      }
      errRef.current.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Registered successfully</h1>
          <p>
            <Link to="/login">Sign in</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMessage ? "errMessage" : "offscreen"}
            aria-live="assertive"
          >
            {errMessage}
          </p>
          <h1> Register</h1>
          <form onSubmit={handleSubmit}>
            <UserValidation
              user={user}
              setUser={setUser}
              setUserFocus={setUserFocus}
              userFocus={userFocus}
              validName={validName}
            />
            <PasswordValidation
              password={password}
              setPassword={setPassword}
              setPasswordFocus={setPasswordFocus}
              passwordFocus={passwordFocus}
              validPassword={validPassword}
            />
            <ConfirmPassword
              matchPassword={matchPassword}
              setMatchPassword={setMatchPassword}
              setMatchFocus={setMatchFocus}
              matchFocus={matchFocus}
              validMatch={validMatch}
              validPassword={validPassword}
            />
            <button
              type="submit"
              disabled={!validName || !validPassword || !validMatch || loading}
            >
              {loading ? "Loading..." : "SignUp"}
            </button>
          </form>
          <p>
            Already registred? <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};
