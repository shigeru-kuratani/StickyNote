import React from 'react'
import NeDB from 'nedb'
import {Header} from './Header'
import {Note} from './Note'
import {Lane} from './Lane'
import {ColorPicker} from './ColorPicker'

// NeDB
const db = new NeDB({
	filename : './stickynote.db',
	autoload : true
})

// index of note operated currently 
var currentNoteIndex
// flag Whether or not to display color picker
var colorpickerDispFlag = false
// offset top of color picker
var colorPikerTop
// offset left of color picker
var colorPikerLeft

/**
 * Page Component
 * 
 * @author  Shigeru Kuratani
 * @version 1.0.0
 */
export class Page extends React.Component {

	/**
	 * constructor
	 * @param props properties
	 */
	constructor (props) {
		super(props)
		this.state = {
			index     : props.index,
			title     : props.title,
			delflag   : props.delflag,
			zIndex    : props.zIndex,
			noteCnt   : props.noteCnt,
			notes     : props.notes,
			laneCnt   : props.laneCnt,
			lanes     : props.lanes,
		}
	}

	/**
	 * function on change page title
	 * @param e event on target element
	 */
	doChangeTitle (e) {
		const newTitle = e.target.value
		if (this.props.onChangeTitle) {
			this.props.onChangeTitle({
				target : this,
				title  : newTitle
			})
		}
		this.setState({
			title : newTitle
		})
		console.log('index : ' + this.state.index)
		db.loadDatabase((err) => {
			if (err) {
				console.log(err)
				return
			}
			db.update(
				{index : this.state.index},
				{
					index   : this.state.index,
					title   : newTitle,
					delflag : this.state.delflag,
					zIndex  : this.state.zIndex,
					noteCnt : this.state.noteCnt,
					notes   : this.state.notes,
					laneCnt : this.state.laneCnt,
					lanes   : this.state.lanes
				},
				{},
				(err, numAffected) => {
					if (err) {
						console.error(err)
					}
					console.log(numAffected)
				})
		})
	}

	/**
	 * handler on click `Add Note` button
	 * @param e event on target element
	 */
	addNoteHandler (e) {
		this.state.notes.push({
			index    : this.state.noteCnt++,
			title    : 'New Note',
			contents : '',
			delflag  : false,
			zIndex   : ++this.state.zIndex,
			top      : 100,
			left     : 100,
			height   : 50,
			color    : '#f3f300'
		})
		this.setState({
			noteCnt : this.state.noteCnt
		})
		db.loadDatabase((err) => {
			if (err) {
				console.log(err)
				return
			}
			db.update(
				{index : this.state.index},
				{
					index   : this.state.index,
					title   : this.state.title,
					delflag : this.state.delflag,
					zIndex  : this.state.zIndex,
					noteCnt : this.state.noteCnt,
					notes   : this.state.notes,
					laneCnt : this.state.laneCnt,
					lanes   : this.state.lanes
				},
				{},
				(err, numAffected) => {
					if (err) {
						console.error(err)
					}
					console.log(numAffected)
				})
		})
	}

	/**
	 * handler on click `Add Lane` button
	 * @param e event on target element
	 */
	addLaneHandler (e) {
		this.state.lanes.push({
			index    : this.state.laneCnt++,
			title    : 'New Lane',
			delflag  : false,
			width    : 150
		})
		this.setState({
			laneCnt : this.state.laneCnt
		})
		db.loadDatabase((err) => {
			if (err) {
				console.log(err)
				return
			}
			db.update(
				{index : this.state.index},
				{
					index   : this.state.index,
					title   : this.state.title,
					delflag : this.state.delflag,
					zIndex  : this.state.zIndex,
					noteCnt : this.state.noteCnt,
					notes   : this.state.notes,
					laneCnt : this.state.laneCnt,
					lanes   : this.state.lanes
				},
				{},
				(err, numAffected) => {
					if (err) {
						console.error(err)
					}
					console.log(numAffected)
				})
		})
	}

