CKEDITOR.plugins.add('pagemanager',
{
    init: function(editor)
    {
        var pluginName = 'pagemanager';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/pagemanager.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton('PageManager',
            {
                label: 'Page Manager',
                command: pluginName,
                icon: this.path + 'page.png'
            });
    }
});
