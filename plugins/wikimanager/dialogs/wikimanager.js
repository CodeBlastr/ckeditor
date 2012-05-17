(function()
{
	CKEDITOR.dialog.add( 'wikimanager', function( editor )
		{
			return {
				title : 'Wiki Manager',
				minWidth : 400,
				minHeight : 200,

				buttons:
				[{
					    type:'button',
					    id:'insert', /* note: this is not the CSS ID attribute! */
					    label: 'Insert',
					    onClick: function(){

							var pages = window.frames['wikimanager_iframe'].window.document.forms[0].page;								
							var id = 0;
							if (typeof (pages) != 'undefined')
							{
								if (typeof (pages[0]) != 'undefined')
								{
									for (var i = 0; i < pages.length; i++)
									{
										if (pages[i].selected)
										{
											id = pages[i].value;
											break;
										}
									}
								}
								else id = pages.value;
							}

							if (id)
							{
								url=''+window.location;
								url=''+url.substring(0,url.indexOf('/admin'));
								title = id.split('/');
					
								editor.fire( 'paste', { 'html' : '<a href="'+ url +'/wikis/wiki_contents/view/' + id + '"> '+ title[1] +' </a>' } );

							}
					    }
					},
					
					CKEDITOR.dialog.cancelButton
				],
				

				contents :
				[
					{
						label : 'Wiki Manager',
						id : 'general',
						elements :
						[
							{
								type : 'html',
								id : 'main',
								html :  
									'<iframe name="wikimanager_iframe" src="' + CKEDITOR.plugins.get( 'wikimanager' ).path + 
									'dialogs/get_list_of_links.php" style="width: 400px; height: 200px; vertical-align: top;"></iframe>'
							}
						]
					}
				]
			};
		});
})();