	/**
	 * handler on change note title
	 * @param e event on target element
	 */
	changeNoteTitleHandler (e) {
		this.state.notes[e.noteIndex].title = e.newTitle
		db.update(
			{index : this.state.index},
			{
				index   : this.state.index,
				title   : this.state.title,
				delflag : this.state.delflag,
				zIndex  : this.state.zIndex,
				noteCnt : this.state.noteCnt,
				notes   : this.state.notes,
				laneCnt : this.state.laneCnt,
				lanes   : this.state.lanes
			},
			{},
			(err, numAffected) => {
				if (err) {
					console.error(err)
				}
				console.log(numAffected)
			})
	}

	/**
	 * handler on change note title
	 * @param e event on target element
	 */
	changeNoteContensHandler (e) {
		this.state.notes[e.noteIndex].contents = e.newContents
		this.state.notes[e.noteIndex].height = e.newHeight
		db.update(
			{index : this.state.index},
			{
				index   : this.state.index,
				title   : this.state.title,
				delflag : this.state.delflag,
				zIndex  : this.state.zIndex,
				noteCnt : this.state.noteCnt,
				notes   : this.state.notes,
				laneCnt : this.state.laneCnt,
				lanes   : this.state.lanes
			},
			{},
			(err, numAffected) => {
				if (err) {
					console.error(err)
				}
				console.log(numAffected)
			})
	}

	/**
	 * handler on click note color picker
	 * @param e event on target element
	 */
	clickNoteColorHandler (e) {
		currentNoteIndex = e.noteIndex
		colorpickerDispFlag = true
		colorPikerTop = this.state.notes[e.noteIndex].top - 100;
		colorPikerLeft = this.state.notes[e.noteIndex].left
		this.setState({
			noteCnt : this.state.noteCnt
		})
	}

	/**
	 * handler on delete note
	 * @param e event on target element
	 */
	deleteNoteHandler (e) {
		this.state.notes[e.noteIndex].delflag = true
		this.setState({
			noteCnt : this.state.noteCnt
		})
		db.update(
			{index : this.state.index},
			{
				index   : this.state.index,
				title   : this.state.title,
				delflag : this.state.delflag,
				zIndex  : this.state.zIndex,
				noteCnt : this.state.noteCnt,
				notes   : this.state.notes,
				laneCnt : this.state.laneCnt,
				lanes   : this.state.lanes
			},
			{},
			(err, numAffected) => {
				if (err) {
					console.error(err)
				}
				console.log(numAffected)
			})
	}

	/**
	 * handler on change lane title
	 * @param e event on target element
	 */
	changeLaneTitleHandler (e) {
		this.state.lanes[e.laneIndex].title = e.newTitle
		db.update(
			{index : this.state.index},
			{
				index   : this.state.index,
				title   : this.state.title,
				delflag : this.state.delflag,
				zIndex  : this.state.zIndex,
				noteCnt : this.state.noteCnt,
				notes   : this.state.notes,
				laneCnt : this.state.laneCnt,
				lanes   : this.state.lanes
			},
			{},
			(err, numAffected) => {
				if (err) {
					console.error(err)
				}
				console.log(numAffected)
			})
	}

	/**
	 * handler on delete lane
	 * @param e event on target element
	 */
	deleteLaneHandler (e) {
		this.state.lanes[e.laneIndex].delflag = true
		this.setState({
			noteCnt : this.state.noteCnt
		})
		db.update(
			{index : this.state.index},
			{
				index   : this.state.index,
				title   : this.state.title,
				delflag : this.state.delflag,
				zIndex  : this.state.zIndex,
				noteCnt : this.state.noteCnt,
				notes   : this.state.notes,
				laneCnt : this.state.laneCnt,
				lanes   : this.state.lanes
			},
			{},
			(err, numAffected) => {
				if (err) {
					console.error(err)
				}
				console.log(numAffected)
			})
	}

