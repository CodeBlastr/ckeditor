(function()
{
	CKEDITOR.dialog.add( 'gallery', function( editor )
		{
			return {
				title : 'Gallery Manager',
				minWidth : 600,
				minHeight : 200,

				buttons:
				[{
						    type:'button',
						    id:'insert', /* note: this is not the CSS ID attribute! */
						    label: 'Insert',
						    
						   
				}],		
				contents :
				[
					{
						label : 'Photos Manager',
						id : 'general',
						elements :
						[
							{
								type : 'html',
								id : 'main',
								html :  
									'<iframe name="gallery_iframe" src="' + CKEDITOR.plugins.get( 'gallery' ).path + 
									'dialogs/frame.php" style="width: 500px; height: 500px; vertical-align: top;"></iframe>'
							}
						]
					},
					
					{
						label : 'Setting',
						id : 'Setting',
						elements :
						[
							{
								type : 'html',
								id : 'mai',
								html :  
									'<iframe name="gallery_iframe" src="' + CKEDITOR.plugins.get( 'gallery' ).path + 
									'dialogs/frame.php?id=s" style="width: 500px; height: 500px; vertical-align: top;"></iframe>'
							}
						]
					}
				]
			};
		});
})();
