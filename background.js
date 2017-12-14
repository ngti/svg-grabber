var id = 100;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, {
      message: "clicked_browser_action"
    });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var viewTabUrl = chrome.extension.getURL("getsvgs.html?id=" + id++);
  var targetId = null;

  var data = request.message;
  var title = sender.tab.title;
  var pageUrl = sender.tab.url
  if (!title) {
    title = sender.tab.url;
  }

  chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
    if (tabId != targetId || changedProps.status != "complete") return;

    chrome.tabs.onUpdated.removeListener(listener);

    var views = chrome.extension.getViews();
    for (var i = 0; i < views.length; i++) {
      var view = views[i];
      if (view.location.href == viewTabUrl) {
        view.setSvgsUrl(data, title, pageUrl);
        break;
      }
    }
  });

  if (request.message.type === "open_new_tab") {
    chrome.tabs.create({ url: viewTabUrl }, function(tab) {
      targetId = tab.id;
    });
  }
});
