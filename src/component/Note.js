import React from 'react'
import NeDB from 'nedb'
import Draggable from 'react-draggable'

// function on drag stop moving note
var onDragStopNote = null
// variable of note top attribute on rendering
var currentTops = []
// variable of note left attribute on rendering
var currentLefts = []

/**
 * Note Component
 * 
 * @author  Shigeru Kuratani
 * @version 1.0.0
 */
export class Note extends React.Component {


	/**
	 * constructor
	 * @param  props properties
	 */
	constructor (props) {
		super(props)
		onDragStopNote = props.onDragStopNote
		currentTops[props.index]  = props.top
		currentLefts[props.index] = props.left
		this.state = {
			index    : props.index,
			title    : props.title,
			contents : props.contents,
			delflag  : props.delflag,
			zIndex   : props.zIndex,
			top      : props.top,
			left     : props.left,
			height   : props.height,
			color    : props.color
		}
	}

	/**
	 * re-render and force update note color 
	 * @param nextProps next properties
	 */
	componentWillReceiveProps (nextProps){
		this.state = {
			index    : this.state.index,
			title    : this.state.title,
			contents : this.state.contents,
			delflag  : this.state.delflag,
			zIndex   : this.state.zIndex,
			top      : this.state.top,
			left     : this.state.left,
			height   : this.state.height,
			color    : nextProps.color
		}
	}

	/**
	 * function on changing note title
	 * @param e event on target element
	 */
	doChangeTitle (e) {
		const newTitle = e.target.value
		const noteIndex = e.target.parentElement.parentElement.id
		if (this.props.onChangeTitle) {
			this.props.onChangeTitle({
				target    : this,
				noteIndex : noteIndex,
				newTitle  : newTitle
			})
		}
		this.setState({
			title : newTitle
		})
	}

	/**
	 * function on changing note Contents
	 * @param e event on target element
	 */
	doChangeContents (e) {
		const newContents = e.target.value
		const newHeight   = e.target.scrollHeight 
		const noteIndex   = e.target.parentElement.parentElement.id
		if (e.target.scrollHeight > e.target.offsetHeight) {
			e.target.style.height = e.target.scrollHeight + 'px'
		} else {
			let height, lineHeight
			height = Number(e.target.style.height.split('px')[0])
			lineHeight = 20
			e.target.style.height = height - lineHeight + 'px'
			if (e.target.scrollHeight > e.target.offsetHeight) {
				e.target.style.height = e.target.scrollHeight + 'px'
			}		
		}
		if (this.props.onChangeContents) {
			this.props.onChangeContents({
				target        : this,
				noteIndex     : noteIndex,
				newContents   : newContents,
				newHeight     : e.target.style.height
			})
		}
		this.setState({
			contents : newContents
		})
	}

	/**
	 * function on click color button of note
	 * @param e event on target element
	 */
	clickNoteColor (e) {
		const noteIndex = e.target.parentElement.parentElement.id
		if (this.props.onClickColor) {
			this.props.onClickColor({
				target    : this,
				noteIndex : noteIndex
			})
		}
	}

	/**
	 * function on click delete button of note
	 * @param e event on target element
	 */
	clickDeleteNote (e) {
		const noteIndex = e.target.parentElement.parentElement.id
		if (this.props.onDelete) {
			this.props.onDelete({
				target    : this,
				noteIndex : noteIndex
			})
		}
	}

	/**
	 * function on move note
	 * @param e event on target element
	 */
	doDragNoteStop (e, position) {
		const {x, y} = position
		const noteIndex = e.target.parentElement.id
						|| e.target.parentElement.parentElement.id
		if (onDragStopNote) {
			onDragStopNote({
				target      : this,
				noteIndex   : noteIndex,
				currentTop  : currentTops[noteIndex],
				currentLeft : currentLefts[noteIndex],
				x           : x,
				y           : y
			})
		}
	}

