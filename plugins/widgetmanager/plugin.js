CKEDITOR.plugins.add('widgetmanager',
{
    init: function(editor)
    {
        var pluginName = 'widgetmanager';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/widgetmanager.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton('WidgetManager',
            {
                label: 'Widget Manager',
                command: pluginName,
                icon: this.path + 'widget.png'
            });
        editor.addCss(
                'img.cke_widget' +
                        '{' +
                        'background-image: url(' + CKEDITOR.getUrl(this.path + 'images/placeholder.png') + ');' +
                        'background-position: center center;' +
                        'background-repeat: no-repeat;' +
                        'border: 1px solid #a9a9a9;' +
                        'width: 80px;' +
                        'height: 80px;' +
                        '}'
                );
    }
});
