import React from "react";
import {
	Modal,
	ModalTitle,
	ModalContent,
	ModalActions,
	Button,
	ButtonStrip
} from '@dhis2/ui';

import "./ConfirmationPopup.css"
export function ConfirmationPopup(props) {

	const handleChange = (val) => {
		props.updateState(val);
	}

	return (
		<div>
			<Modal className="popup-modal" position="middle">
				<ModalTitle>
					{props.titleText}
				</ModalTitle>
				<ModalContent>
					{props.mainText}
				</ModalContent>
				<ModalActions>
					<ButtonStrip className="confirmButtons">
						<Button
							onClick={() => handleChange(false)}>
							Cancel
						</Button>
						<Button
							name="primary-button"
							primary valye="default"
							onClick={() => props.confirm()}>
							Confirm
						</Button>
					</ButtonStrip>
					</ModalActions>
			</Modal>
		</div>
	);
}