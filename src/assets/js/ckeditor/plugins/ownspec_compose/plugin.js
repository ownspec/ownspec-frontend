CKEDITOR.plugins.add('ownspec_compose', {
  icons: 'ownspec_compose',
  init: function (editor) {

    editor.addCommand('ownspec_compose', {
      exec: function (editor) {
        editor.fire('compose-pdf');
      }
    });

    editor.ui.addButton('ownspec_compose', {
      label: 'Compose in PDF',
      command: 'ownspec_compose',
      toolbar: 'ownspec'
    });

  }
});
