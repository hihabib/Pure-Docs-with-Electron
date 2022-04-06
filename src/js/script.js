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
