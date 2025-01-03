import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export const UserValidation = ({user, setUser, setUserFocus, userFocus, validName}) => {
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor="username">
        Username:
        <span className={validName ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={validName || !user ? "hide" : "invalid"}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </label>
      <input
        type="text"
        id="username"
        name="username"
        ref={userRef}
        required
        autoComplete="off"
        onChange={(e) => setUser(e.target.value)}
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus(false)}
        aria-invalid={validName ? "false" : "true"}
        aria-describedby="uidnote"
      />
      <p
        id="uidnote"
        className={
          userFocus && user && !validName ? "instructions" : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        8 to 24 characters. <br />
        Must begin with a letter. <br />
        Letters, numbers, underscores, hyphens allowed.
      </p>
    </>
  );
};
