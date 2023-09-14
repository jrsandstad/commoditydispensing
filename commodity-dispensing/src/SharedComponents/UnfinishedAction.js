import React from "react";
import {
	Modal,
	ModalTitle,
	ModalContent,
	Button,
	ButtonStrip,
	ModalActions
} from '@dhis2/ui';

import "./UnfinishedAction.css";

export function UnfinishedAction(props) {

	const resetEdited = () => {
		props.setEdited(false);
		props.setDisplayWarning(false);
		props.setActivePage(props.clickedPage);
	}

	return (
		<Modal className="unfinished-popup-modal" position="middle">
			<ModalTitle>
				Unfinished action
			</ModalTitle>
			<ModalContent>
				You have an unfinished action! Do you want to leave this page?
			</ModalContent>
			<ModalActions>
				<ButtonStrip className="unfinished_confirmButtons"middle>
					<Button
						onClick={() => props.setDisplayWarning(false)}>
						Cancel
					</Button>
					<Button
						name="primary-button"
						primary valye="default"
						onClick={() => resetEdited()}>
						Continue
					</Button>
				</ButtonStrip>
			</ModalActions>
		</Modal>
	);
}