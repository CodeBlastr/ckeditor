/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
function encrypt(str) { 
  //var replace = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "@"); 
 // var by = new Array("f", "9","b", "Z", "W",  "s", "P", "c", "t", "V", "v", "w", "y", "z", "g",  "1", "C", "l", "m", "x", "n", "3", "o","8", "X", "5", "7", "I", "B", "Y", "h", "i", "j", "k", "K", "L", "Q", "T", "U", "u", "R", "J", "p", "q", "r", "N", "d", "A", "a",  "D", "E", "F", "S", "O", "6", "G", "0", "2", "*", "e", "4", "H", "M");  
  var replace = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "3", "5", "7", "9", "@"); 
  var by = new Array("Aort248", "AEt2B48", "o4Ct248", "FrDt2HJ", "REST248", "oMn86F", "wxGCD26", "86FGHsy", "04IxvIz", "KvwLMA4", "86Ft24L8", "oMEt248", "o6nt488", "ort2ort48o", "oxCpDt2xCD", "IqxvM248", "orFrt248", "osrtFGsy", "tooM24a8", "oIxuvIxv", "or2ovwLMA", "wooo4Et", "oAxEt48", "y86Ft24T28", "oFIt2488z", "2Ft24848", "orS4T2488", "wT62488xCD2", "oE8t2t2or", "oM40Ixva", "orMnwLM", "ot24vt48");  
  
  for (var i=0; i<replace.length; i++) { 
     str = str.replace(new RegExp(replace[i],"g"), by[i]); 
	 delete by[i];
  } 
  return str; 
} 

