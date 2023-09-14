import React from "react";
import { useState } from "react";

import {
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Input,
  CircularLoader,
  Divider,
  Layer,
} from "@dhis2/ui";

import "./Storage.css";
import { NextDelivery } from "../Time/NextDelivery";
import { fetchDate } from "../Time/TimeFunctions";

export function Storage(props) {
  const commodities = props.commodities;
  const [filterValue, setFilterValue] = useState("");

  if (!commodities) {
    return (
      <Layer>
        <CircularLoader large />
      </Layer>
    );
  } else {
    const commoditiesDisplay = [];

    for (let value of commodities.values()) {
      if (value.displayName.toLowerCase().includes(filterValue.toLowerCase())) {
        commoditiesDisplay.push(value);
      }
    }

    function setFilter(e) {
      setFilterValue(e);
    }

    return (
      <div className="content">
        <header id="dateline">
          <div id="today">Todays date: {fetchDate()}</div>
          <div id="nextdelivery">{NextDelivery()}</div>
          <div id="daysuntil">Days until next delivery: 23</div>
        </header>
        <h1>Storage</h1>
        <h2>Overview of commodities currently in storage</h2>
        <Divider/>
        <Box height="fit-content">
          <Input
            className="searchField"
            placeholder="Search commodities by name"
            type="text"
            value={filterValue}
            onChange={(e) => setFilter(e.value)}
          ></Input>
        </Box>
        <Box>
          <Table >
            <TableHead>
              <TableRowHead className="table-header">
                <TableCellHead className="commodity-header">
                  Commodity
                </TableCellHead>
                <TableCellHead className="stock-balance">
                  Consumption
                </TableCellHead>
                <TableCellHead className="stock-balance">
                  Stock Balance
                </TableCellHead>
              </TableRowHead>
            </TableHead>
            <TableBody className="table-body">
              {commoditiesDisplay.map((row, index) => {
                return (
                  <TableRow key = {index}>
                    <TableCell bordered id="comName" className="commodity-value">
                      {row.displayName.replace("Commodities - ", "")}
                    </TableCell>
                    <TableCell className="stock-value" bordered>
                      {row.consumption.value}
                    </TableCell>
                    <TableCell className="stock-value" bordered>
                      {row.endBalance.value}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </div>
    );
  }
}
