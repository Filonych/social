import React from "react";
import * as SC from "./styles";

export const MenuItem = ({ link, children }) => (
  <SC.MenuItem to={link}>
    {children}
  </SC.MenuItem>
);