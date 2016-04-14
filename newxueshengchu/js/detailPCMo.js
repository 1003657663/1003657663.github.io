/**
 * Created by chao on 2016/4/14.
 */

//-----创建分享内容

(function () {
    var h3 = document.querySelector(".head-title h3");
    var titText = h3.innerHTML;
    var contentText = $(".main-body").text().slice(0,140-titText.length);
    var titTextEncode = encodeURI(titText);
    var contentTextEncode = encodeURI(contentText);
    var shareBody = titText+"\n"+contentText;
    var baseHref = encodeURI(window.location.href);
    var shareToUrl = {
        qqUrl:"http://connect.qq.com/widget/shareqq/index.html?",
        weiboUrl:"http://service.weibo.com/share/share.php?",
        qcloudUrl:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?"
    };
    var sharText = {
        qqShareText:shareToUrl.qqUrl+"url="+baseHref+"&title="+titTextEncode+"&summary="+contentTextEncode,
        weiboSHareText:shareToUrl.weiboUrl+"url="+baseHref+"&language=zh_cn&title="+shareBody,
        qcloudSHareText:shareToUrl.qcloudUrl+"url="+baseHref+"&title="+titTextEncode+"&summary="+contentTextEncode
    };
    document.querySelector(".qq-share").setAttribute("href",sharText.qqShareText);
    document.querySelector(".weibo-share").setAttribute("href",sharText.weiboSHareText);
    document.querySelector(".qcloud-share").setAttribute("href",sharText.qcloudSHareText);
})();


