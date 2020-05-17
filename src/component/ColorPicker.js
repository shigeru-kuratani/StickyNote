import React from 'react'
import {TwitterPicker} from 'react-color'

// function on change complete note color
var onChangeNoteColor

/**
 * ColorPicker Component
 * 
 * @author  Shigeru Kuratani
 * @version 1.0.0
 */
export class ColorPicker extends React.Component {

	/**
	 * constructor
	 * @param props properties
	 */
	constructor (props) {
		super(props)
		onChangeNoteColor = this.props.onChangeNoteColor
		this.state = {
			triangle : "hide",
			colors   : ['#f3f300',
						'#FF6900',
						'#FCB900',
						'#7BDCB5',
						'#00D084',
						'#8ED1FC',
						'#0693E3',
						'#ABB8C3',
						'#F78DA7',
						'#9900EF'],
			top      : props.top,
			left     : props.left
		}
	}

	/**
	 * function on changing color of note complete
	 * @param e event on target element
	 */
	changeNoteColorComplete (color) {
		const newColor = color.hex
		if (onChangeNoteColor) {
			onChangeNoteColor({
				target : this,
				color  : newColor
			})
		}
	}

	/**
	 * render method
	 * @return rendering html
	 */
	render () {
		const pstyle = {
			top  : this.state.top,
			left : this.state.left
		}
		return (
			<div id="colorPicker" style={pstyle}>
				<TwitterPicker key="0" triangle="hide" colors={this.state.colors}
					onChangeComplete={this.changeNoteColorComplete} />
			</div>
		)
	}
}
