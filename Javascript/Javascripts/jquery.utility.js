(function ($) {
    /**************************获得URL的参数************************************/
    //参数：URL中的参数名
    //返回值：该参数的值
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    /**************************************************************/

    /**********************日期格式化****************************************/
    $.dateFormatter = function (date) {
        if (!date) { return ''; }
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
    }
    $.dateParser = function (s) {
        if (!s) { return null; }
        var ss = s.split('-');
        var y = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var d = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d);
        } else {
            return new Date();
        }
    }
    $.jsonDateToDateTime = function (jsonDate) {
        // 转换JSON日期至字符串
        jsonDate = jsonDate.split('(')[1].split(')')[0];
        var rDate = new Date(parseInt(jsonDate));
        return rDate.toLocaleString();
    }

    //描述：对当前时间进行格式化，参数为格式化方式，返回格式化后的字符串
    //具体格式化方式：yyyy-MM-dd hh:mm:ss | YYYY年MM月dd日hh小时mm分ss秒 | yyyy年MM月dd日
    //                MM/dd/yyyy | yyyyMMdd | yyyy-MM-dd hh:mm:ss | yyyyMMddhhmmss 等
    $.formatNowDate = function (format) {
        var myDate = new Date();
        var o = {
            "M+": myDate.getMonth() + 1, //month
            "d+": myDate.getDate(), //day
            "h+": myDate.getHours(), //hour
            "m+": myDate.getMinutes(), //minute
            "s+": myDate.getSeconds(), //second
            "q+": Math.floor((myDate.getMonth() + 3) / 3), //quarter
            "S": myDate.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    /**************************************************************/

    /**************************生成GUID************************************/
    $.newguid = function () {
        this.val('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
            function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            }));
        return this;
    };
    /**************************************************************/

    /*******************自定义AJAX********************************/
    $.postAJAX = function (dataToServer, urlString, successfulFunction, errorFunction) {
        $.ajax({
            type: "POST",
            url: urlString,
            data: JSON.stringify(dataToServer),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if ($.isFunction(successfulFunction)) {
                    successfulFunction(data);
                }
				else{
					alert('The third paramater is not a function');
				}
            },
            error: function () {
                if ($.isFunction(errorFunction)) {
                    errorFunction();
                }
				else{
					alert('The forth paramater is not a function');
				}
            }
        })
    }
    /**************************************************************/

    /**********************AJAX文件下载********************************/
    $.fileDownload = function (url, data, method) {
        // 获取url和data
        if (url && data) {
            // data 是 string 或者 array/object
            data = typeof data == 'string' ? data : jQuery.param(data);
            // 把参数组装成 form的  input
            var inputs = '';
            jQuery.each(data.split('&'), function () {
                var pair = this.split('=');
                inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
            });
            // request发送请求
            jQuery('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>')
        .appendTo('body').submit().remove();
        };
    }
    /**************************************************************/


})(jQuery);