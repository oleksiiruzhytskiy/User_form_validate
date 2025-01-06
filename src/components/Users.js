import { useState, useEffect } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useRefreshToken } from "../hooks/useRefreshToken";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const refreshToken = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {signal});
        if (isMounted) {
          setUsers(response.data);
        }
      } catch (error) {
        if (error.name) {
          console.log("Error fetching users:", error); // Handle errors that aren't cancellations
        }
      }
    };

    getUsers();
    return () => {
      isMounted = false; // Cleanup
      controller.abort(); // Abort the request if the component is unmounted
    };
  }, []); // Empty dependency array ensures effect runs only once when the component mounts

  return (
    <article>
      <h1>Users List :</h1>
      {users?.length > 0 ? (
        <ol>
          {users.map((user, i) => (
            <li key={i}>{user?.name}</li>
          ))}
        </ol>
      ) : (
        <p>No users to display</p>
      )}
      <button onClick={refreshToken}>Refresh Token</button>
    </article>
  );
};

export default Users;
