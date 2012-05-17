(function()
{
	CKEDITOR.dialog.add( 'widgetmanager', function( editor )
		{
			return {
				title : 'Widget Manager',
				minWidth : 500,
				minHeight : 500,

				onOk : function()
				{
                    var pages = window.frames['widgetmanager_iframe'].window.document.forms[0].widget_nick;
					var id = 0;
					if (typeof (pages) != 'undefined')
					{
						if (typeof (pages[0]) != 'undefined')
						{
							for (var i = 0; i < pages.length; i++)
							{
								if (pages[i].checked)
								{
									id = pages[i].value;
									break;
								}
							}
						}
						else id = pages.value;
					}

					var editor = this.getParentEditor();
                    var div = CKEDITOR.dom.element.createFromHtml('<div id="123">123</div>');
                    //var element = editor.createFakeElement(div, 'cke_widget', 'div', true);
                    //embedNode = CKEDITOR.dom.element.createFromHtml( '<cke:embed></cke:embed>', editor.document );
                    /*embedNode.setAttributes(
                        {
                            type : 'application/x-shockwave-flash',
                            pluginspage : 'http://www.macromedia.com/go/getflashplayer'
                        } );*/
                    //alert(div.getHtml());
                    element = editor.createFakeElement(div, 'cke_widget', 'div', true);
                    setTimeout( function()
                    {
                        //editor.fire( 'paste', { 'html' : element.getHtml() } );
                        editor.insertElement(element);
                        //editor.fire( 'paste', { 'text' : element } );
                    }, 0 );
				},

				contents :
				[
					{
						label : 'Widget Manager',
						id : 'general',
						elements :
						[
							{
								type : 'html',
								id : 'main',
								html :  
									'<iframe name="widgetmanager_iframe" src="' + CKEDITOR.plugins.get( 'widgetmanager' ).path + 
									'dialogs/get_list_of_widgets.php" style="width: 400px; height: 400px; vertical-align: top;"></iframe>'
							}
						]
					}
				]
			};
		});
})();
