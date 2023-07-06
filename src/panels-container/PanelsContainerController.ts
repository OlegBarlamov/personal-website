import {IPanelsContainerController} from 'panels-container/IPanelsContainerController'
import {IPanelsContainerConfig} from 'panels-container/IPanelsContainerConfig'
import {IPanelComponentProps} from 'panels-container/components/PanelComponent'
import {Vector2} from 'common/IVector2'
import {PanelPlacement} from 'panels-container/PanelPlacement'

export class PanelsContainerController implements IPanelsContainerController {
	private readonly config: IPanelsContainerConfig
	private readonly panels: IPanelComponentProps[]
	private currentPanelIndex: number = 0
	private lastScrollValue: number = 0
	private panelsYScrollPlacements: {start: number, end: number}[] = []
	private panelsPlacements: Vector2[] = []

	constructor(config: IPanelsContainerConfig, panels: IPanelComponentProps[]) {
		this.config = config
		this.panels = panels
	}

	mouseScrollChanged(yScrollValueDelta: number): Vector2 {
		const newScrollValue = this.lastScrollValue += yScrollValueDelta
		if (yScrollValueDelta > 0) {
			while (newScrollValue > this.panelsYScrollPlacements[this.currentPanelIndex].end) {
				this.currentPanelIndex++
				if (this.currentPanelIndex >= this.panels.length) {
					break
				}
			}
			if (this.currentPanelIndex >= this.panels.length) {
				this.currentPanelIndex = this.panels.length - 1
			}
			if (this.panels[this.currentPanelIndex + 1]?.Placement === PanelPlacement.Right) {
				return {
					x: this.panelsPlacements[this.currentPanelIndex].x + newScrollValue - this.panelsYScrollPlacements[this.currentPanelIndex].start,
					y:this.panelsPlacements[this.currentPanelIndex].y
				}
			} else {
				return {
					x: this.panelsPlacements[this.currentPanelIndex].x,
					y: this.panelsPlacements[this.currentPanelIndex].y  + newScrollValue - this.panelsYScrollPlacements[this.currentPanelIndex].start
				}
			}
		} else {
			while (newScrollValue < this.panelsYScrollPlacements[this.currentPanelIndex].start) {
				this.currentPanelIndex--
				if (this.currentPanelIndex < 0) {
					break
				}
			}
			if (this.currentPanelIndex < 0) {
				this.currentPanelIndex = 0
			}
			if (this.panels[this.currentPanelIndex].Placement === PanelPlacement.Right) {
				return {
					x: this.panelsPlacements[this.currentPanelIndex].x + newScrollValue - this.panelsYScrollPlacements[this.currentPanelIndex].start,
					y:this.panelsPlacements[this.currentPanelIndex].y
				}
			} else {
				return {
					x: this.panelsPlacements[this.currentPanelIndex].x,
					y: this.panelsPlacements[this.currentPanelIndex].y  + newScrollValue - this.panelsYScrollPlacements[this.currentPanelIndex].start
				}
			}
		}

	}

	getPanelsPlacements(): Vector2[] {
		if (this.panels.length === 0) {
			return this.panelsPlacements
		}

		let x = this.config.padding.x
		let y = this.config.padding.y
		this.panelsPlacements.push({x, y})
		this.panelsYScrollPlacements.push({
			start: 0,
			end: this.panels[1]?.Placement === PanelPlacement.Right
				? this.config.panelsSize.x + this.config.panelsGap / 2
				: this.config.panelsSize.y + this.config.panelsGap / 2
		})

		this.panels.slice(1).forEach((panel, i) => {
			if (panel.Placement === PanelPlacement.Bottom) {
				y += this.config.panelsGap + this.config.panelsSize.y
			} else {
				x += this.config.panelsGap + this.config.panelsSize.x
			}
			this.panelsYScrollPlacements.push({
				start: this.panelsYScrollPlacements[i].end,
				end: this.panels[i+2]?.Placement === PanelPlacement.Right
					? this.config.panelsSize.x + this.config.panelsGap
					: this.config.panelsSize.y + this.config.panelsGap
			})
			this.panelsPlacements.push({x, y})
		})

		return this.panelsPlacements
	}

	private static getIndexFromScrollValue(yScrollValue: number, config: IPanelsContainerConfig): number {
		return Math.trunc((yScrollValue + config.panelsGap + config.panelsSize.y / 2) / (config.panelsSize.y + config.panelsGap))
	}

	private static getShiftFromScrollValue(yScrollValue: number, config: IPanelsContainerConfig): number {
		return -(yScrollValue + config.panelsGap + config.panelsSize.y / 2) % (config.panelsSize.y + config.panelsGap) + config.panelsGap + config.panelsSize.y / 2
	}

	private static getShifts(yScrollValue: number): number[] {
		return []
	}

	getCurrentPanelIndex(): number {
		return this.currentPanelIndex
	}
}