import {useState, useEffect} from "react";
import axios from "../api/axios";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect
    (() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;
        const getUsers = async () => {
            try {
                const response = await axios.get("/users", { signal });
                console.log(response.data);
                if (isMounted) {
                    setUsers(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);
  return (
    <article>
      <h1>Users List</h1>
      {users?.lenght ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
