import React from 'react'
import NeDB from 'nedb'
import path from 'path'
import {Header} from './Header'
import {Page} from './Page'

// NeDB
const db = new NeDB({
	filename : './stickynote.db',
	autoload : true
})

/**
 * Main Component of StickyNote App
 * 
 * @author  Shigeru Kuratani
 * @version 1.0.0
 */
export class MainApp extends React.Component {

	/**
	 * constructor
	 * @param  props properties
	 */
	constructor (props) {
		super(props)
		let pageIndex = 0
		for (let i = 0; i < props.pageCnt; i++) {
			if (!props.pageData[i].delflag) {
				pageIndex = i
				break
			}
		}
		this.state = {
			pages     : props.pageData,
			pageCnt   : props.pageCnt,
			pageIndex : pageIndex,
		}
	}

	/**
	 * handler on click `Add Page` button
	 * @param e event on target element
	 */
	addPageHandler (e) {
		this.state.pageIndex = this.state.pageCnt++
		this.state.pages[this.state.pageIndex] = {
			index   : this.state.pageIndex,
			title   : "New Page",
			delflag : false,
			zIndex  : 0,
			noteCnt : 0,
			notes   : [],
			laneCnt : 0,
			lanes   : []
		}
		this.setState({
			pageCnt : this.state.pageCnt
		})
		db.insert({
			index   : this.state.pageIndex,
			title   : "New Page",
			delflag : false,
			zIndex  : 0,
			noteCnt : 0,
			notes   : [],
			laneCnt : 0,
			lanes   : []
		}, (err, doc) => {
			if (err) {
				console.error(err)
				return
			}
			console.log(doc)
		})
	}

	/**
	 * handler on click `Delete Page` button
	 * @param e event on target element
	 */
	deletePageHandler (e) {
		const delPageIndex = this.state.pageIndex
		this.state.pages[this.state.pageIndex].delflag = true

		const visiblePageCnt = this.state.pages
			.filter(o => !o.delflag).length
		if (visiblePageCnt === 0) {
			this.state.pageIndex = this.state.pageCnt++
			this.state.pages[this.state.pageIndex] = {
				index   : this.state.pageIndex,
				title   : "New Page",
				delflag : false,
				zIndex  : 0,
				noteCnt : 0,
				notes   : [],
				laneCnt : 0,
				lanes   : []
			}
			db.insert({
				index   : this.state.pageIndex,
				title   : "New Page",
				delflag : false,
				zIndex  : 0,
				noteCnt : 0,
				notes   : [],
				laneCnt : 0,
				lanes   : []
			}, (err, doc) => {
				if (err) {
					console.error(err)
					return
				}
				console.log(doc)
			})
		} else {
			let pageIndex = 0
			for (let i = 0; i < this.state.pageCnt; i++) {
				if (!this.state.pages[i].delflag) {
					pageIndex = i
					break
				}
			}
			this.state.pageIndex = pageIndex
		}
		this.setState({
			noteCnt : this.state.noteCnt
		})

		db.update(
			{index : delPageIndex},
			{
				index   : this.state.pages[delPageIndex].index,
				title   : this.state.pages[delPageIndex].title,
				delflag : this.state.pages[delPageIndex].delflag,
				zIndex  : this.state.pages[delPageIndex].zIndex,
				noteCnt : this.state.pages[delPageIndex].noteCnt,
				notes   : this.state.pages[delPageIndex].notes,
				laneCnt : this.state.pages[delPageIndex].laneCnt,
				lanes   : this.state.pages[delPageIndex].lanes
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
	 * handler on click `Add Note` button
	 * @param e event on target element
	 */
	addNoteHandler (e) {
		this.refs.page.addNoteHandler(e)
	}

	/**
	 * handler on click `Add Lane` button
	 * @param e event on target element
	 */
	addLaneHandler (e) {
		this.refs.page.addLaneHandler(e)
	}

	/**
	 * handler on change note title
	 * @param e event on target element
	 */
	changeTitleHandler (e) {
		const newTitle = e.title
		this.state.pages[this.state.pageIndex].title = newTitle
		this.setState({
			pageCnt : this.state.pageCnt
		})
	}

	/**
	 * handler on click page title
	 * @param e event on target element
	 * @param pageIndex page index of moving to
	 */
	clickPageTitleHandler (e, pageIndex) {
		db.loadDatabase((err) => {
			if (err) {
				console.log(err)
				return
			}
			db.find({}).sort({index:1}).exec((err, data) => {
				if (err) {
					console.error(err)
					return
				}
				this.state.pages = data
				this.setState({
					pageIndex : pageIndex
				})
			})
		})
	}

	/**
	 * render method
	 * @return rendering html
	 */
	render () {
		const pages = []
		for (let i = 0; i < this.state.pageCnt; i++) {
			if (i === this.state.pageIndex) {
				if (!this.state.pages[i].delflag) {
					pages.push(<Page key={this.state.pages[i].index} index={this.state.pages[i].index}
						title={this.state.pages[i].title} delflag={this.state.pages[i].delflag}
						zIndex={this.state.pages[i].zIndex}
						noteCnt={this.state.pages[i].noteCnt} notes={this.state.pages[i].notes}
						laneCnt={this.state.pages[i].laneCnt} lanes={this.state.pages[i].lanes}
						ref="page" onChangeTitle={e => this.changeTitleHandler(e)} />)
				}
			}
		}
		const pageTitles = []
		for (let i = 0; i < this.state.pageCnt; i++) {
			if (!this.state.pages[i].delflag) {
				pageTitles.push(
					<li key={this.state.pages[i].index}
						onClick={e => this.clickPageTitleHandler(e, this.state.pages[i].index)}>
						{this.state.pages[i].title}
					</li>
				)
			}
		}
		return (
			<div id="wrapper">
				<Header />
				<aside>
				   <ul>
						<li onClick={e => this.addPageHandler(e)}>New Page</li>
						<li onClick={e => this.deletePageHandler(e)}>Delete Page</li>
						<li onClick={e => this.addNoteHandler(e)}>Add Note</li>
						<li onClick={e => this.addLaneHandler(e)}>Add Lane</li>
					</ul>
					<ul className="page">
						{pageTitles}
					</ul>
				</aside>
				<div id="contents">
					{pages}
				</div>
			</div>
		)
	}
}


