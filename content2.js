


function getcite(){
    var a=document.getElementsByClassName('authors')
    a=a[0].outerText
    var authers=a.split(', ')
    auther_cite=''

    for (var i=0;i<authers.length;i++){
        auther=authers[i]
        auther=auther.split(' ')
        if (authers.length>1 && i===authers.length-1)
            auther_cite=auther_cite+'and '
        for (var j=0;j<auther.length;j++){
            tmp=auther[j]
            if (j<auther.length-1)
            auther_cite=auther_cite+tmp.substr(0, 1)+'. '
            else{
                if (i<authers.length-1)
                    auther_cite=auther_cite+tmp+', '
                else
                    auther_cite=auther_cite+tmp+',"'
            }
        }
    }
    var title=document.getElementsByClassName('title mathjax')
    title=title[0].innerText+'," arXiv preprint '
    var arxivid=document.getElementsByClassName('arxivid')
    arxivid=arxivid[0].innerText.split(' ')[0]
    var cited=auther_cite+title+arxivid
    return cited
}
console.log('content2 injected !!!!!!!!!!!!!!!!!!!!!')




chrome.runtime.onMessage.addListener(
    function(request, sender, sendMessage) {
        if (request.action === true) {
            citing=getcite()
            sendMessage(citing);
        }
        else
            sendMessage(null); // snub them.
        return true;

    });

