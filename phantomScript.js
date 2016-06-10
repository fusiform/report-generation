var page = require("webpage").create(),
    url = "./html/index.html";

function onPageReady() {
    var htmlContent = page.evaluate(function () {
        return document.documentElement.outerHTML;
    });
    page.paperSize = {
      width: '8.5in',
      height: '11in',
      margin: {
        top: '1in',
        left: '1in'
      }
    };

    page.render('report.pdf');
    phantom.exit();
}

page.open(url, function (status) {
    function checkReadyState() {
        setTimeout(function () {
            var readyState = page.evaluate(function () {
                return window.angularAppReady;
            });

            if (readyState) {
                onPageReady();
            } else {
                checkReadyState();
            }
        });
    }

    checkReadyState();

});
