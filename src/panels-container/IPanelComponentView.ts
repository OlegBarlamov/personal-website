import {ReactElement} from 'react'
import {Vector2} from 'common/IVector2'

export interface IPanelComponentView {
	shift: Vector2
	getContent(): ReactElement
}