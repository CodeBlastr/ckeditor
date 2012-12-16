CKEDITOR.editorConfig = function( config ) {
    //config.extraPlugins = 'video_js';

    config.toolbar = [
        {
            name: 'default', 
            items: ['Bold','Italic','-','JustifyLeft','JustifyCenter','JustifyRight','-','NumberedList','BulletedList']
        },
        {
            name: 'default2',
            items: ['Image','Link','Unlink','MediaEmbed']
        },
            '/',
        {
            name: 'extras', 
            items: ['TextColor', 'Underline','Strike','Subscript','Superscript'] 
        },
        {
            name: 'extras2', 
            items: ['Outdent','Indent','Blockquote'] 
        },
        {
            name: 'extras3', 
            items: ['Table','HorizontalRule','PageBreak']
        },
        {
            name: 'extras4', 
            items: ['Format','Font','FontSize']
        },
	  ];
	config.skin = 'moono';
};