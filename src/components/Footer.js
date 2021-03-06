import React from "react";

import {
  discordLink,
  gitHubLink,
  mailLink,
  twitterLink,
  youtubeLink,
  meetupLink
} from "../settings";

import { IconContext } from "react-icons";
import {
  FaDiscord,
  FaGithub,
  FaMeetup,
  FaEnvelope,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => (
  <footer id="footer">
    <div className="inner">
      <section>
        <IconContext.Provider value={{ size: "1.5em" }}>
          <ul className="icons">
            <li>
              <a
                href={twitterLink}
                className="icon"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
            </li>
            <li>
              <a
                href={gitHubLink}
                className="icon"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
            </li>
            <li>
              <a
                href={youtubeLink}
                className="icon"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>
            </li>
            <li>
              <a
                href={discordLink}
                className="icon"
                target="_blank"
                rel="noreferrer"
              >
                <FaDiscord />
              </a>
            </li>
            <li>
              <a
                href={meetupLink}
                className="icon"
                target="_blank"
                rel="noreferrer"
              >
                <FaMeetup />
              </a>
            </li>
            <li>
              <a
                href={mailLink}
                className="icon"
                target="_blank"
                rel="noreferrer"
              >
                <FaEnvelope />
              </a>
            </li>
          </ul>
        </IconContext.Provider>
        <ul className="copyright">
          <li>
            Design: <a href="https://html5up.net">HTML5 UP</a>
          </li>
          <li>
            Template Gatsby:{" "}
            <a href="https://www.gatsbyjs.com/starters/codebushi/gatsby-starter-forty">
              Forty
            </a>
          </li>
        </ul>
      </section>
    </div>
  </footer>
);

export default Footer;
