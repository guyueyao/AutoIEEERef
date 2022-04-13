var test
chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    test = tabs[0].url
    console.log(test)
    if (test) {
        test1 = test.substring(0, 51)
        test2 = test.substring(0, 29)
        if (test1 === 'https://www.webofscience.com/wos/alldb/full-record/') {
            console.log('innnnnn')
                chrome.tabs.sendMessage(tabs[0].id, {action: true}, function (response) {
                    document.getElementById("infobox").value = response;
                });



        } else if (test2 === 'https://www.webofscience.com/') {
            document.getElementById("infobox").value = "Please entry the literature detail page";
        } else {
            chrome.tabs.create({url: 'https://www.webofscience.com/'});
        }
    }
});
