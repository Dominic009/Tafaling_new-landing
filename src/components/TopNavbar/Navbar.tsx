"use client";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiOutlineSearch } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import "animate.css";
import { FaUserCircle } from "react-icons/fa";
import AuthUserNavMenu from "./AuthUserNavMenu";
import PrimaryBtn from "../PrimaryBtn";
import { IoMdLogIn } from "react-icons/io";
import SearchInput from "../Search Input/SearchInput";
import { searchUser } from "@/api/user/user";
import { getAccessToken } from "@/helpers/tokenStorage";
import IndividualSearchUser from "./UserSearch/IndividualSearchUser";
import PreviewModal from "../Modal/PreviewModal";

export interface ISearchUser {
  userId: number;
  userName: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  profilePicture: string;
  coverPhoto: string;
  gender: string | null;
  registrationDate: string | null;
  countryId: number | null;
  PrivacySettingId: number | null;
  name: string;
  following: number;
  followers: number;
  isFollowing: boolean;
}

const Navbar: React.FC = () => {
  // const [dropdown, setDropdown] = React.useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<ISearchUser[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [isShowingSearchResults, setIsShowingSearchResults] =
    useState<boolean>(false);

  //filters for user search
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue === "") {
      setIsSearchLoading(false);
      setIsShowingSearchResults(false);
    }
  }, [inputValue]);

  const currentPath = usePathname();
  const { user, isAuthLoading } = useAuth();

  const routes = [
    {
      name: "Home",
      path: "/home",
      icon: (
        <TiHome
          title="Home"
          className="text-3xl hover:text-white custom-hover"
        />
      ),
    },
    {
      name: "Profile",
      path: `/user-profile/${user?.userId}`,
      icon: (
        <FaUserCircle
          title="Profile"
          className="text-2xl mb-1 hover:text-white custom-hover"
        />
      ),
    },
    {
      name: "Requests",
      path: "/requests",
      icon: (
        <BsFillPeopleFill
          title="Requests"
          className="text-2xl hover:text-white custom-hover"
        />
      ),
    },
  ];

  if (
    currentPath === "/login" ||
    currentPath === "/register" ||
    currentPath === "/verifyEmail"
  ) {
    return null; // Do not render the Navbar on these paths
  }

  const searchUserHandler = async () => {
    if (inputValue.length < 3) return;
    setIsSearchLoading(true);
    setIsShowingSearchResults(true);
    try {
      setSearchedUsers([]);
      const res = await searchUser(
        inputValue,
        0,
        5,
        getAccessToken(),
        user?.userId as number
      );

      res.status === 200 && setIsSearchLoading(false);
      res.status === 200 && setIsShowingSearchResults(true);

      setSearchedUsers(res.data.data);
    } catch (error) {
      setIsSearchLoading(false);
      console.log(error);
    }
  };

  return (
    <nav className="md:h-[70px] grid grid-cols-2 md:grid-cols-3 gap-5 bg-gradient-to-r from-secondary to-[#012349] items-center px-1 py- md:px-5 w-full custom-hover">
      {/* Left Section */}
      <div className="w-[60%] md:w-full flex items-center mt-2 md:mt-0">
        <Link href={"/home"}>
          <Image
            src={"/Tafaling logo.png"}
            width={130}
            height={55}
            alt="Brand logo"
            className=""
          ></Image>
        </Link>
      </div>

      {/* Middle Section Navlinks*/}
      <div className="hidden md:block">
        <div className="flex gap-9 items-center justify-center">
          {routes.map((path) => {
            const isActive = path.path === currentPath;
            return (
              <Link
                href={path.path}
                key={path.name}
                className={`${
                  isActive
                    ? "text-white border-b-2 border-[#42C6DE]"
                    : "text-white/50"
                }`}
              >
                <span>{path.icon}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Section */}
      <div className={`relative ${user ? "flex justify-end" : "grid-cols-2"}`}>
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 ${
            !user && "flex"
          } items-center gap-5`}
        >
          {/* Search field */}
          <div className="hidden md:block relative lg:col-span-3">
            <SearchInput
              setInputValue={setInputValue}
              inputValue={inputValue}
              searchUserHandler={searchUserHandler}
              user={searchedUsers}
              setSearchedUsers={setSearchedUsers}
              setIsShowingSearchResults={setIsShowingSearchResults}
            />

            <div className="absolute top-12 -right-5 flex flex-col">
              {isShowingSearchResults && (
                <div className="bg-gray-200/90 backdrop-blur-lg rounded-lg py-3 text-center w-[400px] shadow-lg">
                  {searchedUsers.map((item, i) => (
                    <IndividualSearchUser
                      key={i}
                      user={item}
                      forNavBar={true}
                      setIsShowingSearchResults={setIsShowingSearchResults}
                    />
                  ))}

                  {isSearchLoading && (
                    <div className="z-50 flex">
                      <div className="grid lg:grid-cols-6 gap-1 items-center justify-center mb-2 py-1 px-3 bg-gray-50 rounded-lg drop-shadow w-[90%] mx-auto scale-75 animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center"></div>

                        <div className="col-span-3 text-left">
                          <div className="h-5 bg-gray-300 rounded w-3/4 mb-1"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>

                        <div className="col-span-2 flex justify-end">
                          <div className="h-8 bg-gray-300 rounded w-24"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <>
                    {isShowingSearchResults &&
                      !isSearchLoading &&
                      searchedUsers.length === 0 && (
                        <>
                          {!user ? (
                            <h1 className="col-span-6 text-center text-gray-500 font-semibold">
                              Please log in first...!
                            </h1>
                          ) : (
                            <h1 className="col-span-6 text-center text-gray-500 font-semibold">
                              No results found!
                            </h1>
                          )}
                          <Link
                            onClick={() => {
                              setSearchedUsers([]);
                              setInputValue("");
                            }}
                            href={{
                              pathname: `/search-more-users`,
                              query: { userSearch: inputValue },
                            }}
                          >
                            {searchedUsers.length !== 0 && (
                              <span className="text-gray-400 hover:text-gray-700 custom-hover font-semibold">
                                More results
                              </span>
                            )}
                          </Link>
                        </>
                      )}
                  </>
                  {searchedUsers.length !== 0 && (
                    <Link
                      onClick={() => {
                        setSearchedUsers([]);
                        setInputValue("");
                      }}
                      href={{
                        pathname: `/search-more-users`,
                        query: { userSearch: inputValue },
                      }}
                    >
                      <span className="text-gray-400 hover:text-gray-700 custom-hover font-semibold">
                        More results
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
          <Link
            href={"/search-more-users"}
            className="flex justify-end md:hidden"
          >
            <HiOutlineSearch className="text-gray-100 text-2xl md:text-3xl cursor-pointer" />
          </Link>

          <div>
            {user?.user_name && <AuthUserNavMenu />}
            {!user?.user_name && !isAuthLoading && (
              <Link href={`login`} className="w-full">
                <PrimaryBtn
                  text="Login"
                  width="100%"
                  disabled={false}
                  icon={IoMdLogIn}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
