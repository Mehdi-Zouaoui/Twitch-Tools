import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faEnvelope,
  faChartBar,
  faSignOutAlt,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const Sidebar = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  console.log("user", user);
  return (
    user && (
      <div className="my-auto text-white h-[95vh]  rounded-bl-lg rounded-tl-lg h-7/8  bg-dark flex flex-col  items-start" style={{width:"13%"}}>
       
        <div className="flex justify-around items-center flex-col h-1/4 w-full">
          <div className="flex w-full mt-4 items-center justify-start">
            <Image
              className="locationsImage"
              alt=""
              width="100"
              height="50"
              src={"/logo_mehdi.svg"}
            />
            <h2 className="text-lg font-semibold  text-white">Twools</h2>
          </div>
          <div className="flex flex-col justify-around items-start  w-full h-4/6">
            <div className="flex justify-start w-full ml-7 ">
              <img className="w-10 h-10  rounded-full" src={user.picture} />

              <div className="flex flex-col ml-4">
                <p className="font-semibold ">
                  {user.given_name || user.nickname}
                </p>
                <p>{user.nickname}</p>
              </div>
            </div>
            <div className="flex justify-around  ml-10">
              <FontAwesomeIcon icon={faUser} />
              <p className="ml-4"> Mon Profil</p>
            </div>
          </div>
          <div className="bg-neutral-50 w-full h-px" />
        </div>

        <ul className="flex justify-around items-start  flex-col h-2/4 w-full">
          <li className="w-full">
            <Link href="/administration">
              <a className="flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} />
                {/* <p>Home</p> */}
              </a>
            </Link>
          </li>
          <li className="w-full">
            <Link href="/tools">
              <a className="flex items-center justify-center">
                <FontAwesomeIcon icon={faDatabase} />
                {/* <p>Twools</p> */}
              </a>
            </Link>
          </li>
          <li className="w-full">
            <Link href="/tools">
              <a className="flex items-center justify-center">
                <FontAwesomeIcon icon={faChartBar} />
                {/* <p>Stats</p> */}
              </a>
            </Link>
          </li>
          <li className="w-full">
            <Link href="/tools">
              <a className="flex items-center justify-center">
                <FontAwesomeIcon icon={faEnvelope} />
                {/* <p>Contact</p> */}
              </a>
            </Link>
          </li>
          <li className="w-full">
            <Link href="/tools">
              <a className="text-gold flex items-center justify-center">
                <FontAwesomeIcon icon={faCrown} />
              </a>
            </Link>
          </li>
        </ul>
        <div className="mt-auto self-center h-20">
          <a href="/api/auth/logout" className="logout">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </a>
        </div>
      </div>
    )
  );
};
export default Sidebar;
