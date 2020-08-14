import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
	ICommandPalette, MainAreaWidget
} from '@jupyterlab/apputils';
import{
	Widget
}from '@lumino/widgets';
/**
 * Initialization data for the jupyterlab_apod extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-apod',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab-apod is activated!');
    console.log('ICommandPalette:',palette);
    
    //Create a bland content widget inside of a MainAreaWidget
    const content = new Widget();
    const widget = new MainAreaWidget({content});
    widget.id = 'apod-juyterlab';
    widget.title.label = 'Astronmy Picture';
    widget.title.closable = true;

    //Add an application command
    const command: string = 'apod:open';
    app.commands.addCommand(command,{
	    label: 'Hello world',
	    execute: ()=>{
		    if(!widget.isAttached){
			    //attach the widget to the main work area if it's not there
			    app.shell.add(widget,'main');
		    }
		    //Activate the widget
		    app.shell.activateById(widget.id);
   }
  });
  palette.addItem({command,category: 'hello'});
  }
};

export default extension;
