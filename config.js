/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#DCF3D6';

	//config.extraPlugins = 'gallery,pagemanager,templatemanager,wikimanager,media,widgetmanager,video_js';
    config.extraPlugins = 'media,video_js,autogrow';

	config.toolbar_Full =
	  [	   
    	  //['Source','-','Save','NewPage','Preview','-','Templates'],
	      //['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
	      //['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
	      //['Gallery','-', 'PageManager', 'WidgetManager','-','TemplateManager','-','WikiManager','-','Media', 'Video_JS'],
    	  ['Source','-','Maximize','ShowBlocks','Templates','Copy','Paste'],
	      ['Undo','Redo','-','Replace','-','RemoveFormat'],
	      ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
	      ['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
	      ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
	      ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
	      ['Link','Unlink','Anchor'],
	      ['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
	      //['Styles','Format','Font','FontSize'],
	      ['Format','Font','FontSize'],
	      ['TextColor','BGColor'],
          ['Media', 'Video_JS'],
	  ];
	  
	config.toolbar_Basic =
	  [
	    ['Bold', 'Italic', 'Underline','Strike', 'Font','FontSize', 'TextColor', 'BGColor', '-', 'NumberedList', 'BulletedList', 'Outdent','Indent','Blockquote','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock', '-', 'Link', 'Unlink','-', 'ImageButton']
	  ];
	  // idk what these other ones are.. but the last adds right-click for the Media plugin
	config.menu_groups = 'clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,removeMedia';
	 //config.contentsCss = '/theme/default/css/screen.css';
	//config.extraPlugins = 'autogrow';
	config.autoGrow_maxHeight = '800';
    config.autoGrow_onStartup = true;
	config.enterMode = CKEDITOR.ENTER_BR;
	config.skin = 'zuha'; 
    
};