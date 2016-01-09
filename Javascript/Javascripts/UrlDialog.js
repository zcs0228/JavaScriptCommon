$(function () {
    $('<div id="urldialog" style="width:95%; height:95%; overflow:hidden;" ><div id="dlgContent" style="width:100%; height:100%; overflow:hidden;" ></div></div>').appendTo($('body'))
    $('#urldialog').dialog({
        closed: true,//是否包含关闭按钮
        cache: false,//是否启用缓存
        modal: true//是否模态窗口
    });
})

jQuery.extend({
    myOpenUrl: function (dialogname, url) {
        $('#urldialog').dialog({
            title: dialogname //标题
        });
        //先清空弹出窗口内容
        $('#dlgContent').html('');
        $('#dlgContent').append('<iframe src=' + url
            + ' id="iframepage" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%" height="100%"></iframe>');
        $('#urldialog').dialog('open');
    }
});

//(function ($) {
//    $.myOpenUrl = function (url) {
//        //先清空弹出窗口内容
//    $('#dlgContent').html('');
//        $('#dlgContent').append('<iframe src=' + url
//            + ' id="iframepage" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%" height="100%"></iframe>');
//        $('#urldialog').dialog('open');
//    }
//})(jQuery);