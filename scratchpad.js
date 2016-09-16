/**
 * scratchpad.js
 *
 */

const editor = ace.edit("editor");
ace.require("ace/ext/language_tools");


editor.setTheme('ace/theme/cobalt');

editor.getSession().setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});


const themeSelector = $('#theme-selector');
// change theme when new item selected
themeSelector.change(
    function () {
        editor.setTheme('ace/theme/' + themeSelector.val());
    }
);

$('#run-button').click(function() {
    const script = editor.getValue();
    chrome.devtools.inspectedWindow.eval(
        script,
        function (result, isException) {
            
        });
});