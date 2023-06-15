import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../Firebase/Firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        fetch("http://localhost:5000/", {
          method: "POST",
          headers: {
            "Content-Typer": "Application/json",
          },
          body: JSON.stringify({ email: currentUser.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("access-token", data?.token);
          });
      }
      console.log(currentUser);
    });

    return () => unsubscribed();
  }, []);

  const authInfo = {
    user,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
