import { useDataQuery } from "@dhis2/app-runtime";

export const ORG_UNITS = {
    Faabu_CHP: "ZpE2POxvl9P"
  }
  
export const PERIODS = {
  October: "202110"
}

export const DATA_SETS = {
  LifeSavingCommodities: "ULowA8V3ucd"
}

export const CATEGORY_OPTION_COMBOS = {
  Consumption: "J2Qf1jtZuj8",
  QuantityToBeOrdered: "KPP63zJPkOu",
  EndBalance: "rQLFnNXXIL0"
}

/**
 * Fetches all the Life Saving Commodities from the DHIS2 API
 * Returns a Map object with the key as the Commodity ID and the value as the object
 */
export const getAllCommodities = () => {
  const query = {
      dataSets: {
        resource: "dataSets/" + DATA_SETS.LifeSavingCommodities,
        params: {
          fields: ["name", "id", "dataSetElements[dataElement[id, displayName]"],
          paging: "false",
        },
      },
      dataValueSets: {
        resource: "dataValueSets",
        params: {
          orgUnit: ORG_UNITS.Faabu_CHP,
          dataSet: DATA_SETS.LifeSavingCommodities,
          period: PERIODS.October
        },
      },
    }
    return useDataQuery(query);
}
