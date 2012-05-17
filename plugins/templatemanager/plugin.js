CKEDITOR.plugins.add('templatemanager',
{
    init: function(editor)
    {
        var pluginName = 'templatemanager';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/templatemanager.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton('TemplateManager',
            {
                label: 'Template Manager',
                command: pluginName,
                icon: this.path + 'template.png'
            });
    }
});
