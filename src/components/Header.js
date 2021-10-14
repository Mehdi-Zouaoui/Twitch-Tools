import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

const Header = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div className="header">
        <img src={user.picture} alt={user.name} />
       
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
};

export default Header;
