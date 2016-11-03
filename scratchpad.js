/**
 * scratchpad.js
 * @author N. Hradek
 */



const bgColorThemes = {
    'cobalt': "#011e3a",
    'eclipse': "#ebebeb",
    'monokai': "#2F3129",
    'solarized_dark': "#01313f",
    'vibrant_ink': "#1a1a1a"
};

const buttonColors = {
    'cobalt': "rgb(128,145,160)",
    'eclipse': "rgb(136, 136, 136)",
    'monokai': "#8F908A",
    'solarized_dark': "#607B76",
    'vibrant_ink': "#BEBEBE"
};

const editor = ace.edit("editor");
ace.require("ace/ext/language_tools");



$('#editor').ready(function () {
    editor.setTheme('ace/theme/cobalt');
    $('body').css('background-color', bgColorThemes['cobalt']);
    $('#editor').css("fontSize", "15px");
    $('input.button').css('background-color', buttonColors['cobalt']);
    $('select').css('background-color', buttonColors['cobalt']);
    $('.menu-bar').css('border-color', buttonColors['cobalt']);

});


$('#file-open-button').click(function() {
    $('#file-chooser').click();
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
        const currTheme = $('#theme-selector').val();
        $('select').css('color', 'white');
        $('input.button').css('color', 'white');
        editor.setTheme('ace/theme/' + currTheme);
        $('body').css('background-color', bgColorThemes[currTheme]);
        $('input.button').css('background-color', buttonColors[currTheme]);
        $('select').css('background-color', buttonColors[currTheme]);
        $('.menu-bar').css('border-color', buttonColors[currTheme]);
        if(currTheme == 'vibrant_ink') {
            $('select').css('color', 'black');
            $('input.button').css('color', 'black');
        }
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


editor.commands.addCommand({
    name: 'open-file',
    bindKey: {win: 'Ctrl-O', mac: 'Command-O'},
    exec: function (editor) {
        $('#file-chooser').click();
    }
});