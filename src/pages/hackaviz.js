import React from "react";

import useHackaviz from "../hooks/useHackaviz";

const Hackaviz = () => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  const isCurrent = (year) => year === currentYear.toString();
  const hackavizs = useHackaviz();

  let redirectUrl = "/";
  const currentHackaviz = hackavizs.filter((item) => isCurrent(item.hackaviz));
  if (currentHackaviz.length > 0) {
    const subPage =
      currentHackaviz[0].status === "Réalisé" ? "results" : "contest";
    redirectUrl = `/hackaviz/${currentYear}-${subPage}`;
  } else {
    redirectUrl = `/hackaviz/${previousYear}-results`;
  }

  if (typeof window !== `undefined`) { 
    window.location.href = redirectUrl;
  }
 
  return <div />;
};
export default Hackaviz;
