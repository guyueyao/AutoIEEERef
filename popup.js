var test
chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    test = tabs[0].url
    console.log(test)
    if (test) {
        test1 = test.substring(0, 51)
        test2 = test.substring(0, 29)
        test3= test.substring(0, 22)
        test4= test.substring(0, 34)
        test5= test.substring(0, 56)
        if (test1 === 'https://www.webofscience.com/wos/alldb/full-record/'|| test3=== 'https://arxiv.org/abs/' || test5==='https://webofscience.clarivate.cn/wos/alldb/full-record/') {
                chrome.tabs.sendMessage(tabs[0].id, {action: true}, function (response) {

                    document.getElementById("infobox").value = response.split('#')[0];
                    document.getElementById("infoboxv2").value = response.split('#')[1];
                });



        } else if (test2 === 'https://www.webofscience.com/' || test4==='https://webofscience.clarivate.cn/' ) {
            document.getElementById("infobox").value = "Please entry the literature detail page";
        } else {
            chrome.tabs.create({url: 'https://www.webofscience.com/'});
        }
    }
});
