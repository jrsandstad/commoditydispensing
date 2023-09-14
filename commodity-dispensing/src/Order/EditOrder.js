import React, {useState} from "react";
import {
	Modal,
	ModalTitle,
	ModalContent,
	ModalActions,
	Button,
	ButtonStrip,
	Input
} from '@dhis2/ui';

export function EditOrder(props) {

	const [newAmount, setNewAmount] = useState(props.orderList[props.currListIndex].amount)

	const handleUpdateOrder = () => {
		//Differ from what should be done?
		props.orderList[props.currListIndex].amount = newAmount;
		props.showEditOrderModal(false);

	}

	const handleDeleteOrder = () => {
		props.orderList.splice(props.currListIndex, 1);
		props.showEditOrderModal(false);
		props.setEdited(false);
	}

	const handleCancelEdit = () => {
		props.showEditOrderModal(false);
	}

	return (
		<Modal position="middle">
			<ModalTitle>
				Edit your order
			</ModalTitle>
			<ModalContent>
				Edit commodity: {props.orderList[props.currListIndex].displayName.replace("Commodities - ", "")}
			</ModalContent>
			<ModalContent>
				<Input 
					placeholder="Amount"
					type="number"
					value={newAmount}
            		onChange={(e) => setNewAmount(e.value)}
					/>
			</ModalContent>
			<ModalActions>
				<ButtonStrip>
					<Button
						className="delete-button"
						destructive 
						onClick={() => handleDeleteOrder()}>
						Delete
					</Button>
				</ButtonStrip>
				<ButtonStrip>
					<Button onClick={() => handleCancelEdit(false)}>
						Cancel
					</Button>
					<Button
						name="primary-button"
						primary valye="default"
						position="start"
						onClick={() => handleUpdateOrder()}>
						Save
					</Button>
				</ButtonStrip>
			</ModalActions>
		</Modal>
	);
}