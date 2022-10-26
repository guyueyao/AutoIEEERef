var test
chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    test = tabs[0].url
    console.log(test)
    if (test) {
        test1 = test.substring(0, 51)
        test2 = test.substring(0, 29)
        test3= test.substring(0, 22)
        if (test1 === 'https://www.webofscience.com/wos/alldb/full-record/'|| test3=== 'https://arxiv.org/abs/') {
            console.log('innnnnn')
                chrome.tabs.sendMessage(tabs[0].id, {action: true}, function (response) {

                    document.getElementById("infobox").value = response.split('#')[0];
                    document.getElementById("infoboxv2").value = response.split('#')[1];
                });



        } else if (test2 === 'https://www.webofscience.com/') {
            document.getElementById("infobox").value = "Please entry the literature detail page";
        } else {
            chrome.tabs.create({url: 'https://www.webofscience.com/'});
        }
    }
});
