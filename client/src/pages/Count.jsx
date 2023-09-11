import React, { useEffect, useState } from "react";

const Count = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    alert("hello");
    return () => alert("bye");
  }, [count]);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
};

export default Count;
