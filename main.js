const electron = require('electron')
const path = require('path')
const url = require('url')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow
app.on('ready', createWindow)
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
	if (mainWindow === null) createWindow()
})

function createWindow () {
	mainWindow = new BrowserWindow({width: 1000, height: 700})
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}))
	mainWindow.on('closed', function () {
		mainWindow = null
	})
}


