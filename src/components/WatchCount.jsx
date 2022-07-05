import { useState } from "react";
import { useEffect } from "react";
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return <div> You have used {count} seconds on this website</div>;
}

export default WatchCount;
