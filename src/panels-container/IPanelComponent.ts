import {IPanelComponentProps} from 'panels-container/components/PanelComponent'

export interface IPanelComponent {
	getProps(): IPanelComponentProps

	preload(): void
	unload(): void

	render(): React.JSX.Element | undefined
}