CKEDITOR.dialog.add( 'form', function( editor )
{
	var autoAttributes =
	{
		action : 1,
		id : 1,
		method : 1,
		enctype : 1,
		target : 1
	};
	
	var customAction = {
		contactForm : {
			name: 'Contact Form',
			action: CKEDITOR.basePath + 'email_process.php'
		},
		leadForm : {
			name: 'Lead Form',
			action: '/contacts/lead/'
		},
		customForm : {
			name: 'Custom URL',
			action: ''
		}
	}
	
	return {
		title : editor.lang.form.title,
		minWidth : 350,
		minHeight : 200,
		onShow : function()
		{
			delete this.form;

			var element = this.getParentEditor().getSelection().getStartElement();
			var form = element && element.getAscendant( 'form', true );
			if ( form )
			{
				this.form = form;
				this.setupContent( form );
			}
		},
		onOk : function()
		{
			var editor,
				element = this.form,
				isInsertMode = !element;

			if ( isInsertMode )
			{
				editor = this.getParentEditor();
				element = editor.document.createElement( 'form' );
				editor.insertElement( element );
			}

			this.commitContent( element );
			
			isInsertMode && element.append( editor.document.createElement( 'br' ) );
		},
		onLoad : function()
		{
			function autoSetup( element )
			{
				this.setValue( element.getAttribute( this.id ) || '' );
			}

			function autoCommit( element )
			{
				if ( this.getValue() )
					element.setAttribute( this.id, this.getValue() );
				else
					element.removeAttribute( this.id );
			}

			this.foreach( function( contentObj )
				{
					if ( autoAttributes[ contentObj.id ] )
					{
						contentObj.setup = autoSetup;
						contentObj.commit = autoCommit;
					}
				} );
		},
		contents : [
			{
				id : 'info',
				label : editor.lang.form.title,
				title : editor.lang.form.title,
				elements : [
					{
						id : 'txtName',
						type : 'text',
						label : editor.lang.common.name,
						'default' : '',
						accessKey : 'N',
						setup : function( element )
						{
							this.setValue( element.getAttribute( '_cke_saved_name' ) ||
									element.getAttribute( 'name' ) ||
									'' );
						},
						commit : function( element )
						{
							if ( this.getValue() )
								element.setAttribute( '_cke_saved_name', this.getValue() );
							else
							{
								element.removeAttribute( '_cke_saved_name' );
								element.removeAttribute( 'name' );
							}
						}
					},
					{
						id : 'customAction',
						type : 'select',
						style : 'width:100%',
						label : editor.lang.form.action,
						'default' : '',
						accessKey : 'T',
						items: 
						[
							[ customAction['customForm']['name'] ],
							[ customAction['contactForm']['name'] ],
							[ customAction['leadForm']['name'] ]

						],
						onChange: function( element ) {
							var value = this.getValue(),
								element,
								dialog = this.getDialog();
							
						
							for ( var i in customAction )
							{
								element = dialog.getContentElement( 'info', i );
								if ( !element )
									continue;
									
								if ( customAction[i]['name'] == value)
								{
									customAction.state = i;
									element.getElement().show();
								}
								else 
								{
									element.getElement().hide();
								}
							}
						},
						commit : function( form )
						{
							var value = this.getValue();
							form.removeAttribute('action');
							for ( var i in customAction )
							{
								if (customAction[i]['name'] == value && customAction[i]['action'] )
								{
									// Set action form with pre value setup
									form.setAttribute('action', customAction[i]['action'] );
									break;
								} 
							}
							
						}
					},
					{
						type : 'hbox',
						widths : [ '45%', '55%' ],
						children :
						[
							{
								id : 'id',
								type : 'text',
								label : editor.lang.common.id,
								'default' : '',
								accessKey : 'I'
							},
							{
								id : 'enctype',
								type : 'select',
								label : editor.lang.form.encoding,
								style : 'width:100%',
								accessKey : 'E',
								'default' : '',
								items :
								[
									[ '' ],
									[ 'text/plain' ],
									[ 'multipart/form-data' ],
									[ 'application/x-www-form-urlencoded' ]
								]
							}
						]
					},
					{
						type : 'hbox',
						widths : [ '45%', '55%' ],
						children :
						[
							{
								id : 'target',
								type : 'select',
								label : editor.lang.common.target,
								style : 'width:100%',
								accessKey : 'M',
								'default' : '',
								items :
								[
									[ editor.lang.common.notSet, '' ],
									[ editor.lang.common.targetNew, '_blank' ],
									[ editor.lang.common.targetTop, '_top' ],
									[ editor.lang.common.targetSelf, '_self' ],
									[ editor.lang.common.targetParent, '_parent' ]
								]
							},
							{
								id : 'method',
								type : 'select',
								label : editor.lang.form.method,
								accessKey : 'M',
								'default' : 'POST',
								items :
								[
									[ 'GET', 'get' ],
									[ 'POST', 'post' ]
								]
							}
						]
					},
					{
						type: 'vbox',
						id	: 'contactForm',
						style : 'display:none',
						//widths : [ '45%', '55%' ],
						children:
						[
							{
								id : 'sendToMail',
								type: 'text',
								label: 'Send to mail:',
								commit : function( form )
								{
									var value = this.getValue();
									if (!value || customAction.state != 'contactForm') return;	
									var hidden = editor.document.createElement( 'input' , {
										attributes: {
											type: 'hidden',
											name: 'sendto',
											value: encrypt(value)
										}
									});
									form.append(hidden);
									
									var label = editor.document.createText( 'Comments' );
									form.append(label);
									
									var textarea = editor.document.createElement( 'textarea' , {
										attributes: {
											name: 'comments'
										}
									});
									form.append(textarea);
									
									var button = editor.document.createElement( 'input' , {
										attributes: {
											type: 'submit',
											name: 'submit',
											value: 'Submit'
										}
									});
									form.append(button);
								}
							},
							{
								id : 'subject',
								type: 'text',
								label: 'Subject:',
								commit : function( form )
								{
									var value = this.getValue();
									if (!value || customAction.state != 'contactForm') return;	
									var hidden = editor.document.createElement( 'input' , {
										attributes: {
											type: 'hidden',
											name: 'subject',
											value: value
										}
									});
									form.append(hidden);
								}
							},
							{
								id : 'redirectUrl',
								type: 'text',
								label: 'Redirect Url:',
								commit : function( form )
								{
									var value = this.getValue();
									if (!value || customAction.state != 'contactForm') return;	
									var hidden = editor.document.createElement( 'input' , {
										attributes: {
											type: 'hidden',
											name: 'redirectUrl',
											value: value
										}
									});
									form.append(hidden);
								}
							}
							
						],
						
					},
					{
						type: 'vbox',
						id	: 'leadForm',
						style : 'display:none',
						//widths : [ '45%', '55%' ],
						children:
						[
							{
								id : 'emailField',
								type: 'checkbox',
								label: 'Email Input',
								commit : function( form )
								{									
									var value = this.getValue();
									if (!value || customAction.state != 'leadForm') return;	
									
									var label = editor.document.createText( 'Email' );
									form.append(label);
									
									var input = editor.document.createElement( 'input' , {
										attributes: {
											type: 'text',
											name: 'email'
										}
									});
									form.append(input);
									
									var button = editor.document.createElement( 'input' , {
										attributes: {
											type: 'submit',
											name: 'submit',
											value: 'Submit'
										}
									});
									form.append(button);
								}
							},
							{
								id : 'redirectUrl',
								type: 'text',
								label: 'Redirect Url:',
								commit : function( form )
								{
									var value = this.getValue();
									if (!value || customAction.state != 'leadForm') return;	
									var input = editor.document.createElement( 'input' , {
										attributes: {
											type: 'hidden',
											name: 'redirectUrl',
											value: value
										}
									});
									form.append(input);
								}
							}
							
						],
						
					},
					{
						type: 'hbox',
						id	: 'customForm',
						label : 'Custom Action',
						style : 'display:block;width: 100%',
						type : 'text',
						commit : function( form )
						{
							var value = this.getValue();
							if (!value || customAction.state != 'customForm')  return;
							
							// Set action form with dyanmic value
							form.setAttribute('action', value);
						}
					}
				]
			}
		]
	};
});

