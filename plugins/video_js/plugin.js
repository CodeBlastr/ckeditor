CKEDITOR.plugins.add('video_js',
{
    init: function(editor)
    {
        var pluginName = 'video_js';
        CKEDITOR.dialog.add(pluginName, this.path + 'video_js.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton('Video_JS',
            {
                label: 'Video JS',
                command: pluginName,
                icon: this.path + 'video-js.png'
            });
    }
});
