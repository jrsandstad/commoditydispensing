import { getAllCommodities, CATEGORY_OPTION_COMBOS } from "./api";
import { useState, useEffect } from "react";

export const CommoditiesFetcher = ({setCommodities}) => {
    const { data } = getAllCommodities();

    function mergeData(data) {
        const elements = data.dataSets.dataSetElements;
        const sortedElements = elements.sort((a, b) => (a.dataElement.displayName > b.dataElement.displayName) ? 1 : -1);
        const values = data.dataValueSets.dataValues;

        const mergedData = sortedElements.map((element) => {
          const consumption = values.find((value) => {
            return (
              value.dataElement === element.dataElement.id &&
              value.categoryOptionCombo === CATEGORY_OPTION_COMBOS.Consumption
            );
          });
      
          const toBeOrdered = values.find((value) => {
            return (
              value.dataElement === element.dataElement.id &&
              value.categoryOptionCombo === CATEGORY_OPTION_COMBOS.QuantityToBeOrdered
            );
          });
      
          const endBalance = values.find((value) => {
            return (
              value.dataElement === element.dataElement.id &&
              value.categoryOptionCombo === CATEGORY_OPTION_COMBOS.EndBalance
            );
          });
      
          return {
            displayName: element.dataElement.displayName,
            id: element.dataElement.id,
            consumption: consumption,
            toBeOrdered: toBeOrdered,
            endBalance: endBalance,
          };
        });
        return new Map(mergedData.map((el) => [el.id, el]));
      }

    useEffect(()=> {
        if(data){
            const mergedData = mergeData(data);
            setCommodities(mergedData);
        }
    }, [data])
    return null
}