var agentInfo = detect.parse(navigator.userAgent);
var detectBrowser = document.getElementById('detectBrowser');
let browserName = agentInfo.browser.family;
if(browserName.includes("Mobile")){
    browserName = "mobile";
}


detectBrowser.innerHTML = browserName.toLowerCase() + "@katayev.io ";

