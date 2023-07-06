import React, {ReactElement} from 'react'
import {IPanelComponent} from 'panels-container/IPanelComponent'
import {PanelPlacement} from 'panels-container/PanelPlacement'
import {PanelFadeColor} from 'panels-container/PanelFadeColor'
import './PanelComponent.css'

export interface IPanelComponentProps {
	Placement: PanelPlacement
	FadeColor: PanelFadeColor
	Content: ReactElement
}

interface IPanelComponentState {
	isLoaded: boolean
}

export class PanelComponent extends React.Component<IPanelComponentProps, IPanelComponentState> implements IPanelComponent {
	constructor(props: IPanelComponentProps) {
		super(props)
		this.state = {isLoaded: false}
	}
	render() {
		const color = `rgb(${this.props.FadeColor.red}, ${this.props.FadeColor.green}, ${this.props.FadeColor.blue})`
			return (<div className={'container-item'} style={{backgroundColor: color}}>
				{ this.state?.isLoaded &&
					<div>HI</div>
				}
			</div>);
	}

	getProps(): IPanelComponentProps {
		return this.props
	}

	preload(): void {
		console.log("HI@!!!")
		this.setState({isLoaded: true})
	}

	unload(): void {
		this.setState({isLoaded: false})
	}
}