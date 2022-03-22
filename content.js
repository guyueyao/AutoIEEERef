loadedflag=false
citinginfo=null
function getcite(){
    var a=document.getElementById('SumAuthTa-MainDiv-author-en')
    a = a.getElementsByClassName('mat-tooltip-trigger authors value ng-star-inserted')
    auther_num=a.length
    authers=[]
    var journal_title
    for (var i=0;i<auther_num;i++) {
        var query_id = "SumAuthTa-DisplayName-author-en-" + i.toString()
        a = document.getElementById(query_id)
        if (a) {
            names = a.innerText.replace(' ', '')
            authers.push(names)
        }
    }
    var paper_title=document.getElementById('FullRTa-fullRecordtitle-0').innerText

    //判断 是否是是会议
    var isConf= document.getElementById('ConfTa-confDataHeading')
    //获取期刊名
    a=document.getElementsByClassName('summary-source-title')
    if (a.length<1){
        a=document.getElementsByClassName('summary-source-title-link')
        a=a[0]
        journal_title=a.innerText
    }else{
        a=a[0]
        journal_title=a.innerText
    }

    if (isConf){
        d=document.getElementById('ConfTa-conf-date-0-0').innerText
        d=d.split(',')
        data_year=d[1].replace(' ','')
        data_month=d[0].split(' ')[0]
        data_month=data_month.substring(0,1)+data_month.substring(1,3).toLowerCase()
        pp=document.getElementById('FullRTa-pageNo').innerText
    }else{
        d=document.getElementById('FullRTa-pubdate').innerText
        d=d.split(' ')
        data_month=d[0]
        data_month=data_month.substring(0,1)+data_month.substring(1,3).toLowerCase()
        data_year=d[d.length-1]

        data_ym=data_month+'. '+data_year
        volume=document.getElementById('FullRTa-volume')
        if (volume)
            volume=volume.innerText
        else
            volume=null
        issue=document.getElementById('FullRTa-issueLabel')
        if (issue)
            issue=issue.innerText
        else
            issue=null
        pp=document.getElementById('FullRTa-pageNo')
        if (pp)
            pp=pp.innerText
        else
            pp=null
        art_no=document.querySelector('span#FullRTa-articleNumberLabel')
        if (art_no)
            art_no=art_no.innerText
        else
            art_no=null
    }
    //组合
    citing=''

    for (var i=0;i<authers.length;i++){
        names=authers[i]
        names=names.split(',')
        first_name=names[1]
        second_name=names[0]

        if (i===0 || authers.length===1)
        citing=citing+first_name[0]+'. '+second_name
        else if(i===authers.length-1)
            citing=citing+' and '+first_name[0]+'. '+second_name
        else
            citing=citing+', '+first_name[0]+'. '+second_name
    }
    citing=citing+',"'+paper_title+'," '

    if (isConf){
        citing=citing+'in '+journal_title+', '+data_month+'. '+data_year+', pp.'+pp+'.'
    }else {
        citing=citing+journal_title
        if (volume)
            citing=citing+', vol.'+volume
        if(issue)
            citing=citing+', no.'+volume
        if(pp)
            citing=citing+', pp.'+pp
        if(art_no)
            citing=citing+', art no.'+art_no
        citing=citing+', '+data_ym+'.'
    }
    return citing
}
console.log('contens injected !!!!!!!!!!!!!!!!!!!!!')




chrome.runtime.onMessage.addListener(
    function(request, sender, sendMessage) {
        if (request.greeting === true) {
            citing=getcite()
            sendMessage(citing);
        }
        else
        sendMessage(null); // snub them.
        return true;

    });


// chrome.runtime.onConnect.addListener(function(port) {
//     port.onMessage.addListener(function(msg) {
//         console.log('message received')
//         if (msg.require === true){
//             if (loadedflag){
//                 console.log(citinginfo)
//                 port.postMessage({citeinfo: citinginfo});
//             }
//             else{
//             citing=getcite()
//             port.postMessage({citeinfo: citing});
//             }
//         }
//     });
// });