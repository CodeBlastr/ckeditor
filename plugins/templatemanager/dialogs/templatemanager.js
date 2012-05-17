(function()
{
	CKEDITOR.dialog.add( 'templatemanager', function( editor )
		{
			return {
				title : 'Template Manager',
				minWidth : 600,
				minHeight : 600,

				buttons:
				[{
						    type:'button',
						    id:'insert', /* note: this is not the CSS ID attribute! */
						    label: 'Insert',
						    onClick: function(){
						       //action on clicking the button
								var templates = window.frames['templatemanager_iframe'].window.document.forms[0].template_id;								
								var id = 0;
								if (typeof (templates) != 'undefined')
								{
									if (typeof (templates[0]) != 'undefined')
									{
										for (var i = 0; i < templates.length; i++)
										{
											if (templates[i].checked)
											{
												id = templates[i].value;
												break;
											}
										}
									}
									else id = templates.value;
								}

								if (parseInt(id))
								{
									editor.insertHtml(window.frames['templatemanager_iframe'].window.document.forms[0].elements['template_info_'+id].value);
								}
						    }
						},
						{
						    type:'button',
						    id:'save', /* note: this is not the CSS ID attribute! */
						    label: 'Save',
						    onClick: function(){
						       //action on clicking the button
							   window.frames['templatemanager_iframe'].window.document.forms[0].new_template_info.value = editor.getData();
							   window.frames['templatemanager_iframe'].window.document.forms[0].submit ();
						    }
						},
						{
						    type:'button',
						    id:'insert', /* note: this is not the CSS ID attribute! */
						    label: 'Delete',
						    onClick: function(){
						       //action on clicking the button
								var templates = window.frames['templatemanager_iframe'].window.document.forms[0].template_id;
								var id = 0;
								if (typeof (templates) != 'undefined')
								{
									if (typeof (templates[0]) != 'undefined')
									{
										for (var i = 0; i < templates.length; i++)
										{
											if (templates[i].checked)
											{
												id = templates[i].value;
												break;
											}
										}
									}
									else id = templates.value;
								}

								if (parseInt(id))
								{
									window.frames['templatemanager_iframe'].window.location = CKEDITOR.plugins.get( 'templatemanager' ).path + 
										'dialogs/templates.php?template_id=' + id;
								}
						    }
						},
						CKEDITOR.dialog.cancelButton
				],
				
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
									'<iframe name="templatemanager_iframe" src="' + CKEDITOR.plugins.get( 'templatemanager' ).path + 
									'dialogs/templates.php" style="width: 500px; height: 500px; vertical-align: top;"></iframe>'
							}
						]
					}
				]
			};
		});
})();
