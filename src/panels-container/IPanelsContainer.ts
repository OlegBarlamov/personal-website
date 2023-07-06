import {IPanelsContainerConfig} from 'panels-container/IPanelsContainerConfig'
import {IPanelComponent} from 'panels-container/IPanelComponent'

export interface IPanelsContainer {
	getLength(): number

	getCurrent(): IPanelComponent
	getNext(): IPanelComponent
	getPrevious(): IPanelComponent

	moveForward(): void
	moveBackward(): void
	moveToIndex(panelsIndex: number): void

	getConfig(): IPanelsContainerConfig
}