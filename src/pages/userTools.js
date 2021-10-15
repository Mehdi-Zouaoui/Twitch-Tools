import { useState , useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

const userTools = ({ sondages }) => {
  const { user } = useUser();
  const [userSondages, setUserSondages] = useState([]);

//   useEffect(() => {
//     sondages.forEach(item =>{
//         if (user.sub === item.author) {
//            setUserSondages(old => [...old , item])
//           }
//     })
//   },[])
  console.log("sondages", user);
  return <div>userTools</div>;
};

export default userTools;

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/sondage");
  const data = await res.json();

  return {
    props: {
      sondages: data,
    },
  };
};
