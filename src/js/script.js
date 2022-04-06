// eslint-disable-next-line no-undef
const editor = new FroalaEditor('#edit', {
  quickInsertTags: [],
  toolbarButtons: ['fontFamily',
    'fontSize', 'textColor', 'paragraphStyle', '|', 'bold', 'italic', 'underline',
    'strikeThrough', 'subscript', 'superscript', 'lineHeight', 'createLink', '|', 'paragraphFormat',
    'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink',
    'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons',
    'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'help',
    'html', '|', 'undo', 'redo', 'trackChanges', 'markdown'],
  shortcutsEnabled: ['bold', 'italic', 'underline', 'indent', 'outdent', 'undo', 'redo', 'createLink'],
  fontFamilySelection: true,
  fontSizeSelection: true,
  events: {
    // eslint-disable-next-line func-names
    'image.beforeUpload': function (files) {
      const currentEditor = this;
      if (files.length) {
        // Create a File Reader.
        const reader = new FileReader();
        // Set the reader to insert images when they are loaded.
        // eslint-disable-next-line func-names
        reader.onload = function (e) {
          const { result } = e.target;
          currentEditor.image.insert(result, null, null, currentEditor.image.get());
        };
        // Read image as base64.
        reader.readAsDataURL(files[0]);
      }
      currentEditor.popups.hideAll();
      // Stop default upload chain.
      return false;
    },
  },
  paragraphFormatSelection: true,
  lineHeights: {
    Default: '1',
    Single: '1',
    1.15: '1.15',
    1.5: '1.5',
    Double: '2',
  },
}, (() => {
  editor.fullscreen.toggle();
  editor.lineHeight.apply();
}));

window.handleTable.tableData((event, { intRow, intColumn }) => {
  editor.table.insert(intRow, intColumn);
});
