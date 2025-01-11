import React from "react";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>GHALASS 2025</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits">
          Designed by{" "}
          <a target="_blank" href="https://ghalass.com/">
            Ghalass
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
