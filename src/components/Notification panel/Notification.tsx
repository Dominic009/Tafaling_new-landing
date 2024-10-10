import React from "react";
import { FaRegBell } from "react-icons/fa6";
import DropDownMenu from "../Drop down menu/DropDownMenu";

const Notification = () => {
  const [dropdown, setDropdown] = React.useState<boolean>(false);

  return (
    <div>
      <button
        className="h-full flex items-center justify-center relative"
        onClick={() => setDropdown(!dropdown)}
      >
        <FaRegBell className="text-2xl text-white hover:text-white hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out" />
        <div className="absolute top-0 -right-2 bg-[#D6042A] text-center rounded-full w-5 h-5 text-white text-sm">
          5
        </div>
      </button>

      {dropdown && (
        <DropDownMenu bg="[#0d1f31]" top="13" right="5">
          Coming soon..!{" "}
        </DropDownMenu>
      )}
    </div>
  );
};

export default Notification;
