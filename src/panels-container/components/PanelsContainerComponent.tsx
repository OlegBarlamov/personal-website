import React from 'react'
import {IPanelsContainerConfig} from 'panels-container/IPanelsContainerConfig'
import {IPanelsContainerController} from 'panels-container/IPanelsContainerController'
import {Vector2} from 'common/IVector2'
import {PanelsContainerController} from 'panels-container/PanelsContainerController'
import './PanelContainerComponent.css'
import {IPanelComponent} from 'panels-container/IPanelComponent'
import {PanelPlacement} from 'panels-container/PanelPlacement'

interface IPanelsContainerProps {
	panels: IPanelComponent[]
	config: IPanelsContainerConfig
}

interface IPanelsContainerState {
	currentPanelIndex: number,
	panelsPositions: Vector2[]
}

const VISIBLE_PANELS_NUMBER = 3

export class PanelsContainerComponent extends React.Component<IPanelsContainerProps, IPanelsContainerState> {
	private controller: IPanelsContainerController
	constructor(props: IPanelsContainerProps) {
		super(props)

		this.controller = new PanelsContainerController(this.props.config, this.props.panels.map(x => x.getProps()))
		this.state = {
			currentPanelIndex: 0,
			panelsPositions: this.controller.getPanelsPlacements()
		}
	}

	public onMouseScrollValueChanged(yScrollValue: number): Vector2 {
		return this.controller.mouseScrollChanged(yScrollValue)
		// const newY =
		//
		// let newVisiblePanels = this.state.visiblePanels
		// const newIndex = this.controller.getCurrentPanelIndex()
		// if (newIndex !== this.state.currentPanelIndex) {
		// 	newVisiblePanels = this.getVisiblePanelsForCurrentIndex(newIndex)
		// 	console.log(`Index switched from ${this.state.currentPanelIndex} to: ${newIndex}` )
		// }
		//
		// const newShift = this.controller.getCurrentPanelShift()
		// this.setState({
		// 	...this.state,
		// 	currentPanelIndex: newIndex,
		// 	visiblePanels: newVisiblePanels,
		// 	panelsShifts: this.getPanelShiftsFromCurrentPanelShift(newShift)
		// })
		//
		// return newY
	}

	// private getVisiblePanelsForCurrentIndex(currentIndex: number): (IPanelComponent | undefined)[] {
	// 	this.state?.visiblePanels.forEach((panel, index) => {
	// 		if (Math.abs(index - currentIndex) > VISIBLE_PANELS_NUMBER / 2) {
	// 			panel?.unload()
	// 		}
	// 	})
	//
	// 	const result: (IPanelComponent | undefined) [] = []
	// 	for (let i = 0; i < VISIBLE_PANELS_NUMBER ; i++) {
	// 		const index = currentIndex + i - 1
	// 		if (index >= 0 && index<this.props.panels.length) {
	// 			const visiblePanel = this.props.panels[index]
	// 			visiblePanel.preload()
	// 			result.push(visiblePanel)
	// 		} else {
	// 			result.push(undefined)
	// 		}
	// 	}
	// 	return result
	// }

	// private getPanelShiftsFromCurrentPanelShift(currentPanelShift: number): Vector2[] {
	// 	const tabX = this.props.config.panelsSize.x + this.props.config.panelsGap
	// 	const tabY = this.props.config.panelsSize.y + this.props.config.panelsGap
	// 	const currentIndexShift = this.state.visiblePanels[2]?.getProps().Placement === PanelPlacement.Right
	// 		? { x: currentPanelShift % this.props.config.panelsSize.x + this.props.config.panelsGap, y: 0 }
	// 		: { x: 0, y: currentPanelShift % this.props.config.panelsSize.y + this.props.config.panelsGap }
	// 	console.log(`currentIndexShift: {${currentIndexShift.x},${currentIndexShift.y}}`)
	// 	const previousPanelShift = this.state.visiblePanels[1]?.getProps().Placement === PanelPlacement.Right
	// 		? {x: -tabX + currentPanelShift, y: 0}
	// 		: {x: 0, y: -tabY + currentPanelShift}
	//
	// 	const nextPanelShift = tab + currentPanelShift
	//
	// 	return [
	// 		{x: 0, y: previousPanelShift},
	// 		{x: 0, y: currentPanelShift},
	// 		{x: 0, y: nextPanelShift},
	// 	]
	// }

	render() {
		return (
			<div className={"container"}>
					{this.props.panels.map((panel, i) => {
						return !!panel && (
							<div key={i} style={{
								position: 'absolute',
								left: `${this.state.panelsPositions[i].x}px`,
								top: `${this.state.panelsPositions[i].y}px`,
								width: this.props.config.panelsSize.x,
								height: this.props.config.panelsSize.y,
							}}>
								{panel.render()}
							</div>)
					})}
			</div>
		)
	}
}