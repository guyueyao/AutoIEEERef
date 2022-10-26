


function getcite(){
    var a=document.getElementsByClassName('authors')
    a=a[0].outerText
    var authers=a.split(', ')
    auther_cite=''
    auther_citev2=''

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

    for (var i=0;i<authers.length;i++){
        auther=authers[i]
        if (authers.length>1 && i===authers.length-1)
            auther_citev2=auther_citev2+'and '

            if (i<authers.length-1)
                auther_citev2=auther_citev2+auther+', '
            else
                auther_citev2=auther_citev2+auther+'. '
    }


    var title=document.getElementsByClassName('title mathjax')
    titlev2=title[0].innerText+'. '
    title=title[0].innerText+'," '
    var arxivid=document.getElementsByClassName('arxivid')
    arxivid=arxivid[0].innerText.split(' ')[0]+'.'
    var cited=auther_cite+title+arxivid
    var citedv2=auther_citev2+titlev2+'arXiv preprint '+arxivid
    return cited+'#'+citedv2
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

