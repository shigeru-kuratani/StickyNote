import React from 'react'
import {Link} from 'react-router-dom'

/**
 * Header Component
 * 
 * @author  Shigeru Kuratani
 * @version 1.0.0
 */
export class Header extends React.Component {

	/**
	 * constructor
	 * @param props properties
	 */
	constructor (props) {
		super(props)
		this.state = {}
	}

	/**
	 * render method
	 * @return rendering html
	 */
	render () {
		return (
			<div>
				<header>
					<h1>StickyNote</h1>
					<menu>
						{window.location.pathname !== '/app' && (
		                    <Link to="/app">Back</Link>
		                )}
		                {window.location.pathname === '/app' && (
		                    <Link to="/usage">Usage</Link>
		                )}
					</menu>
				</header>
			</div>
		)
	}
}
