import React from "react";
import { formatDistanceToNow } from "date-fns";

interface PostTimeConverterProps {
  time: string;
}

const PostTimeConverter: React.FC<PostTimeConverterProps> = ({ time }) => {
  return (
    <div>
      {formatDistanceToNow(new Date(time), { addSuffix: true })
        .replace("in", "")
        .replace("about", "")
        .replace(" ago", "") + " ago"}
    </div>
  );
};

export default PostTimeConverter;

// import React from "react";
// import { formatDistanceToNow } from "date-fns";
// import { formatInTimeZone } from "date-fns-tz";

// interface PostTimeConverterProps {
//   time: string;
// }

// const PostTimeConverter: React.FC<PostTimeConverterProps> = ({ time }) => {
//   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the local timezone

//   // Convert the provided time string to the local timezone and format
//   const localTime = formatInTimeZone(
//     new Date(time),
//     timeZone,
//     "yyyy-MM-dd HH:mm:ss"
//   );
//   console.log(localTime)

//   // Format the relative time using formatDistanceToNow
//   const formattedTime = formatDistanceToNow(new Date(localTime), {
//     addSuffix: true,
//   });
// console.log(formattedTime)
//   // Clean up the output (optional)
//   const cleanedTime = formattedTime
//     .replace(/^in\s/, "") 
//     .replace(/^about\s/, "") 
//     .replace(/\s+ago$/, " ago"); 

//   return <div>{cleanedTime}</div>;
// };

// export default PostTimeConverter;
