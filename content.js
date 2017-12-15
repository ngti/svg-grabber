chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let removeColor = (node) => {
    if (node.hasAttribute && node.hasAttribute('fill')) {
      node.setAttribute('fill','currentColor');
    }
    if (node.hasChildNodes()) {
      node.childNodes.forEach(child => removeColor(child));
    }
    return node;
  }

  let removeColorIfNecessary = (node) => {
    let colors = getColors(node);
    if (colors.length == 1){
      console.log("REMOVING COLOR",colors[0]);
      removeColor(node);
    } else {
      console.log("FOUND COLORS",colors);
    }
    return node;
  }

  let getColors = (node) => {
    let colors = [];
    if (node.hasAttribute && node.hasAttribute('fill')) {
      let color = node.getAttribute('fill').toLowerCase();
      if (color != 'none' && color !='currentcolor'){
        colors.push(color);
      }
    }
    if (node.hasChildNodes()) {
      node.childNodes.forEach((child) => {
          let childColors = getColors(child);
          childColors.forEach((color)=>{
              if (colors.indexOf(color)==-1){
                  colors.push(color);
              }
          })
        });
    }
    return colors;
  }

  let removeDimensions = (node) => {
    if (node.hasAttribute && node.hasAttribute('height')) {
      node.removeAttribute('height');
    }
    if (node.hasAttribute && node.hasAttribute('width')) {
      node.removeAttribute('width');
    }
    return node;
  }

  if (request.message === 'clicked_browser_action') {
    let svgInlineCodes = Array.from(
      document.querySelectorAll('svg'), e => {
        let node = e.cloneNode(true);
        removeColorIfNecessary(node);
        removeDimensions(node);
        return node;
      }
    );

    // External SVG
    let svgFiles = Array.from(document.querySelectorAll('img[src*=".svg"]'));
    console.log(svgFiles);
    let parser = new DOMParser();
    let svgFilePromises = svgFiles.map((file) => {
      return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.open('GET', file.src, true);
        ajax.send();
        ajax.onload = function (e) {
          let node = parser.parseFromString(ajax.responseText, 'image/svg+xml').children[0];
          resolve(node);
        }
      })
    });

    Promise.all(svgFilePromises).then((svgFileCodes) => {
      let svgCodes = svgInlineCodes.concat(svgFileCodes);
      let serializer = new XMLSerializer();
      svgCodes = svgCodes.map((node) => {
        removeColorIfNecessary(node);
        return serializer.serializeToString(removeDimensions(node));
      })      
      console.log(svgCodes);
      // Removes spaces
      svgCodes = svgCodes.map(item => {
        return item.replace(/>\s+</g, '><');
      });

      // Removes duplicated svg's
      svgCodesFinal = svgCodes.filter(function(item, pos) {
        return svgCodes.indexOf(item) == pos;
      });

      chrome.runtime.sendMessage({
      message: { type: 'open_new_tab', data: svgCodesFinal },
      url: 'getsvgs.html'
      });
    });

  }
});