/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

//CKEDITOR.dialog.add('form',function(a){var b={action:1,id:1,method:1,enctype:1,target:1};return{title:a.lang.form.title,minWidth:350,minHeight:200,onShow:function(){var e=this;delete e.form;var c=e.getParentEditor().getSelection().getStartElement(),d=c&&c.getAscendant('form',true);if(d){e.form=d;e.setupContent(d);}},onOk:function(){var c,d=this.form,e=!d;if(e){c=this.getParentEditor();d=c.document.createElement('form');d.append(c.document.createElement('br'));}if(e)c.insertElement(d);this.commitContent(d);},onLoad:function(){function c(e){this.setValue(e.getAttribute(this.id)||'');};function d(e){var f=this;if(f.getValue())e.setAttribute(f.id,f.getValue());else e.removeAttribute(f.id);};this.foreach(function(e){if(b[e.id]){e.setup=c;e.commit=d;}});},contents:[{id:'info',label:a.lang.form.title,title:a.lang.form.title,elements:[{id:'txtName',type:'text',label:a.lang.common.name,'default':'',accessKey:'N',setup:function(c){this.setValue(c.data('cke-saved-name')||c.getAttribute('name')||'');},commit:function(c){if(this.getValue())c.data('cke-saved-name',this.getValue());else{c.data('cke-saved-name',false);c.removeAttribute('name');}}},{id:'action',type:'text',label:a.lang.form.action,'default':'',accessKey:'T'},{type:'hbox',widths:['45%','55%'],children:[{id:'id',type:'text',label:a.lang.common.id,'default':'',accessKey:'I'},{id:'enctype',type:'select',label:a.lang.form.encoding,style:'width:100%',accessKey:'E','default':'',items:[[''],['text/plain'],['multipart/form-data'],['application/x-www-form-urlencoded']]}]},{type:'hbox',widths:['45%','55%'],children:[{id:'target',type:'select',label:a.lang.common.target,style:'width:100%',accessKey:'M','default':'',items:[[a.lang.common.notSet,''],[a.lang.common.targetNew,'_blank'],[a.lang.common.targetTop,'_top'],[a.lang.common.targetSelf,'_self'],[a.lang.common.targetParent,'_parent']]},{id:'method',type:'select',label:a.lang.form.method,accessKey:'M','default':'GET',items:[['GET','get'],['POST','post']]}]}]}]};});