	/**
	 * handler on change lane width
	 * @param e event on target element
	 */
	changeLaneWidthHandler (e) {
		this.state.lanes[e.laneIndex].width = e.newWidth
		db.update(
			{index : this.state.index},
			{
				index   : this.state.index,
				title   : this.state.title,
				delflag : this.state.delflag,
				zIndex  : this.state.zIndex,
				noteCnt : this.state.noteCnt,
				notes   : this.state.notes,
				laneCnt : this.state.laneCnt,
				lanes   : this.state.lanes
			},
			{},
			(err, numAffected) => {
				if (err) {
					console.error(err)
				}
				console.log(numAffected)
			})
	}

	/**
	 * handler on drag stop note
	 * @param e event on target element
	 */
	dragStopNoteHandler (e) {
		this.state.notes[e.noteIndex].top = (e.y + e.currentTop)
		this.state.notes[e.noteIndex].left = (e.x + e.currentLeft)
		db.update(
			{index : this.state.index},
			{
				index   : this.state.index,
				title   : this.state.title,
				delflag : this.state.delflag,
				zIndex  : this.state.zIndex,
				noteCnt : this.state.noteCnt,
				notes   : this.state.notes,
				laneCnt : this.state.laneCnt,
				lanes   : this.state.lanes
			},
			{},
			(err, numAffected) => {
				if (err) {
					console.error(err)
				}
				console.log(numAffected)
			})
	}

	/**
	 * handler on change note color
	 * @param e event on target element
	 */
	changeNoteColorHandler(e) {
		this.state.notes[currentNoteIndex].color = e.color
		console.log(e.color)
		console.log(currentNoteIndex)
		colorpickerDispFlag = false
		this.setState({
			noteCnt : this.state.noteCnt
		})
		db.update(
			{index : this.state.index},
			{
				index   : this.state.index,
				title   : this.state.title,
				delflag : this.state.delflag,
				zIndex  : this.state.zIndex,
				noteCnt : this.state.noteCnt,
				notes   : this.state.notes,
				laneCnt : this.state.laneCnt,
				lanes   : this.state.lanes
			},
			{},
			(err, numAffected) => {
				if (err) {
					console.error(err)
				}
				console.log(numAffected)
			})
	}

	/**
	 * render method
	 * @return rendering html
	 */
	render () {
		const lanes = []
		for (let i = 0; i < this.state.laneCnt; i++) {
			if (!this.state.lanes[i].delflag) {
				lanes.push(<Lane key={this.state.lanes[i].index}
					index={this.state.lanes[i].index}
					title={this.state.lanes[i].title}
					width={this.state.lanes[i].width}
					onChangeTitle={e => {this.changeLaneTitleHandler(e)}}
					onDelete={e => this.deleteLaneHandler(e)}
					onChangeWidth={e => this.changeLaneWidthHandler(e)} />)
			}
		}
		const notes = []
		for (let i = 0; i < this.state.noteCnt; i++) {
			if (!this.state.notes[i].delflag) {
				notes.push(<Note key={this.state.notes[i].index}
					pageIndex={this.state.index}
					index={this.state.notes[i].index}
					title={this.state.notes[i].title} contents={this.state.notes[i].contents}
					delflag={this.state.notes[i].delflag} zIndex={this.state.notes[i].zIndex}
					top={this.state.notes[i].top} left={this.state.notes[i].left}
					height={this.state.notes[i].height} color={this.state.notes[i].color}
					onChangeTitle={e => this.changeNoteTitleHandler(e)}
					onChangeContents={e => this.changeNoteContensHandler(e)}
					onClickColor={e => this.clickNoteColorHandler(e)}
					onDelete={e => this.deleteNoteHandler(e)}
					onDragStopNote={e => this.dragStopNoteHandler(e)}
					ref="note" />)
			}
		}
		const pickers = []
		if (colorpickerDispFlag) {
			pickers.push(<ColorPicker key="0" top={colorPikerTop} left={colorPikerLeft}
							onChangeNoteColor={e => this.changeNoteColorHandler(e)} />)
		}
		return (
			<div className="page">
				<div className="pageTitle">
					<input type="text" value={this.state.title}
						onChange={e => this.doChangeTitle(e)} />
				</div>
				{lanes}
				{notes}
				{pickers}
			</div>
		)
	}
}


