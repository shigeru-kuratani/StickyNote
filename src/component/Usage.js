import React from 'react'
import {Header} from './Header'

/**
 * Usage Component
 * 
 * @author  Shigeru Kuratani
 * @version 1.0.0
 */
export class Usage extends React.Component {

	/**
	 * constructor
	 * @param  props properties
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
			<div id="wrapper">
				<Header />
				<aside>
					<ul className="doc">
						<li>Overview</li>
						<li>Get Started</li>
						<li>Page</li>
						<li>Note</li>
						<li>Lane</li>
					</ul>
				</aside>
				<div id="contents">
					<section>
						<h2>Overview</h2>
						<p>
							StikyNote is an application for managing various tasks using sticky notes.<br />
							You can use it for any management that uses sticky notes.<br />
							e.g. KPT Framework 
						</p>
					</section>
					<section>
						<h2>Get Started</h2>
						<p>
							First, double-click the executable file to start the application.<br />
							After StickyNote starts, change the page title.<br />
							You can add sticky notes and lanes to the page.<br />
							Use it for various task management.
						</p>
					</section>
					<section>
						<h2>Page</h2>
						<p>
							The page acts as a sticky board.<br />
							You can add sticky notes and lanes to sort the sticky notes on the page.<br />
						</p>
					</section>
					<section>
						<h2>Note</h2>
						<p>
							StickyNote calls sticky notes as notes.<br />
							You can change the title, contents, and color of the note.
						</p>
					</section>
					<section>
						<h2>Lane</h2>
						<p>
							You can change the title and width of the lane.<br />
							Place sticky notes in specific lanes to perform task management.
						</p>
					</section>
				</div>
			</div>
		)
	}
}


