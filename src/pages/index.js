import Head from "next/head";
import { useForm } from "react-hook-form";
import { useUser } from "@auth0/nextjs-auth0";
import Router from "next/router";

import axios from "axios";

export default function Home({ usersData }) {
  const { user, error, isLoading } = useUser();
  const url = "http://localhost:3000";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    console.log(usersData, user);

    let test = usersData.find((item) => item.userId === user.sub);

    if (test) console.log("reussis");
    else {
      axios
        .post(url + "/api/user", user)
        .then((res) => {
          console.log("back", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    Router.push("/administration");
  }
  return <a href="/api/auth/login">Login</a>;
}

export const getStaticProps = async () => {
  const users = await fetch("http://localhost:3000/api/user");
  const usersJSON = await users.json();

  return {
    props: {
      usersData: usersJSON,
    },
  };
};
