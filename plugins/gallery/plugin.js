CKEDITOR.plugins.add('gallery',
{
    init: function(editor)
    {
        var pluginName = 'gallery';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/gallery.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton('Gallery',
            {
                label: 'Gallery Manager',
                command: pluginName,
                icon: this.path + 'images/gallery.png'
            });
    }
});





