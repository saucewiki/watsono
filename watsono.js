// ==UserScript==
// @name                oneClickForward
// @name:zh-CN          oneClickForward 一键转发
// @name:zh-HK          oneClickForward 一键转发
// @name:zh-TW          oneClickForward 一键转发
// @name:en             oneClickForward
// @name:ja             oneClickForward 一键转发
// @description         在新浪微博(weibo.com)的添加一个[一键转发]按钮，点击直接删除粉丝，<确认/取消> 不再有
// @description:zh-CN   在新浪微博(weibo.com)的粉丝页面添加一个[一键转发]按钮，点击直接删除粉丝，<确认/取消> 不再有
// @description:zh-HK   在新浪微博(weibo.com)的粉絲頁面添加一個[一键转发]按鈕，點擊直接刪除粉絲，<確認/取消> 不再有
// @description:zh-TW   在新浪微博(weibo.com)的粉絲頁面添加一個[一键转发]按鈕，點擊直接刪除粉絲，<確認/取消> 不再有
// @description:en      Add a [一键转发] button to the Followers Page on Sina Weibo (weibo.com). Directly delete the annoying fans by one click. No <确认/取消> any more.
// @description:ja      在フォロワーページに[X]ボタンを追加します。 ワンクリックで、迷惑なフォロワーを直接削除します。これ以上の<Y / N>はありません。
// @version             0.0.5
// @author              catscarlet
// @match               http://weibo.com/*
// @match               https://weibo.com/*
// @require             https://code.jquery.com/jquery-latest.js
// @compatible          chrome  支持
// @run-at              document-end
// @grant               none
// ==/UserScript==

(function() {
    'use strict';

    var $ = $ || window.$;

    $(function() {
        console.log('oneClickForward loaded');

        var relationlistdiv1 = $('.WB_row_line WB_row_r4 clearfix S_line2');

        relationlistdiv1.bind('DOMNodeInserted', function(e) {
            console.log('oneClickForward .WB_row_line WB_row_r4 clearfix S_line2 detected DOMNodeInserted');
            f();
        });

        setTimeout(f, 1000);

        function f() {
            console.log('oneClickForward pending');
            if (!document.getElementsByClassName('WB_handle').length) {
                setTimeout(f, 1000);
            } else {
                getFeed();
            };
        }

    });

    function getFeed() {
        console.log('oneClickForward get feed');
        var feed_options = $('.WB_handle');

        $(feed_options).find('li').each(function() {
            var option_par = $(this);
            console.log('oneClickForward option');
            var children = option_par.context.children;
            var option = children[0];
            if ($(option).attr('action-type') == 'fl_forward') {
                console.log('oneClickForward c');
                var allowForward = getParameterByName('allowForward', $(option).attr('action-data'));
                var url = getParameterByName('url', $(option).attr('action-data'));
                var name = getParameterByName('name', $(option).attr('action-data'));
                var uid = getParameterByName('uid', $(option).attr('action-data'));
                var domain = getParameterByName('domain', $(option).attr('action-data'));
                //var str = '<a href="javascript:;" class="S_txt2 oneClickForwardOpt" style="background-color: #f56213" action-type="forwardDirectly" allowForward="' + allowForward + '" url="' + url + '" name="' + name + '" uid="' + uid + '" domain="' + domain + '">一键转发</a>';
                var text = $(option).text();
                $(option).text(text.replace(/.+/, 'oneClickForward')); 
                $(option).addClass('oneClickForwardOpt');
                //$(option).attr('action-type',$(option).attr('action-type').replace('fl_forward','forwardDirectly'));
            }                         
        });

        $('.oneClickForwardOpt').on('click', forwardDirectly);
        console.log('oneClickForwardOpt button ready');
    };

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        var results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    function repeatChar(char, times) {
        var result = "";
        for (var i = 0; i< times; i++) {
            result += char;
        }
        return result;
    }

    function forwardDirectly() {
        console.log('forwardDirectly!!');

        var relationlistdiv1 = $('.WB_publish');

        relationlistdiv1.bind('DOMNodeInserted', function(e) {
            console.log('oneClickForward .WB_publish detected DOMNodeInserted');
            f();
        });

        setTimeout(f, 1000);

        function f() {
            console.log('forwardDirectly pending');
            if (!document.getElementsByClassName('W_input').length) {
                setTimeout(f, 1000);
            } else {
                postRandom();
                return;
            };
        }
    };

    function postRandom() {
        console.log('postRandom!!');

        var text = $('[node-type="textEl"]')[0];
        console.log(text);
        if (!text) {
            return;
        }

        //text.value = repeatChar('我',5) + Math.random();
        var rand = Math.round(Math.random() * 10);
        switch (rand) {
            case 0:
                text.value = "除了窒息我没有什么好表演的🦕@刘令姿__" + text.value;
                break;
            case 1:
                text.value = "爆灯爆灯！！为你拍烂我的小灯！！🦕@刘令姿__" + text.value;
                break;
            case 2:
                text.value = "你知道我最喜欢什么吗？就是这句话的第一个字🦕@刘令姿__" + text.value;
                break;
            case 3:
                text.value = "是真的真的好想你，不是假的假的好想你！🦕@刘令姿__ " + text.value;
                break;
            case 4:
                text.value = "是吃可爱长大的叭@刘令姿__" + text.value;
                break;
            case 5:
                text.value = "今天也为刘令姿的颜值原地360度跳起了爱的华尔兹。@刘令姿__  " + text.value;
                break;
            case 6:
                text.value = "世界上好的语句太多，都不足够形容你。🦕@刘令姿__" + text.value;
                break;
            case 7:
                text.value = "别让我看见你,不然我见你一次,就喜欢你一次🦖@刘令姿__" + text.value;
                break;
            case 8:
                text.value = "何以解忧，唯有抱你🦕@刘令姿__ " + text.value;
                break;
            case 9:
                text.value = "用尽我的一切奔向你啊@刘令姿__  " + text.value;
                break;
            default:
                text.value = "我真的陷入爱情了，每天都这么心动。@刘令姿_  " + text.value;
                break;
        } 
        
        text.dispatchEvent(new Event('focus'));

        var btn3 = $('[node-type="submit"]')[0];
        console.log(btn3);
        if (!btn3) {
            return;
        }
        btn3.click();
    }

})();
