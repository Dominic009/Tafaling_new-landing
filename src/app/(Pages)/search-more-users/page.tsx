/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { searchUser } from "@/api/user/user";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import SearchInput from "@/components/Search Input/SearchInput";
import { ISearchUser } from "@/components/TopNavbar/Navbar";
import IndividualSearchUser from "@/components/TopNavbar/UserSearch/IndividualSearchUser";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { getAccessToken } from "@/helpers/tokenStorage";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page: React.FC = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const userSearch = searchParams.get("userSearch");
  //filters for user search
  const [inputValue, setInputValue] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<ISearchUser[]>([]);
  const [isSearchUserLoading, setIsSearchUserLoading] =
    useState<boolean>(false);
  const router = useRouter();

  const clearSearchParams = () => {
    // Construct a new URL without search parameters
    const currentPath = window.location.pathname;
    router.replace(currentPath, { scroll: false });
  };

  const searchUserHandler = async () => {
    if (inputValue!.length < 3) return;
    try {
      setSearchedUsers([]);
      setIsSearchUserLoading(true);
      const res = await searchUser(
        inputValue!,
        0,
        5,
        getAccessToken(),
        user?.userId as number
      );
      setSearchedUsers(res.data.data);
    } catch (error) {
      console.log(error);
      setIsSearchUserLoading(false);
    }

    setIsSearchUserLoading(false);
  };

  useEffect(() => {
    userSearch && setInputValue(userSearch);

    const fetchSearchUsers = async () => {
      try {
        setSearchedUsers([]);
        setIsSearchUserLoading(true);
        const res = await searchUser(
          userSearch as string,
          0,
          5,
          getAccessToken(),
          user?.userId as number
        );
        setSearchedUsers(res.data.data);
      } catch (error) {
        setIsSearchUserLoading(false);
        console.log(error);
      }
      setIsSearchUserLoading(false);
    };

    userSearch && userSearch?.length > 0 && fetchSearchUsers();
    // console.log(userSearch)
  }, [userSearch, user]);

  console.log(searchedUsers.length);

  return (
    <div className="h-[80vh] w-[95%] md:w-[80%] lg:w-1/2 mx-auto py-6">
      {/* search box */}
      <SearchInput
        setInputValue={setInputValue}
        inputValue={inputValue!}
        searchUserHandler={searchUserHandler}
        user={searchedUsers}
        setSearchedUsers={setSearchedUsers}
        clearSearchParams={clearSearchParams}
      />
      {inputValue && searchedUsers?.length > 0 && (
        <small className="ml-4 text-gray-500 flex items-center gap-1">
          <span className="font-semibold text-lg">
            &quot;{searchedUsers?.length > 0 ? searchedUsers.length : ""}&quot;{" "}
          </span>
          <span className="text-lg">
            {" "}
            {searchedUsers.length === 1 ? "Result" : "Results"} found
          </span>
        </small>
      )}
      <hr className="mt-5" />

      {/* searched users */}
      <div className="py-6">
        {inputValue && (
          <>
            {" "}
            {searchedUsers.map((item, i) => (
              <IndividualSearchUser user={item} key={i} />
            ))}
          </>
        )}

        <div
          className={`${
            !isSearchUserLoading && "py-9"
          } text-3xl font-semibold text-[#07a1bc] text-center`}
        >
          {!inputValue ? (
            <div>
              <h1>Nothing searched yet..!</h1>
            </div>
          ) : (
            <>
              {" "}
              {!isSearchUserLoading && searchedUsers.length === 0 && (
                <h1>No results found!</h1>
              )}
            </>
          )}
        </div>

        {isSearchUserLoading && (
          <div className="grid grid-cols-4 items-center justify-center mb-2 bg-gray-50 rounded-lg px-2 py-2 drop-shadow scale-90 lg:w-[70%] mx-auto animate-pulse">
            <div className="w-20 h-20 rounded-full bg-gray-200"></div>

            <div className="col-span-2 text-left -ml-3 space-y-1">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            <div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        )}

        {/* {!isSearchUserLoading && searchedUsers.length === 0 && (
          <div>Search users... </div>
        )} */}

        {/* {!isSearchUserLoading && <ActionButton text='see more' />} */}
      </div>
    </div>
  );
};

export default PrivateRoute(page);
