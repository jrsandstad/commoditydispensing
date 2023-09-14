import React, { useState, useEffect } from "react";
import classes from "./Transactions.css";

import { ConfirmationPopup } from "../SharedComponents/ConfirmationPopup";
import { useDataQuery , useDataMutation} from "@dhis2/app-service-data";
import { fetchDate, fetchTime } from "../Time/TimeFunctions";

import {
  Box,
  Button,
  Divider,
  InputField,
  SingleSelect,
  SingleSelectOption
} from "@dhis2/ui";
import { CATEGORY_OPTION_COMBOS, ORG_UNITS, DATA_SETS, PERIODS } from "../Api/api";

const CURRENT_DATE = fetchDate();
const TIMESTAMP = fetchTime();

export function Transactions(props) {
  const commodities = props.commodities
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  //States for values 
  const [commodity, setCommodity] = useState("");
  const [amount, setAmount] = useState("");
  const [dispensedBy, setDispensedBy] = useState("");
  const [dispensedTo, setDispensedTo] = useState("");
  const [maxDispense, setMaxDispense] = useState(0)
  const [minDispense, setMinDispense] = useState(1);
  const [errorState, setErrorState] = useState(false)

  //Update state for showing warning when attempting to switch page 
  useEffect(() => {
    if (amount || commodity || dispensedBy || dispensedTo) {
      props.setEdited(true);
    } else if (!amount || !commodity || !dispensedBy || !dispensedTo) {
      props.setEdited(false);
    } 
  }, [amount, commodity, dispensedBy, dispensedTo])

  useEffect(() =>{
    if( parseInt(amount) > maxDispense || parseInt(amount) < minDispense ) {
      setErrorState(true);
    }
    else if( parseInt(amount) < maxDispense ) {
      setErrorState(false);
    }
  },[amount])


//Query for data storage 
const dataQuery = {
  "dataStoreData": {
    "resource": "dataStore/IN5320-G9/transactions"
  }
}

//Query used for mutating API data 
const updateCommodityQuery = {
  resource: "dataValueSets",
  type: "create",
  data: ({ dataValues }) => ({
    orgUnit: ORG_UNITS.Faabu_CHP,
    dataSet: DATA_SETS.LifeSavingCommodities,
    period: PERIODS.October,
    dataValues: dataValues,
  }),
}

const [mutateApiData] = useDataMutation(updateCommodityQuery);

const { error, loading, data } = useDataQuery(dataQuery);

let commodityvalue = commodity.endBalance
if (data) {
  console.log("here is the data");
  console.log(data.dataStoreData);
}

if ((commodityvalue != undefined) && (commodityvalue.value != maxDispense)){
  setMaxDispense(commodityvalue.value)
  setMinDispense(1);
}

const dataMutationQuery = {
  resource: "dataStore/IN5320-G9/transactions",
  type: "update",
  data: ({ transactions }) => ({
    transactions
  }),
}

  const clickSendOrder = () => {
    setShowConfirmationPopup(true);
  }

  const [mutate] = useDataMutation(dataMutationQuery)
  const onClick = () => {

    let newList = [];
    if (data.dataStoreData.transactions){
      for (let i = 0; i < data.dataStoreData.transactions.length; i++) {
        newList.push(data.dataStoreData.transactions[i]);
      }
    }

    newList.unshift({
      "commodity": commodity.displayName.replace("Commodities - ", ""),
      "amount": amount,
      "dispensedBy": dispensedBy,
      "dispensedTo": dispensedTo,
      "date": CURRENT_DATE,
      "time": TIMESTAMP
    })

    //Mutate data storage 
    mutate({
      transactions: newList
    })

    //Mutate API data 
    mutateApiData({
      dataValues: [
        { 
          dataElement: commodity.id,
          categoryOptionCombo: CATEGORY_OPTION_COMBOS.EndBalance,
          value: parseInt(commodity.endBalance.value) - amount
        },
        { 
          dataElement: commodity.id,
          categoryOptionCombo: CATEGORY_OPTION_COMBOS.Consumption,
          value: parseInt(commodity.consumption.value) + parseInt(amount)
        }
      ]
    })

    //Reset edited 
    setShowConfirmationPopup(false);
    props.setEdited(false);
  }


  if (!commodities ) {
    return <CircularLoader large />;
  }

  return (
    <div>      
      { showConfirmationPopup && <ConfirmationPopup updateState={setShowConfirmationPopup}
                                            titleText={"Transaction confirmation"}
                                            mainText={"Are you sure you want to do this transaction?"}
                                            confirm={onClick}/> }
      <Box>
        <h1>Transactions</h1>
        <h2>Registration of transactions</h2>
      </Box>
      <Divider />
      <h4>Registering a transaction will update your transaction history</h4>
      <div id="transactionForm">
        <Box>
          <Box className={classes.container} className="inputComAm">
            <Box className={classes.left}>
            <p>Commodity *</p>
            <SingleSelect
            selected={commodity ? commodity.id : ""}
            className="inputRight"
            
            noMatchText="No match found"
            onChange={(e) => {
              setCommodity(commodities.get(e.selected));
            }}>
            {Array.from(commodities, ([key, value]) => value)
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
            </Box>
            <Box className={classes.right}>
            <p>Amount *</p>
              <InputField
                className="inputRight"
                name="amount"
                type="number"
                min="1"
                validationText={commodity && "Stock balance: " + maxDispense}
                error= {errorState}
                max={maxDispense}
                value ={amount}
              
                onChange={(e) => setAmount(e.value)}
                required
              />
            </Box>
          </Box>
          <p>Dispensed by *</p>
          <InputField
            name="by"
            className="dispensed"
            value = {dispensedBy}
            onChange={(e) => setDispensedBy(e.value)}
            required
          />
          <p>Dispensed to *</p>
          <InputField
            className="dispensed"
            name="to"
            value = {dispensedTo}
            onChange={(e) => setDispensedTo(e.value)}
            required
          />
          <Button type="submit" 
            primary
            disabled={!commodity || !dispensedBy || !dispensedTo || !amount || (amount>maxDispense)}
            onClick={clickSendOrder}>
            Confirm transaction
          </Button>
        </Box>
      </div>
    </div>
  );
}
