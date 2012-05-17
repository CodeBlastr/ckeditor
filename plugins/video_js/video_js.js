( function(){
  
    var config = {

    width:'',
    height:'',
    
    // TAB - single
    file: '',
    image:'',
    title:'',
  };
  
  function refreshConfig(key, value)
  {
    config[key] = value;
  }

  function processConfig()
  {
    if (config['width']) {
        source_width = config['width'];
    } else {
        source_width = 690;
    }
    if (config['height']) {
        source_height = config['height'];
    } else {
        source_height = 285;
    }
    source_site_host = '';
    if (config['file'].substring(0, 4) != 'http') {
        source_site_host = window.location.protocol + '//' + window.location.host;
    }
    image_site_host = '';
    if (config['image'].substring(0, 4) != 'http') {
        image_site_host = window.location.protocol + '//' + window.location.host;
    }

    code = "<!-- Begin VideoJS --> \n";
    code += "<div class='video-js-box'> \n";
    code += "<video class='video-js' width='" + source_width + "' height='" + source_height + "' controls='controls' preload='auto' poster='" + image_site_host + config['image'] + "'> \n";
    code += "<source src='" + source_site_host + config['file'] + "' /> \n";
    code += "<object id='flash_fallback_1' class='vjs-flash-fallback' width='" + source_width + "' height='" + source_height + "' type='application/x-shockwave-flash' ";
    code += "data='http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf'> \n";
    code += "<param name='movie' value='http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf' /> \n";
    code += "<param name='allowfullscreen' value='true' /> \n";
    code += "<param name='flashvars' value='config={\"playlist\":[\"" + image_site_host + config['image'] + "\", {\"url\": \"" + source_site_host + config['file'] + "\",\"autoPlay\":false,\"autoBuffering\":true}]}' /> \n";
    code += "<img src='" + image_site_host + config['image'] + "' width='" + source_width + "' height='" + source_height + "' alt='Poster Image' title='No video playback capabilities.' /> \n";
    code += "</object> \n";
    code += "</video> \n";
    code += "</div> \n";
    code += "<!-- End VideoJS --> \n";

    return code;
  }

  var Video_JS_Dialog = function(editor){
        return {
            title : 'Video JS - HTML 5 Video Player',
            minWidth : 500,
            minHeight : 100,
            onLoad : function()
            {
                dialog = this;
            },
            
            contents: [{
                /**
                 *  TAB - code  
                 *  simple copy / paste box for embed from youtube, vime, daylymotion etc ... 
                 *  Or see Generated code for JW Player  
                 */                          
                id : 'code',
                label : 'Embed Media Code',
                expand : true,
                elements : [{
                  type :  'textarea',
                  id :    'Code_' + editor.name,
                  rows : 20
                }]
            },
            {
            /**
             *  Dialog for Video JS plays a single video file
             */
            id : 'video_file',
            label : 'Insert Video File',
            expand : true,
            elements : [{
              // BTN - Browse Media File
              type : 'hbox',
              align : 'center',
              widths : [ '80%', '20%'],
              children :[{
                id : 'VideoFile_' + editor.name,
                type : 'text',
                'default' : config['file'],
                onBlur : function(){
                  refreshConfig('file', this.getDialog().getContentElement('video_file', 'VideoFile_' + editor.name).getValue());
                  this.getDialog().getContentElement('code', 'Code_' + editor.name).setValue(processConfig());
                },
                label : 'Video File'
              },
              {
                id : 'BrowseMediaFile_' + editor.name,
                type : 'button',
                hidden : true,                
                filebrowser :
                {
                  action : 'Browse',
                  onSelect : function(fileUrl, data)
                  {
              fileUrl = fileUrl.replace('/app/webroot','');
                    this.getDialog().getContentElement('video_file', 'VideoFile_' + editor.name).setValue(fileUrl);
                    refreshConfig('file', this.getDialog().getContentElement('video_file', 'VideoFile_' + editor.name).getValue());
                    this.getDialog().getContentElement('code', 'Code_' + editor.name).setValue(processConfig());
                  }
                },
                label : 'browse server',
                style : 'margin-top: 12px; float:right'
              }]
            },
            {
              // BTN - Browse Preview Image
              type : 'hbox',
              align : 'center',
              widths : [ '80%', '20%'],
              children :[{
                id : 'VideoImage_' + editor.name,
                type : 'text',
                'default' : config['image'],
                onBlur : function(){
                  refreshConfig('image', this.getDialog().getContentElement('video_file', 'VideoImage_' + editor.name).getValue());
                  this.getDialog().getContentElement('code', 'Code_' + editor.name).setValue(processConfig());
                },
                label : 'Preview Image'
              },
              {
                id : 'BrowseVideoImage_' + editor.name,
                type : 'button',
                hidden : true,                
                filebrowser :
                {
                  action : 'Browse',
                  onSelect : function(fileUrl, data)
                  {
              fileUrl = fileUrl.replace('/app/webroot','');
                    this.getDialog().getContentElement('video_file', 'VideoImage_' + editor.name).setValue(fileUrl);
                    refreshConfig('image', this.getDialog().getContentElement('video_file', 'VideoImage_' + editor.name).getValue());
                    this.getDialog().getContentElement('code', 'Code_' + editor.name).setValue(processConfig());
                  }
                },
                label : 'browse server',
                style : 'margin-top: 12px; float:right'
              }]
            },
            {
              // BOX - 2 columns
              type : 'hbox',
              align : 'center',
              widths : [ '50%', '50%'],
              children :[{
                type : 'vbox',
                children :[{
                  id:  'VideoWidth_' + editor.name,
                  type: 'text',
                  'default': config['width'],
                  onBlur : function(){
                    refreshConfig('width', this.getDialog().getContentElement('video_file', 'VideoWidth_' + editor.name).getValue());
                    this.getDialog().getContentElement('code', 'Code_' + editor.name).setValue(processConfig());
                  },
                  label: 'Width (px)'
                },
                {
                  id:  'VideoHeight_' + editor.name,
                  type: 'text',
                  'default': config['height'],
                  onBlur : function(){
                    refreshConfig('height', this.getDialog().getContentElement('video_file', 'VideoHeight_' + editor.name).getValue());
                    this.getDialog().getContentElement('code', 'Code_' + editor.name).setValue(processConfig());
                  },
                  label: 'Height (px)'
                },
                {
                  id:  'VideoTitle_' + editor.name,
                  type: 'text',
                  'default': config['title'],
                  onBlur : function(){ 
                    refreshConfig('title', this.getDialog().getContentElement('video_file', 'VideoTitle_' + editor.name).getValue());
                    this.getDialog().getContentElement('code', 'Code_' + editor.name).setValue(processConfig());
                  },
                  label: 'title'
                }]
              }]
            }]
          }],
          
          onOk : function() {
            editor.insertHtml("<div id='box'>" + dialog.getContentElement('code', 'Code_' + editor.name).getValue() + "</div>");
          }          
        }
    }
    
    CKEDITOR.dialog.add('video_js', function(editor) {
        return Video_JS_Dialog(editor);
    });
        
})();