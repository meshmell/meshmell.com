"use client";

import { useEffect } from "react";

const ConsoleMessage = () => {
  useEffect(() => {
    const message1 = "%cHellomell!!";
    const message2 = `Meshmell is an open source project. This site's git repo is here: ${process.env.NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}.`;

    const style1 = `
    background: linear-gradient(to right, violet, orange);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    font-size: 32px;
    font-weight: bold;
    padding: 2px 5px; /* Adjust padding as needed */
    margin: 2px 0; /* Adjust margin as needed */
  `;

    console.log(message1, style1);
    console.log(message2);
  }, []);

  return null;
};

export default ConsoleMessage;
