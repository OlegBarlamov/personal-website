import {Vector2} from 'common/IVector2'

export interface IPanelsContainerController {
	getCurrentPanelIndex(): number
	getPanelsPlacements(): Vector2[]

	mouseScrollChanged(yScrollValue: number): Vector2
}