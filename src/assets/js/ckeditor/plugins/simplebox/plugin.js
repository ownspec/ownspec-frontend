CKEDITOR.plugins.add('simplebox', {
  requires: 'widget',

  icons: 'simplebox',

  init: function (editor) {


    editor.on('paste', function (evt) {
      var componentId = evt.data.dataTransfer.getData('componentId');
      var workflowInstanceId = evt.data.dataTransfer.getData('workflowInstanceId');
      var isEditable = evt.data.dataTransfer.getData('isEditable');
      var content = evt.data.dataTransfer.getData('text/html');
      if (!componentId) {
        return;
      }

      var html = '<div class="requirements" data-requirement-id="' + componentId + '" data-workflow-instance-id="' + workflowInstanceId + '">' +
        '<div  class="requirements-id">' + componentId + '</div>' +
        '<div class="requirements-content" contenteditable="' + isEditable + '">' + content + '</div>' +
        '</div>';

      evt.data.dataValue = html;

    });


    editor.widgets.add('simplebox', {
      // Widget code.
      button: 'Create a simple box',
      icons: 'placeholder', // %REMOVE_LINE_CORE%
      template: '<div class="requirements" data-requirement-id="_NEW" data-workflow-instance-id="_NEW">' +
      '<div class="requirements-id">REQ-001</div>' +
      '<div class="requirements-content"><label>REQ-001</label></div>' +
      '</div>',

      editables: {
        content: {
          selector: '.requirements-content[contenteditable=true]',
          allowedContent: 'h1 h2 h3 h4 h5 div p br ul ol li strong em table tr td tbody[*](*){*}'
        }
      },
      allowedContent: 'div(!requirements)[!data-requirement-id,!data-workflow-instance-id,contenteditable]; div(!requirements-id);div(!requirements-content)[contenteditable]',

      //requiredContent: 'div(!requirements)[!data-requirement-id,!data-workflow-instance-id]; div(!requirements-id);div(!requirements-content)',

      upcast: function (element) {
        return element.name == 'div' && element.hasClass('requirements');
      },

      edit: function () {


        var startContainer = this.editor.getSelection().getRanges()[0].startContainer;

        if (CKEDITOR.NODE_ELEMENT != startContainer.type || startContainer.getName() != "p") {
          startContainer = startContainer.getAscendant("p");
        }
        if (startContainer == null) {
          return;
        }

        var content = this.element.findOne(".requirements-content");
        content.setHtml("");
        startContainer.clone(true).appendTo(this.element.findOne(".requirements-content"));
        startContainer.remove(false);

      }

    });


  }
});
