import axios from "../api/axios";
import { useAuth } from "./useAuth";
export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    const response = await axios.get(
      "/refresh",
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      console.log("prev", JSON.stringify(prev));
      console.log("response data", response.data);
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };
  return refreshToken;
};

export default useRefreshToken;
