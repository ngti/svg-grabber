function setSvgsUrl(data, sender, pageUrl) {
  document.getElementById('header').innerHTML = ' \nAll SVGs from &#8594; ' + sender;
  var senderLink = document.getElementById('sender-url');
  senderLink.innerHTML = pageUrl.replace(/\/$/, '');
  senderLink.href = pageUrl;
  console.log(data);
  if (data.data.length == 0) {
    document.getElementById('header').innerHTML = ' \nNo SVGs in &#8594; ' + sender;
    document.getElementById('download-all').classList.add('hidden');
    var disclaimer = document.getElementsByClassName('disclaimer');
    console.log(disclaimer);
    disclaimer[0].innerHTML = 'It seems that this site does not use any SVGs. 🙃';
  } else {
    data.data.forEach(function(svg, index) {
      var element = document.createElement('div');
      var base64doc = btoa(unescape(encodeURIComponent(svg)));
      element.innerHTML = `
      <div>
      </div>
      <div>
        ${svg}
      </div>
      <div class="actions">
        <button class='copy'>Copy</button>
        <a download="${sender}-${index}.svg" href='data:text/svg;base64,${base64doc}'>Download</a>
      </div>
      `;
  
      element.setAttribute('class', 'svg-card');
      document.getElementById('svgcard').appendChild(element);
    });
  }
  
  var copyCode = document.querySelectorAll('button.copy');
  console.log(copyCode);
  copyCode.forEach(function(btn) {
    btn.addEventListener('click', copySvg);
  });
}

function copySvg(element) {
  var notification = document.querySelector('.notification');
  var svg = element.target.parentNode.parentNode.querySelector('svg');
  var textBox = document.querySelector('.clipboard');
  console.log('copying', svg.outerHTML);
  textBox.setAttribute('value', svg.outerHTML);

  textBox.select();
  document.execCommand('copy');

  notification.classList.remove('notification-off');
  notification.classList.add('notification-on');

  setTimeout(function() {
    notification.classList.remove('notification-on');
    notification.classList.add('notification-off');
  }, 1500);
}

let downloadAllBtn = document.getElementById("download-all");
downloadAllBtn.addEventListener("click",function(e){
    var zip = new JSZip();
    document.querySelectorAll(".svg-card svg").forEach((svg,index)=>{
        zip.file(`svg${index}.svg`, svg.outerHTML);
        console.log("svg",e);
    })
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, "svgs_collection.zip");
    });
});
