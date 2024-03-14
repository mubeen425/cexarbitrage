import React from "react";

const FooterLinks = ({ name, links }) => {
  return (
    <div>
      <h2 className="mb-6 text-sm font-semibold text-white uppercase">
        {name}
      </h2>
      <ul className="text-gray-400 font-medium">
        {links &&
          links.map((link, index) => (
            <li className="mb-4" key={index}>
              <a href={link.href} className="hover:underline">
                {link.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
