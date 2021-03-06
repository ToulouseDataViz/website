import React from "react";
import Button from "../components/Button";
import HackavizSponsors from "../components/HackavizSponsors";

const isCurrent = (year) => year === new Date().getFullYear().toString();
const HackavizFooter = ({ year }) => (
  <div>
    <header class="major">
      <h2>{isCurrent(year)?"EDITIONS PRECEDENTES":"TOUTES LES EDITIONS"}</h2>
      <Button
        link={"/hackaviz/editions-precedentes"}
        type={"internal"}
        text={isCurrent(year)?"Afficher":"Afficher les éditions précédentes"}
      />
    </header>      
    
    <header class="major">
      <h2>PARTENAIRES DE L’EVENEMENT</h2>
      <HackavizSponsors currentHackaviz={year} />
    </header>
  </div>
);

export default HackavizFooter;
