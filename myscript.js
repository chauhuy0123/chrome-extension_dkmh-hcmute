console.log("Extenstion loaded");
$(document).ready(function () {
    $.get(chrome.extension.getURL('/layout.html'), function(data) {
        $(data).appendTo('html');
    });
});