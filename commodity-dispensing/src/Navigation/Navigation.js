import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";
import "./Navigation.css";

export function Navigation(props) {

  return (
    <Menu className="menu">
      <MenuItem
        className="menuItem"
        label="Storage"
        active={props.activePage == "Storage"}
        onClick={() => props.activePageHandler("Storage")}
        
      />
      <MenuItem
        className="menuItem"
        label="Log"
        active={props.activePage == "Log"}
        onClick={() => props.activePageHandler("Log")}
      />
      <MenuItem
        className="menuItem"
        label="Order"
        active={props.activePage == "Order"}
        onClick={() => props.activePageHandler("Order")}
      />
      <MenuItem
        className="menuItem"
        label="Transactions"
        active={props.activePage == "Transactions"}
        onClick={() => props.activePageHandler("Transactions")}
      />
    </Menu>
  );
}
