import React, { useState } from "react";

const ServerTime = () => {
  const [serverTime, setServerTime] = useState();
  const [timeDifference, setTimeDifference] = useState();

  return (
    <div>
      <h1>Server Time: </h1>
      <div>Data</div>
    </div>
  );
};

export default ServerTime;
