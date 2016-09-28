/**
 * scratchpad.js
 * @author N. Hradek
 */

const editor = ace.edit("editor");
ace.require("ace/ext/language_tools");



$('#editor').ready(function () {
    editor.setTheme('ace/theme/cobalt');
    $('#editor').css("fontSize", "15px");
});


editor.getSession().setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});


// change theme when new item selected
$('#theme-selector').change(
    function () {
        editor.setTheme('ace/theme/' + $('#theme-selector').val());
    }
);


/**
 *
 * read file and store text in editor.
 * @param file file to read
 */
function readFile(file) {
    const reader = new FileReader();

    reader.onload = function(res) {
        editor.setValue(res.target.result);
    };

    reader.readAsText(file);

}

$('#file-chooser').change(function() {
    if(this.files.length > 0) {
        readFile(this.files[0]);
    }
});


/**
 * Run editor in tab eval.
 */
$('#run-button').click(function() {
    const script = editor.getValue();
    chrome.devtools.inspectedWindow.eval(
        script,
        function (result, isException) {

        });
});


editor.commands.addCommand({
    name: 'run',
    bindKey: {win: 'Ctrl-R', mac: 'Command-M'},
    exec: function (editor) {
        const script = editor.getValue();
        chrome.devtools.inspectedWindow.eval(
            script,
            function (result, isException) {

            });
    }
});