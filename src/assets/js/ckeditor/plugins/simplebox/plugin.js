CKEDITOR.plugins.add( 'simplebox', {
  requires: 'widget',

  icons: 'simplebox',

  init: function( editor ) {




    editor.on( 'paste', function( evt ) {
      var componentId = evt.data.dataTransfer.getData( 'componentId' );
      var content = evt.data.dataTransfer.getData( 'text/html' );
      if ( !componentId ) {
        return;
      }

      evt.data.dataValue =
          '<div class="requirements" data-requirement-id="'+componentId+'" contenteditable="false">' +
          '<div  class="requirements-id">'+componentId+'</div>'+
          '<div class="requirements-content" contenteditable="false">'+content+'</div>' +
          '</div>';
    } );






    editor.widgets.add( 'simplebox', {
      // Widget code.
      button: 'Create a simple box',

      template:
      '<div class="requirements" data-requirement-id="_NEW">' +
        '<div class="requirements-id">REQ-001</div>'+
        '<div class="requirements-content" contenteditable="false"><label>REQ-001</label></div>' +
      '</div>',

      editables: {
        content: {
          selector: '.requirements-content',
          allowedContent: 'div p br ul ol li strong em table tr td tbody[*](*){*}'
        }
      },
      allowedContent: 'div(!requirements)[!data-requirement-id]; div(!requirements-id);div(!requirements-content)',

      requiredContent: 'div(!requirements)[!data-requirement-id]; div(!requirements-id)',

      upcast: function( element ) {
        return element.name == 'div' && element.hasClass( 'requirements' );
      },

      edit: function() {
          
          
          
        var startContainer = this.editor.getSelection().getRanges()[0].startContainer;

        if (CKEDITOR.NODE_ELEMENT != startContainer.type || startContainer.getName() != "p"){
          startContainer = startContainer.getAscendant("p");
        }
        if (startContainer == null){
          return;
        }

        var content = this.element.findOne(".requirements-content");
        content.setHtml("");
        startContainer.clone(true).appendTo(this.element.findOne(".requirements-content"));
        startContainer.remove(false);

      }

    } );


  }
} );
