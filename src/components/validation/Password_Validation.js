import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export const PasswordValidation = ({
  password,
  setPassword,
  setPasswordFocus,
  passwordFocus,
  validPassword,
}) => {
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor="password">
        Password:
        <span className={validPassword ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={validPassword || !password ? "hide" : "invalid"}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </label>
      <input
        type="password"
        id="password"
        name="password"
        ref={userRef}
        required
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setPasswordFocus(true)}
        onBlur={() => setPasswordFocus(false)}
        aria-invalid={validPassword ? "false" : "true"}
        aria-describedby="uidnote"
      />
      <p
        id="passwordnote"
        className={
          passwordFocus && password && !validPassword
            ? "instructions"
            : "offscreen" 
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        8 to 24 characters. <br />
        Must include uppercase and lowercase letters, a number snd special
        character. <br />
        Allowed special characters:
        <span aria-label="explanation mark">!</span>
        <span aria-label="at symbol">@</span>
        <span aria-label="hash tag">#</span>
        <span aria-label="dollar sign">$</span>
        <span aria-label="percent">%</span>
      </p>
    </>
  );
};
