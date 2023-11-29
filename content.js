loadedflag=false
citinginfo=null

function revise_journal_title(jtitle){
    var jtitles=jtitle.split(' ')
    var jt
    var result=""
    var preposition=["IN","ON","FOR","AT","AND","OR","OF","BY","TO","AS"]
    var institution=["IEEE",'ACM','SPIE','CCF','CVF','IEEE/CVF']
    var spatialwors=["CNN","VQA",'IQA','R-CNN',]
    for(var j=0;j<jtitles.length;j++){
        jt=jtitles[j]
        if (institution.includes(jt)||spatialwors.includes(jt)||jt.includes("("))
            ;
        else if(preposition.includes(jt))
            jt=jt.toLowerCase()
        else{
            jt0=jt.substring(0,1)
            jtend=jt.substring(1)
            jt=jt0+jtend.toLowerCase()
        }
        result=result+jt
        if (j<jtitles.length-1)
            result=result+' '
    }
    return result
}
function getcite(){
    var a=document.getElementById('SumAuthTa-MainDiv-author-en')
    a = a.getElementsByClassName('mat-tooltip-trigger authors value ng-star-inserted')
    auther_num=a.length
    authers=[]
    var journal_title
    for (var i=0;i<auther_num;i++) {
        var query_id = "SumAuthTa-FrAuthStandard-author-en-" + i.toString()
        a = document.getElementById(query_id)
        if (a) {
            names = a.innerText.replace(' (', '').replace(') ', '')
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
        pp=document.getElementById('FullRTa-pageNo')
        volume=document.getElementById('FullRTa-volume')
        if (volume)
            volume=volume.innerText
        else
            volume=null
        if (pp)
            pp=pp.innerText
        else
            pp=null
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
        issue=document.getElementById('FullRTa-issue')
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

    //CVPR格式
    citingv2=''

    //IEEE
    for (var i=0;i<authers.length;i++){
        names=authers[i]
        names=names.split(', ')
        first_name=names[1]
        second_name=names[0]
        first_names=first_name.split(' ')
        first_name=''
        for (var j=0;j<first_names.length;j++){
            tmp=first_names[j]
            first_name=first_name+tmp.substr(0, 1)+'. '
        }


        if (i===0 || authers.length===1)
        citing=citing+first_name+second_name
        else if(i===authers.length-1)
            citing=citing+' and '+first_name+second_name
        else
            citing=citing+', '+first_name+second_name
    }
    //CVPR
    for (var i=0;i<authers.length;i++){
        names=authers[i]
        names=names.split(', ')
        first_name=names[1]
        second_name=names[0]

        if (i===0 || authers.length===1)
            citingv2=citingv2+first_name+' '+second_name
        else if(i===authers.length-1)
            citingv2=citingv2+' and '+first_name+' '+second_name
        else
            citingv2=citingv2+', '+first_name+' '+second_name
    }


    //paper_title=revise_journal_title(paper_title)

    citing=citing+',"'+paper_title+'," '
    citingv2=citingv2+'. '+paper_title+'. '
    journal_title=revise_journal_title(journal_title)
    if (isConf){
        citing=citing+'in '+journal_title+', '+data_month+'. '+data_year
        citingv2=citingv2+'In '+journal_title+', '
        if (volume)
            citing=citing+', vol. '+volume
        if (pp) {
            citing = citing + ', pp.' + pp + '.'
            citingv2=citingv2+'pages '+pp
        }

        else
            citing=citing+'.'
            citingv2=citingv2+', '+data_year+'.'

    }else {
        citing=citing+journal_title
        citingv2=citingv2+journal_title
        if (volume){
            citing=citing+', vol. '+volume
            citingv2=citingv2+', '+volume}
        if(issue){
            citing=citing+', no. '+issue
            citingv2=citingv2+'('+issue+')'}
        if(pp){
            citing=citing+', pp. '+pp
            citingv2=citingv2+': '+pp}
        if(art_no){
            citing=citing+', Art no. '+art_no
            citingv2=citingv2+': '+art_no}
        citing=citing+', '+data_year+'.'
        citingv2=citingv2+', '+data_year+'.'
    }
    console.log(citingv2)
    return citing+'#'+citingv2

}
console.log('contens injected !!!!!!!!!!!!!!!!!!!!!')




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

