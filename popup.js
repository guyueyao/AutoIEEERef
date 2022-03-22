var test
chrome.tabs.getSelected(null, function (tab) {
    test = tab.url
    if (test) {
        test1 = test.substring(0, 51)
        test2 = test.substring(0, 29)
        if (test1 === 'https://www.webofscience.com/wos/alldb/full-record/') {
            console.log('innnnnn')

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: true}, function (response) {
                    document.getElementById("infobox").value = response;
                });
            });

             /*
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                console.log(tabs)
                var port = chrome.tabs.connect(tabs[0].id);
                port.postMessage({require: true});
                port.onMessage.addListener(function(msg) {
                    if (msg.citeinfo ){
                        console.log(msg.citeinfo)
                        document.getElementById("infobox").value = msg.citeinfo;
                    }
                });
                });

             */



        } else if (test2 === 'https://www.webofscience.com/') {
            document.getElementById("infobox").value = "Please entry the literature detail page";
        } else {
            chrome.tabs.create({url: 'https://www.webofscience.com/'});
        }
    }
});
