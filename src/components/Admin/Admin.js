import { Link } from "react-router-dom";
import { Users } from "../Users";
import './styles.scss'
export const Admin = () => {
  return (
    <section>
      <h1>Admin Page</h1>
        <br />
      <Users />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
