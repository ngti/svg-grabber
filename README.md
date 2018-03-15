# svg-grabber
This is a Chrome extension to preview and download all the svg assets from a website.

The motivation to make this extension was to provide an easy way for designers to quickly get the svg assets from websites in projects [we (NGTI)](https://ngti.nl/) were working on.

![alt text](/images/svg-grabber-screenshot.png "svg-grabber")

## Installation
The easiest way to install svg-grabber extension is through the Chrome Web Store:

[Link to store](https://chrome.google.com/webstore/detail/svg-grabber-get-all-the-s/ndakggdliegnegeclmfgodmgemdokdmg)

### Permissions
The extension requires permission to read and modify all the data of the website that you want to extrach the svg files from. It is nessesary to parse and extract the svg assets on the site.

## Developer mode
If you would like to modify this extension, you will need to install it manually. Clone, download or fork this repository. In Chrome Extnesions page `chrome://extensions/`. Developer mode must be enabled, then click the button **Load unpacked extension**.
 
![alt text](/images/svg-grabber-local-install.png "svg-grabber local install")

Feel free to send a pull request if you've made an improvement.

## Documentation
Goggle provides sufficient information an examples on how to write extensions, for more infromation visit https://developer.chrome.com/extensions/devguide.

## Third party libraries
Svg-grabber uses the following libraries:

- **FileSaver.js**  
    Copyright © 2016 [Eli Grey](https://eligrey.com)  
    https://github.com/eligrey/FileSaver.js  
    [MIT License](https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md)  
- **Data Driven Documents**  
    Copyright © 2009-2016 Stuart Knightley, David Duponchel, Franz Buchinger, António Afonso  
    https://stuk.github.io/jszip                    
    [MIT License](https://github.com/Stuk/jszip/blob/master/LICENSE.markdown)                       
## Contributing
Please read our [code of conduct](/code-of-conduct.md) for contributors.
