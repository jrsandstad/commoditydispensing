import React, { useState } from "react";
import classes from "./App.module.css";

import { Navigation } from "./Navigation/Navigation";
import { Storage } from "./Storage/Storage";
import { Log } from "./Log/Log";
import { Order } from "./Order/Order";
import { Transactions } from "./Transactions/Transactions";
import { UnfinishedAction } from './SharedComponents/UnfinishedAction';
import { CommoditiesFetcher } from "./Api/CommoditiesFetcher";


function MyApp() {

	const [activePage, setActivePage] = useState("Storage");
	const [edited, setEdited] = useState(false);
	const [displayWarning, setDisplayWarning] = useState(false);
	const [commodities, setCommodities] = useState(new Map());
	const [clickedPage, setClickedPage] = useState(activePage)

	const activePageHandler = (page) => {
		setClickedPage(page);
		if (!edited) {
			setActivePage(page); 
		} else {
			setDisplayWarning(true);
		}
	}

	return (
		<div className={classes.container}>
			<div className={classes.left}>
				<Navigation
					activePage={activePage}
					activePageHandler={activePageHandler}
				/>
			</div>
			<div className={classes.right}>
				<CommoditiesFetcher setCommodities={setCommodities} />
				{displayWarning &&
					<UnfinishedAction
						setDisplayWarning={setDisplayWarning}
						setEdited={setEdited}
						setActivePage={setActivePage}
						clickedPage={clickedPage}/>}
				{activePage === "Storage" && <Storage commodities={commodities} />}
				{activePage === "Log" && <Log />}
				{activePage === "Order" && <Order commodities={commodities} edited={edited} setEdited={setEdited} setDisplayWarning={setDisplayWarning} />}
				{activePage === "Transactions" && <Transactions commodities={commodities} edited={edited} setEdited={setEdited}/>}
			</div>
		</div>
	);
}

export default MyApp;
