import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export const ConfirmPassword = ({
  matchPassword,
  setMatchPassword,
  setMatchFocus,
  matchFocus,
  validMatch,
  validPassword,
}) => {
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor="confirm_password">
        Confirm Password:
        <span className={validMatch && validPassword ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </label>
      <input
        type="password"
        id="confirm_password"
        ref={userRef}
        required
        autoComplete="off"
        onChange={(e) => setMatchPassword(e.target.value)}
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}
        aria-invalid={matchPassword ? "false" : "true"}
        aria-describedby="confirmnote"
      />
      <p id="confirmnote" className={matchFocus ? "instructions" : "offscreen"}>
        <FontAwesomeIcon icon={faInfoCircle} />
        Must match the password above.
      </p>
    </>
  );
};
