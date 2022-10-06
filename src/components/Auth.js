import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import { fetchUserTokens } from "../auth";
import { fetchMe } from "../api";
import UserContext from "../UserContext";

function Auth() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    async function login(code) {
      try {
        const tokens = await fetchUserTokens(
          code,
          window.location.origin + "/auth"
        );
        const username = await fetchMe();
        localStorage.setItem("username", username);
        localStorage.setItem("refresh_token", tokens.refreshToken);
        setUser(username);
      } catch (error) {
        console.log("error", error);
      }
    }

    // handle oauth redirect
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const state = JSON.parse(params.get("state"));
    const code = params.get("code");
    const threadId = state?.threadId;

    if (code) {
      login(code);
    }

    if (threadId) navigate(`/comments/${threadId}`);
    else navigate("/");
  }, []);

  return <Home />;
}

export default Auth;
