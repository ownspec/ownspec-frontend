CKEDITOR.plugins.add( 'toc', {
  requires: 'widget',

  icons: 'toc',
    
  init: function( editor ) {

    editor.widgets.add( 'toc', {
      // Widget code.
      button: 'toc',

      template:
      '<div class="toc" data-requirement-id="_NEW">' +
      window.foo+
      '</div>',

/*
      editables: {
        content: {
          selector: '.requirements-content',
          allowedContent: 'p br ul ol li strong em'
        }
      },
      allowedContent: 'div(!requirements)[!data-requirement-id]; div(!requirements-id);div(!requirements-content)',

      requiredContent: 'div(!requirements)[!data-requirement-id]; div(!requirements-id);div(!requirements-content)',
*/

      upcast: function( element ) {
        return element.name == 'div' && element.hasClass( 'toc' );
      },

     /* edit: function() {
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

      }*/

    } );


  }
} );
