(function()
{
	CKEDITOR.dialog.add( 'pagemanager', function( editor )
		{
			return {
				title : 'Page Manager',
				minWidth : 500,
				minHeight : 500,

				onOk : function()
				{
					var pages = window.frames['pagemanager_iframe'].window.document.forms[0].page_id;
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

					if (parseInt(id))
					{
						setTimeout( function()
						{
							editor.fire( 'paste', { 'text' : '{include: pageid' + id + '}' } );
						}, 0 );
					}
				},

				contents :
				[
					{
						label : 'Page Manager',
						id : 'general',
						elements :
						[
							{
								type : 'html',
								id : 'main',
								html :  
									'<iframe name="pagemanager_iframe" src="' + CKEDITOR.plugins.get( 'pagemanager' ).path + 
									'dialogs/get_list_of_pages.php" style="width: 400px; height: 400px; vertical-align: top;"></iframe>'
							}
						]
					}
				]
			};
		});
})();
