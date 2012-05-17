CKEDITOR.plugins.add('wikimanager',
{
    init: function(editor)
    {
        var pluginName = 'wikimanager';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/wikimanager.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton('WikiManager',
            {
                label: 'Wiki Manager',
                command: pluginName,
                icon: this.path + 'page.png'
            });
    }
});
