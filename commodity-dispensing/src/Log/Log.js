import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import {
  Table,
  TableHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
  Divider
} from "@dhis2/ui";
import "./Log.css";

const logDataQuery = {
  "dataStoreData": {
    "resource": "dataStore/IN5320-G9/transactions"
  },
  "dataStoreDataOrders": {
    "resource": "dataStore/IN5320-G9/orders"
  }
}

export function Log(props) {

  const { error, loading, data } = useDataQuery(logDataQuery);

  if (data) {
    return (
      <div>
        <h1>Log</h1>
        <h2>Overview of completed transactions and orders</h2>
        <Divider />
        <h2>Transaction history</h2>
        <h4>View all your transactions</h4>
        <Table>
          <TableHead className="table-head">
            <TableCellHead className="table-head-column">
              Date
            </TableCellHead>
            <TableCellHead className="table-head-column">
              Time
            </TableCellHead>
            <TableCellHead className="table-head-column">
              Commodity
            </TableCellHead>
            <TableCellHead className="table-head-column">
              Amount
            </TableCellHead>
            <TableCellHead className="table-head-column">
              Dispensed by
            </TableCellHead>
            <TableCellHead className="table-head-column">
              Dispensed to
            </TableCellHead>
          </TableHead>
          <TableBody>
            {data.dataStoreData.transactions ? data.dataStoreData.transactions.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.commodity}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.dispensedBy}</TableCell>
                  <TableCell>{item.dispensedTo}</TableCell>
                </TableRow>
              )
            }) 
            : 
            <TableRow>
              <TableCell>No transactions</TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
        <h2 id="orderHistory">Order history</h2>
        <h4>View all your received orders</h4>
        <Table>
          <TableHead>
            <TableCellHead className="table-head-column">
              Date
            </TableCellHead>
            <TableCellHead className="table-head-column">
              Time
            </TableCellHead>
            <TableCellHead className="table-head-column">
              Commodity
            </TableCellHead>
            <TableCellHead className="table-head-column">
              Amount
            </TableCellHead>
          </TableHead>
          <TableBody>
            {data.dataStoreDataOrders.orders ? data.dataStoreDataOrders.orders.map((item, index) => {
              return (
                <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.commodity}</TableCell>
                <TableCell>{item.amount}</TableCell>
              </TableRow>
              );
            })
            : 
            <TableRow>
              <TableCell>No transactions</TableCell>
            </TableRow>}
          </TableBody>
        </Table>
      </div>
    );
  }
  else {
    return <p></p>
  }
}
