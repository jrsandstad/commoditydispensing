import React, { useState, useEffect } from "react";

export function NextDelivery(){
    let d = new Date();
    let date = d.getDate()
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    
    if(date > 14){
        if((month+1) > 12){
            return(
                <>Next delivery date is: 14.01.{(year+1)}</>
            );
        }
        else{
            return(
                <>Next delivery date is: 14.{(month<10?'0':'') + (month+1)}.{year}</>
            );
        }
    }
    else{
        return(
            <>Next delivery date is: 14.{(month<10?'0':'') + month}.{year}</>
        );
    }
}