	/**
	 * render method
	 * @return rendering html
	 */
	render () {
		const nStyle = {
			zIndex : this.state.zIndex,
			top    : this.state.top,
			left   : this.state.left,
			backgroundColor : this.state.color
		}
		const cStyle = {
			height : this.state.height
		}
		return (
			<Draggable onStop={this.doDragNoteStop}>
				<div id={this.state.index} className={'note'}
					style={nStyle}>
					<div className="noteTitle">
						<input type="text" value={this.state.title}
							onChange={e => this.doChangeTitle(e)} />
						<img className="noteColor" width="20" height="20" onClick={e => this.clickNoteColor(e)}
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAEg0lEQVRIiaWXW4xTVRSG/733Ob1NO+fQaefWmeEygBceiFfwhRhNuESJjgjEGCEEEg1mQsAEH0RSdB40kUQNhEvCRYMvMmRURCJC9MVYIfJAMHIHy8CE6Uyn7UxP2zln7+2DtJRO2zmF/6lda+31nX+lWd2HoEbteWqPmtZijSpDy/TUUckVZSDX2npnxeHDvJY+xE7Rl0s+7oTA64SwpZoSeM7DvNRBnQjl9sG0LIxblkhns38KKfukZR15+cyZaw8F3r6wp10BtjQ529e2uWeyoKMVjCiFvMY+LHwWQiCZTiOWTMrk2FgvATYviURu1Az+YmHPal0N7n3c97RjitpYtqYYXKwxw0A0FsuNZTLvvBSJHCxXw0oDYUjatYh91uF+5NMn9eeZh3krPRtc9NeycYeqIqBpChfi1VcCgfpv+vtPbgNkVfCCt6Zun+mY0zXX88QUMslPoBIYAAgh0L1eqB1W09n5re2HTv97ojhPi79sXbV/dQNCG1X10elRHk9WpdpQNjiUCE3DjCaf8t7xDQvWlgV/sOqrUJ3UdnfgMQBAivm1mzw+8jBQX9DSAWCqrsKn0p0/b1rQPgGsSNETwmxX8XiTzD/lQZwXQ/+HEEzVHU5pka33gbesPthZj8AqL/QJTVLMr0V5PP6g0Lx8DgrdRdf81P1CZwFMhFjWgFZaWlwE99txXgmaV2OdwijhywpgJlmXDw1Vm951XhE+GRQAdBcDJVgKAGT58m/Zs25lfJZ8pqLjYtXzeLyD+f3AvQViB5rX+cEcN73SRWe7M82qdNuCAhPHXgsUAFwKmDlkNiqqtFpUOOyey8O1fpFIOZpjsj7IbUMBQKUEkpIW5bTHA93rRtCv1gQ3WJ2Y+2In3g3EajrnPH8L8sqwpJSwAc5zNUKNBGnS9Gidpu8cCiZqOZvNmuAmvU0HxMigaWVt/4lnaDpJmrTCeKN1mr57OJCyDc6YPD3t7xj9a+/bZtZMRYSYnG0wI4FmXSuNX/fo9Xaccy4wmjD+WLECnAKAlPjByFZfy/nxVsrbGXvsThIWF33A3QVCLas3NXq7ouXS8VaDVxv77WhcUEXeAx/b/+a1USN+IJOduJgqjbeSKo19ZDiN2EBq36Lui9cLYAAQXH4UG7mak1IUiu06LVWpcyklLp7vz5oQ2/KxAvjEgTduZrKj6+7ELwGo3Wmpip3/c64fyZFM99JNl27l8/ddfa6c7T3XMWexj/hczWqosWWy5q62SNV80uFyXbyRu6ZcvrB/8cYLnxTnJuzo420rN+cQ+z4zEkXJ/awmSQkMXjZw6rKzL7LhwubSfMXb3Mptv6yhTvcuj97mZE5f2Rp93udl45mEhaGrRi4zytd9t37HoXI1Va+Ry3tOhagQWxV3/Vq1roGpLg2E3BtSMVhwwIibSA5kpRG3ei2O949277heqbetV5hl4ZMzGJWvEUK6mMMzjzIHI1SFMutr8JyEOc75eIr/LgT5kcI6cmT9rod7hSmncDhMz6nzmxgnrWbgGAQXA6nhwOBv4bBVS5//AM2A/hjwH/QLAAAAAElFTkSuQmCC" />
						<div className="noteDelete" onClick={e => this.clickDeleteNote(e)}>×</div>
					</div>
					<div className="noteContents">
						<textarea style={cStyle} onChange={e => this.doChangeContents(e)}
							value={this.state.contents}>
						</textarea>
					</div>
				</div>
			</Draggable>
		)
	}
}

