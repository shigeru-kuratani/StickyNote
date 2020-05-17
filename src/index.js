import React from 'react'
import ReactDOM from 'react-dom'
import {
	BrowserRouter as Router,
	Route,
	Redirect
} from 'react-router-dom'
import NeDB from 'nedb'
import path from 'path'
import {MainApp} from './component/MainApp'
import {Usage} from './component/Usage'

// NeDB
const db = new NeDB({
	filename : './stickynote.db',
	autoload : true
})

/**
 * routing component 
 * 
 * @author  Shgieru Kuratani
 * @version 1.0.0
 */
class App extends React.Component {

	/**
	 * render method
	 * @return routeing html
	 */
	render () {
		return (
			<Router>
				<Route path='/usage' component={Usage} />
				<Route path='/app'
					render={() => <MainApp pageData={pageData} pageCnt={pageData.length} />} />
				<Route render={() => <Redirect to="/app"/>}/>
			</Router>
		)
	}
}

// initialize app
db.find({}).exec((err, data) => {
	if (err) {
		console.error(err)
		return
	}
	if (data.length === 0) {
		db.insert({
			index   : 0,
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
			launchApp()
		})
	} else {
		launchApp()
	}
})

/**
 * launch App
 */
var pageData = null
function launchApp () {
	db.find({}).sort({index:1}).exec((err, data) => {
		if (err) {
			console.error(err)
			return
		}
		pageData = data
		ReactDOM.render(
			<App />,
			document.getElementById('root')
		)		
	})
}


