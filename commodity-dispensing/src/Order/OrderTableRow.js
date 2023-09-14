import React from "react";

import {
    Button,
    TableRow,
    TableCell,
    IconEdit24
} from '@dhis2/ui';

export function OrderTableRow(props) {

	const handleEditOrderClick = () => {
		props.setCurrListIndex(props.index);
        props.clickDisplayEditOrder(true, 0);
    }
    
    const newStockBalance = parseInt(props.endBalance) + parseInt(props.amount);

    return (
        <TableRow key={props.index}>
            <TableCell>{props.commodity.replace("Commodities - ", "")}</TableCell>
            <TableCell>{props.endBalance}</TableCell>
            <TableCell>{props.amount}</TableCell>
            <TableCell>{newStockBalance}</TableCell>
            <TableCell dense>
            <Button
                name="Icon small button"
                value="default"
                small
                onClick={handleEditOrderClick}>
            <IconEdit24 />
            </Button>
            </TableCell>
        </TableRow>
    );
}