FroalaEditor.DefineIcon('alert', { NAME: 'info', SVG_KEY: 'help' });
FroalaEditor.RegisterCommand('alert', {
  title: 'Hello',
  focus: false,
  undo: false,
  refreshAfterCallback: false,
  callback() {
    alert('Hello!');
  },
});

const editor = new FroalaEditor('#edit', {
  quickInsertTags: [],
  toolbarButtons: ['fontFamily',
    'fontSize', 'textColor', 'paragraphStyle', '|', 'bold', 'italic', 'underline',
    'strikeThrough', 'subscript', 'superscript', 'lineHeight', '|', 'paragraphFormat',
    'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink',
    'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons',
    'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help',
    'html', '|', 'undo', 'redo', 'trackChanges', 'markdown'],
  fontFamilySelection: true,
  fontSizeSelection: true,
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
