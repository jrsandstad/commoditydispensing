import {
  Table,
  TableBody,
  TableHead,
  TableRowHead,
  TableRow,
  TableCell,
  TableCellHead,
  Button,
  Divider,
  Box,
  CircularLoader,
  SingleSelect,
  SingleSelectOption,
  Input,
} from "@dhis2/ui";
import React, { useState } from "react";
import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";
import { ConfirmationPopup } from "../SharedComponents/ConfirmationPopup";
import { EditOrder } from "./EditOrder";
import "./Order.css";
import { ORG_UNITS, DATA_SETS, PERIODS, CATEGORY_OPTION_COMBOS } from "../Api/api";
import { fetchDate, fetchTime } from "../Time/TimeFunctions";
import { OrderTableRow } from "./OrderTableRow";
import { NextDelivery } from "../Time/NextDelivery";

const CURRENT_DATE = fetchDate();
const TIMESTAMP = fetchTime();

const updateCommodityQuery = {
  resource: "dataValueSets",
  type: "create",
  data: ({ dataValues }) => ({
    orgUnit: ORG_UNITS.Faabu_CHP,
    dataSet: DATA_SETS.LifeSavingCommodities,
    period: PERIODS.October,
    dataValues: dataValues,
  }),
};


export function Order(props) {
  // Data state
  const [selectedCommodity, setSelectedCommodity] = useState(undefined);
  const [orderAmount, setOrderAmount] = useState(undefined);
  const [orderList, setOrderList] = useState([]);

  // Display state
  const [displayConfirmationPopup, setDisplayConfirmationPopup] =
    useState(false);
  const [displayEditOrder, setDisplayEditOrder] = useState(false);

  //const { loading, error, data } = useDataQuery(getAllCommoditiesQuery);
  const commodities = props.commodities;
  const [mutate] = useDataMutation(updateCommodityQuery);
  const [currListIndex, setCurrListIndex] = useState(0);

  
  function onSubmit() {
    let newDataValues = [];

    for (let i = 0; i < orderList.length; i++) {
      newDataValues.push({
        dataElement: orderList[i].id,
        categoryOptionCombo: CATEGORY_OPTION_COMBOS.EndBalance,
        value: parseInt(orderList[i].endBalance.value) + parseInt(orderList[i].amount)
      });
    }    
    
    mutate({
      dataValues: newDataValues
    }) 

  }

  const clickDisplayEditOrder = (val, index) => {
    setDisplayEditOrder(val);
  };

  const addToOrder = () => {
    // Add a new order to the list
    const orderItem = selectedCommodity
    orderItem.amount = parseInt(orderAmount);
    setOrderList([
      ...orderList,
      orderItem,
    ]);
    setSelectedCommodity(null);
    setOrderAmount(null);
    props.setEdited(true);

    console.log(orderList);
  };


  // Order history handling 
  const orderHistoryQuery = {
    "dataStoreData": {
      "resource": "dataStore/IN5320-G9/orders"
    }
  }
  const {error, loading, data} = useDataQuery(orderHistoryQuery);

  const dataMutationQuery = {
    resource: "dataStore/IN5320-G9/orders",
    type: "update",
    data: ({ orders }) => ({
      orders
    }),
  }
  
  const[mutateOrder] = useDataMutation(dataMutationQuery);

  const sendOrderClick = () => {
    setDisplayConfirmationPopup(true);
  }

  const sendOrder = () => {
    let newOrderList = [];
    let orderHistory = data.dataStoreData.orders;

    if (orderHistory) {
      for (let i = 0; i < orderHistory.length; i++) {
        newOrderList.push(orderHistory[i]);
      }
    }

    //Add from list of orders 
    for (let i = 0; i < orderList.length; i++) {
      newOrderList.unshift({
        "date" : CURRENT_DATE,
        "time" : TIMESTAMP,
        "commodity" : orderList[i].displayName.replace("Commodities - ", ""),
        "amount" : orderList[i].amount
      });
    }
    
    mutateOrder({
      orders: newOrderList,
    });

    onSubmit();
    setDisplayConfirmationPopup(false);
    props.setEdited(false);
    setOrderList([]);
  };

  if (!commodities) {
    return <CircularLoader large />;
  }

  if (commodities) {
    return (
      <div>
        <header id="dateline">
          <div id="today">Todays date: {fetchDate()}</div>
          <div id="nextdelivery">{NextDelivery()}</div>
          <div id="daysuntil">Days until next delivery: 23</div>
        </header>
        <Box>
          <h1>Order</h1>
          <h2>Register received orders</h2>
          <Divider />
        </Box>
        {displayConfirmationPopup && (
          <ConfirmationPopup
            titleText={"Order confirmation"}
            updateState={setDisplayConfirmationPopup}
            mainText={"Are you sure you want to send this order?"}
            confirm={sendOrder}
          />
        )}
        {displayEditOrder && (
          <EditOrder
            showEditOrderModal={setDisplayEditOrder}
            currListIndex={currListIndex}
            orderList={orderList}
            setOrderAmount={setOrderAmount}
            setEdited={props.setEdited}
          />
        )}
        
        <h4>Registering received order(s) will update your order history</h4>
        <Box className="new-order">
          <SingleSelect
            selected={selectedCommodity ? selectedCommodity.id : ""}
            className="order-dropdown"
            filterable
            noMatchText="No match found"
            placeholder="Commodity"
            onChange={(e) => {
              setSelectedCommodity(commodities.get(e.selected));
            }}>
            {Array.from(commodities, ([key, value]) => value)
            .filter(el => !orderList.map(e => e.id).includes(el.id))
            .map(el => {
              return (
                <SingleSelectOption
                  label={el.displayName.replace("Commodities - ", "")}
                  value={el.id}
                  key={el.id}
                />
              );
            })}
          </SingleSelect>
          <Input
            className="order-number-input"
            placeholder="Amount"
            type="number"
            min="0"
            value={orderAmount > 0 ? orderAmount : ""}
            onChange={(e) => setOrderAmount(e.value)}
          />
          <Button
            className="orderAdd"
            name="Secondary button"
            secondary
            value="default"
            onClick={addToOrder}
            disabled={
              orderAmount > 0 && selectedCommodity != null ? false : true
            }>
            Add commodity
          </Button>
        </Box>
        <Box>
          <div>
            <h2>Current order registration</h2>
            <Table>
              <TableHead>
                <TableRowHead className="orderHeader">
                  <TableCellHead>Commodity</TableCellHead>
                  <TableCellHead>Current stock balance</TableCellHead>
                  <TableCellHead>Quantity received</TableCellHead>
                  <TableCellHead>New stock balance</TableCellHead>
                  <TableCellHead></TableCellHead>
                </TableRowHead>
              </TableHead>
              <TableBody>
                {orderList.length == 0 && (
                  <TableRow columns="4">
                    <TableCell>No commodity added to registration</TableCell>
                  </TableRow>
                )}
                {orderList.map((item, index) => {
                  return (
                    <OrderTableRow
                      index={index}
                      commodity={item.displayName}
                      endBalance={item.endBalance.value}
                      amount={item.amount}
                      clickDisplayEditOrder={clickDisplayEditOrder}
                      setCurrListIndex={setCurrListIndex}
                      currListIndex={currListIndex}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {orderList.length > 0 && (
            <Button
              name="Primary button"
              primary
              value="default"
              className="order-button"
              disabled={orderList.length > 0 ? false : true}
              onClick={sendOrderClick}>
              Register order
            </Button>
          )}
        </Box>
      </div>
    );
  }
}
