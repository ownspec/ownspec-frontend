CKEDITOR.plugins.add('ownspec_component', {
  requires: 'widget',

  icons: 'ownspec_component',

  init: function (editor) {


    editor.on('paste', function (evt) {

      if (!evt.data.dataTransfer.getData('component')) {
        return;
      }

      var component = JSON.parse(evt.data.dataTransfer.getData('component'));

      if (component.type != 'RESOURCE') {

        evt.data.dataValue = '<div class="requirements" data-os-cv-id="' + component.id + '">' +
          '<div  class="requirements-id">' + component.code + '</div>' +
          '<div class="requirements-content" contenteditable="' + component.editable + '"></div>' +
          '</div>';

        var r = editor.fire("fetch-ownspec-cv-content", {id: component.id});
        r.observable.subscribe(function (r) {
          jQuery(editor.container.$).find(".requirements[data-os-cv-id='" + component.id + "'] .requirements-content").html(r);
        });

      } else {
        evt.data.dataValue = '<img src="' + component.url + '" data-os-cv-id="' + component.id + '">';
      }


    });


    editor.widgets.add('ownspec_component', {
      // Widget code.
      //button: 'Create a component',
      icons: 'ownspec_component', // %REMOVE_LINE_CORE%
      template: '<div class="requirements" data-os-cv-id="_NEW">' +
      '<div class="requirements-id">REQ-001</div>' +
      '<div class="requirements-content"><label>REQ-001</label></div>' +
      '</div>',

      editables: {
        content: {
          selector: '.requirements-content[contenteditable=true]',
          allowedContent: 'span img h1 h2 h3 h4 h5 div p br ul ol li strong em table tr td tbody[*](*){*}'
        }
      },
      allowedContent: 'div(!requirements)[!data-os-cv-id,contenteditable]; div(!requirements-id);div(!requirements-content)[contenteditable]',

      //requiredContent: 'div(!requirements)[!data-requirement-id,!data-workflow-instance-id]; div(!requirements-id);div(!requirements-content)',

      upcast: function (element) {
        return element.name == 'div' && element.hasClass('requirements');
      },

      init: function () {

        var that = this;

        //var isSelected =

        editor.on('selectionChange', function () {

          var widgetHoldingFocusedEditable = editor.widgets.widgetHoldingFocusedEditable;

          if (!that.wrapper || !that.wrapper.$){
            return;
          }

          if (!!widgetHoldingFocusedEditable && that.id === widgetHoldingFocusedEditable.id) {
            //jQuery(that.wrapper.$).find("> .requirements").addClass("requirements-focused");
            that.wrapper.findOne("> .requirements").addClass("requirements-focused");

          } else {
            //jQuery(that.wrapper.$).find("> .requirements").removeClass("requirements-focused");
            that.wrapper.findOne("> .requirements").removeClass("requirements-focused");
          }


        });

        this.wrapper.findOne("> .requirements > .requirements-id").on("click" , function(){
          var cvId = that.wrapper.findOne("> .requirements").getAttribute("data-os-cv-id");
          editor.fire("ownspec-select-cv-id", {id: cvId});

        });

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

    editor.ui.addButton('ownspec_component', {
      label: 'Create a component',
      command: 'ownspec_component',
      toolbar: 'ownspec'
    })


  }
});
