import React from 'react'
import {Rnd} from 'react-rnd'

// function on risize stop lane
var onChangeWidth = null

/**
 * Lane Component
 * 
 * @author  Shigeru Kuratani
 * @version 1.0.0
 */
export class Lane extends React.Component {

	/**
	 * constructor
	 * @param  props properties
	 */
	constructor (props) {
		super(props)
		onChangeWidth = this.props.onChangeWidth
		this.state = {
			index   : props.index,
			title   : props.title,
			delflag : props.delflag,
			width   : props.width
		}
	}

	/**
	 * function on changing lane title
	 * @param e event on target element
	 */
	doChangeTitle (e) {
		const newTitle  = e.target.value
		const laneIndex = e.target.parentElement.id
		if (this.props.onChangeTitle) {
			this.props.onChangeTitle({
				target    : this,
				laneIndex : laneIndex,
				newTitle  : newTitle
			})
		}
		this.setState({
			title : newTitle
		})
	}

	/**
	 * function on click delete button of lane
	 * @param e event on target element
	 */
	clickDeleteLane (e) {
		const laneIndex = e.target.parentElement.id
		if (this.props.onDelete) {
			this.props.onDelete({
				target    : this,
				laneIndex : laneIndex
			})
		}
	}

	/**
	 * function on resize lane
	 * @param e event on target element
	 */
	onResizeStop (e, direction, ref, delta, position) {
    	const newWidth = Math.floor(parseInt(ref.style.width, 10))
		const laneIndex = ref.children[1].id
		if (onChangeWidth) {
			onChangeWidth({
				target    : this,
				laneIndex : laneIndex,
				newWidth  : newWidth
			})
		}
    }

	/**
	 * render method
	 * @return rendering html
	 */
	render () {
		return (
			<Rnd
				className="lane"
	            default={{
	            	width  : this.state.width
	            }}
	            dragAxis="none"
	            enableResizing={{
	              top: false, right: true, bottom: false, left: false,
	              topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
	            }}
	            bounds="parent"
	            resizeGrid={[5, 0]}
	            minWidth="10"
	            onResizeStop={this.onResizeStop}
	            style={{position: 'relative'}}>
            	<div id={this.state.index} className="laneTitle">
	        		<input type="text" value={this.state.title}
	        			onChange={e => this.doChangeTitle(e)} />
	        		<div className="laneDelete" onClick={e => this.clickDeleteLane(e)}>×</div>
	        	</div>
	        	<div className="lanePad"></div>
        	</Rnd>
        )
	}
}
