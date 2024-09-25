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
