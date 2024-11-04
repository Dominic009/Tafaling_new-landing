import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  KeyboardEventHandler,
} from "react";
import "./search.css";
import { HiOutlineSearch } from "react-icons/hi";
import { ISearchUser } from "../TopNavbar/Navbar";
import { RxCross2 } from "react-icons/rx";

interface ISearchInput {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchedUsers: Dispatch<SetStateAction<ISearchUser[]>>;
  searchUserHandler: () => {};
  user: ISearchUser[];
  clearSearchParams?: () => void;
}

const SearchInput: React.FC<ISearchInput> = ({
  setInputValue,
  inputValue,
  searchUserHandler,
  user,
  setSearchedUsers,
  clearSearchParams,
}) => {
  const placeholderTexts = ["Search", "ex - John Doe"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchUserHandler();
    }
  };

  useEffect(() => {
    if (!isFocused && inputValue === "") {
      const intervalId = setInterval(() => {
        setFadeIn(false);
        setTimeout(() => {
          setPlaceholderIndex(
            (prevIndex) => (prevIndex + 1) % placeholderTexts.length
          );
          setFadeIn(true);
        }, 500); // Wait for fade-out before changing text
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [isFocused, inputValue, placeholderTexts.length]);

  if (isFocused === false) {
    // setSearchedUsers([]);
    // setInputValue("");
    clearSearchParams && clearSearchParams();
  }

  useEffect(() => {
    if (inputValue.length === 0) {
      setSearchedUsers([]);
      setInputValue("");
      clearSearchParams && clearSearchParams();
    }
  }, [inputValue.length]);

  return (
    <div className="hidden md:block relative lg:col-span-2">
      <input
        onChange={handleSearch}
        value={inputValue}
        type="text"
        className="outline-none pl-4 pr-10 py-2 rounded-xl bg-[#062139] text-white w-full border border-blue-500/20 focus-within:border focus-within:border-blue-500 custom-hover"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyUp={handleKeyUp}
      />
      {!isFocused && !inputValue && (
        <span
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-opacity duration-500 pointer-events-none ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {placeholderTexts[placeholderIndex]}
        </span>
      )}
      {user.length === 0 ? (
        <button onClick={searchUserHandler}>
          <HiOutlineSearch className="absolute top-2 right-3 text-gray-400 text-[25px] hover:text-gray-100 hover:scale-105 custom-hover active:scale-95 cursor-pointer" />
        </button>
      ) : (
        <button>
          <RxCross2
            onClick={() => {
              setSearchedUsers([]);
              setInputValue("");
              clearSearchParams && clearSearchParams();
            }}
            className="absolute top-2 right-3 text-gray-400 text-[25px] hover:text-gray-100 hover:scale-105 custom-hover active:scale-95 cursor-pointer"
          />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
