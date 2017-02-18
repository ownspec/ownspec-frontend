CKEDITOR.plugins.add('ownspec_compose', {
  icons: 'ownspec_compose',
  init: function (editor) {

    editor.addCommand('ownspec_compose', {
      exec: function (editor) {
        console.log("compose fire");
        editor.fire('os-compose-pdf');
      }
    });

    editor.ui.addButton('ownspec_compose', {
      label: 'Compose in PDF',
      command: 'ownspec_compose',
      toolbar: 'ownspec'
    });

  }
});
