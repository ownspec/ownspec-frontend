CKEDITOR.plugins.add('ownspec_component', {
  requires: 'widget',

  icons: 'ownspec_component',

  init: function (editor) {
    var osWidgetRepo = {};

    function releaseWidgetLock(cvId, widgetId) {

      var isDestroyedWidgetOwnsEditableToken = false;

      if (osWidgetRepo[cvId]) {
        if (osWidgetRepo[cvId][widgetId]) {
          var curWidget = editor.widgets.instances[widgetId];
          isDestroyedWidgetOwnsEditableToken = curWidget.wrapper.findOne("> .requirements > .requirements-content").getAttribute("contenteditable") == "true";
          delete osWidgetRepo[cvId][widgetId];
        }

        // Editable token has to be reassigned
        if (isDestroyedWidgetOwnsEditableToken) {
          _.forEach(osWidgetRepo[cvId], function (value, curWidgetId) {
            var curWidget = editor.widgets.instances[curWidgetId];
            if (!!curWidget) {
              curWidget.wrapper.findOne("> .requirements > .requirements-content").setAttribute("contenteditable", true);
              curWidget.wrapper.findOne("> .requirements > .requirements-content").setAttribute("data-os-editable", true);
              osWidgetRepo[cvId][curWidgetId].editable = true;
              return false;
            }
          });
        }
      }
    }

    function generateComponentTags(id, code, loaded, editable) {
      return '<div class="requirements" data-os-cv-id="' + id + '" data-os-cv-loaded="' + loaded + '">' +
        '<div  class="requirements-id">' + code + '</div>' +
        '<div class="requirements-content" contenteditable="' + editable + '" data-os-editable="' + editable + '"></div>' +
        '</div>';
    }


    editor.on('paste', function (evt) {

      if (!evt.data.dataTransfer.getData('component')) {
        return;
      }

      var component = JSON.parse(evt.data.dataTransfer.getData('component'));

      if (component.type != 'RESOURCE') {

        evt.data.dataValue = generateComponentTags(component.id, component.code, false, component.editable);

        /*var r = editor.fire("fetch-ownspec-cv-content", {id: component.id});
         r.observable.subscribe(function (r) {
         jQuery(editor.container.$).find(".requirements[data-os-cv-id='" + component.id + "'] .requirements-content").html(r);
         });*/

      } else {
        evt.data.dataValue = '<img src="' + component.url + '" data-os-cv-id="' + component.id + '">';
      }


    });

    /**
     * Synchronize change made on editable component version to non editable component version
     */
    function synchronizeChange() {
      editor.widgets.checkWidgets();

      _.forEach(osWidgetRepo, function (osWidgets, cvId) {
        // Find the editable widget
        var activeWidgetEntry = _.find(osWidgets, function (v, k) {
          return v.editable;
        });

        if (!activeWidgetEntry) {
          // It may happens when the active widget is deleted, but the releaseWidgetLock has not yet been called
          return;
        }

        // Get its content
        var activeWidget = editor.widgets.instances[activeWidgetEntry.widgetId];
        var html = activeWidget.wrapper.findOne("> .requirements > .requirements-content").getHtml();
        // Paste its content to non editable widget
        _.forEach(osWidgets, function (v, k) {
          if (!v.editable) {
            var curWidget = editor.widgets.instances[v.widgetId];

            curWidget.wrapper.findOne("> .requirements > .requirements-content").setHtml(html);

            var nodeList = curWidget.wrapper.findOne("> .requirements > .requirements-content").find(".requirements-content");
            for (var ite = 0; ite < nodeList.count(); ite++) {
              // Revert editable to false
              nodeList.getItem(ite).setAttribute("contenteditable", "false");
              nodeList.getItem(ite).setAttribute("data-os-editable", "false");
            }

          }
        });
      });

    }

    var synchronizeChangeDebounced = _.debounce(synchronizeChange, 2500, {'maxWait': 10000});

    // CKEditor change event
    editor.on('change', function () {
      synchronizeChangeDebounced();
    });


    var w = editor.widgets.add('ownspec_component', {
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
      allowedContent: 'div(!requirements)[!data-os-cv-id,contenteditable,data-os-editable,data-os-cv-loaded]; div(!requirements-id);div(!requirements-content)[contenteditable,data-os-editable]',

      //requiredContent: 'div(!requirements)[!data-requirement-id,!data-workflow-instance-id]; div(!requirements-id);div(!requirements-content)',

      /*      downcast:function(){
       return this.wrapper.nestedEditable.getData();
       //return this.wrapper.getHtml();
       },*/

      upcast: function (element) {
        return element.name == 'div' && element.hasClass('requirements');
      },

      init: function () {

        var that = this;

        // Handle vertical bar highlighting
        editor.on('selectionChange', function () {
          // Get current focused widget
          var widgetHoldingFocusedEditable = editor.widgets.widgetHoldingFocusedEditable;

          if (!that.wrapper || !that.wrapper.$) {
            return;
          }

          if (!!widgetHoldingFocusedEditable && that.id === widgetHoldingFocusedEditable.id) {
            that.wrapper.findOne("> .requirements").addClass("requirements-focused");
          } else {
            that.wrapper.findOne("> .requirements").removeClass("requirements-focused");
          }

        });

        this.wrapper.findOne("> .requirements > .requirements-id").on("click", function () {
          var cvId = that.wrapper.findOne("> .requirements").getAttribute("data-os-cv-id");
          editor.fire("ownspec-select-cv-id", {id: cvId});

        });


        var osCvId = that.wrapper.findOne("> .requirements").getAttribute("data-os-cv-id");
        var isCvLoaded = that.wrapper.findOne("> .requirements").getAttribute("data-os-cv-loaded") != "false";

        if (!osWidgetRepo[osCvId]) {
          osWidgetRepo[osCvId] = {};
        }

        if (_.size(osWidgetRepo[osCvId]) > 0) {
          // A widget for the same CV is already instanciated
          that.wrapper.findOne("> .requirements > .requirements-content").setAttribute("contenteditable", false);
          that.wrapper.findOne("> .requirements > .requirements-content").setAttribute("data-os-editable", false);
        } else {
          that.wrapper.findOne("> .requirements > .requirements-content").setAttribute("data-os-editable", true);
        }

        osWidgetRepo[osCvId][this.id] = {
          osCvId: osCvId,
          widgetId: this.id,
          editable: _.size(osWidgetRepo[osCvId]) == 0
        };


        this.on("destroy", function (e) {
          console.log("destroy ", this);
          releaseWidgetLock(osCvId, that.id);
        });


        /*var r = editor.fire("fetch-ownspec-cv-content", {id: component.id});
         r.observable.subscribe(function (r) {
         jQuery(editor.container.$).find(".requirements[data-os-cv-id='" + component.id + "'] .requirements-content").html(r);
         });*/
        if (!isCvLoaded) {
          editor.ownspec.componentVersionService.getResolvedContent(osCvId).subscribe(function (r) {
            that.wrapper.findOne("> .requirements > .requirements-content").setHtml(r);
          });
        }


      },

      edit: function () {

        // TODO: improve the selection handling: cross boundary...
        var that = this;
        var startContainer = that.editor.getSelection().getRanges()[0].startContainer;
        //var startContainer = that.editor.getSelection().getRanges()[0].getCommonAncestor();

        if (CKEDITOR.NODE_ELEMENT != startContainer.type || startContainer.getName() != "p") {
          startContainer = startContainer.getAscendant("p");
        }
        if (startContainer == null) {
          return false;
        }


        this.editor.ownspec.host.startCreateComponent().componentInstance.update.subscribe(function (event) {
          var cv = event.componentVersion;
          var cvHtml = generateComponentTags(cv.id, cv.code, true, true);

          var cvElement = CKEDITOR.dom.element.createFromHtml(cvHtml);
          startContainer.clone(true).appendTo(cvElement.findOne(".requirements-content"));
          cvElement.replace(startContainer);

          that.editor.checkDirty();

        });

        return false;
      }
    });


    editor.ui.addButton('ownspec_component', {
      label: 'Create a component',
      command: 'ownspec_component',
      toolbar: 'ownspec'
    });


  }
});
