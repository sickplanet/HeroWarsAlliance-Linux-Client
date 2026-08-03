const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      partition: 'persist:hero-wars-cache'
    }
  });

  //Force the window to start maximized
  win.maximize();
  win.setAutoHideMenuBar(false);
  win.setMenuBarVisibility(true);

  //Intercept F11 to toggle "FULL FULL screen"
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11' && input.type === 'keyDown') {
      win.setFullScreen(!win.isFullScreen());
      showToastNotification(win, win.isFullScreen() ? 'Entered Full Screen\r\nPress F11 to exit Full Screen' : 'Exited Full Screen', 2000);
      event.preventDefault();
    }else if (input.key === 'F1' && input.type === 'keyDown') {
      win.setMenuBarVisibility(!win.isMenuBarVisible());
    }
  });

  //Inject toast notification once the page loads
  win.webContents.on('did-finish-load', () => {
    showToastNotification(win, 'Press F11 to toggle Full Screen', 3000);
  });

  win.loadURL('https://www.hero-wars-alliance.com/');
}

function showToastNotification(win, message, timeout = 1000) {
    win.webContents.executeJavaScript(`
      (() => {
        const toast = document.createElement('div');
        toast.innerText = ${JSON.stringify(message)};
        
        toast.style.cssText = 'position: fixed; bottom: 2px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.85); color: #dd980f; padding: 12px 24px; border-radius: 8px; border: 2px solid #13a6da; z-index: 999999; font-family: sans-serif; font-size: 16px; pointer-events: none; transition: opacity 0.5s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.3); white-space: pre-line; text-align: center;';
        
        if (document.body) {
          document.body.appendChild(toast);
        }
        
        // Wait ${timeout} milliseconds, fade out, then remove from DOM
        setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 500); 
        }, ${timeout});
      })();
    `).catch(err => console.error('Failed to show toast:', err));
}

app.whenReady().then(() => {
  // Set a User-Agent 
  app.userAgentFallback = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64;) AppleWebKit/537.36 (KHTML, like Gecko) old-airport-include/1.0.0 Chrome Electron/8.4.0 Safari/537.36";
  
  app.setAboutPanelOptions({
    applicationName: 'Hero Wars: Alliance (BETA) linux client',
    iconPath: path.join(__dirname, 'icon.png'),
    copyright: '© all rights/trademarks are the property of their respective owners',
    applicationVersion: app.getVersion(),
    version: app.getVersion(),
    website: 'https://github.com/sickplanet/HeroWarsAlliance-Linux-Client',
    authors: ['sickplanet']
  });
  
  const template = [
    {
      label: 'Store',
          click: async () => {
            // Opens the link in the user's default Linux web browser (Firefox, Chrome, etc.)
            await shell.openExternal('https://hwa.nexters.com/store');
          }
    }
    ,
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: async () => {
            app.showAboutPanel();
          }
        }
        ,
        {
          label: 'Discord',
          click: async () => {
            // Opens the link in the user's default Linux web browser (Firefox, Chrome, etc.)
            await shell.openExternal('https://discord.gg/HWM');
          }
        }
        ,
        {
          label: 'Reddit',
          click: async () => {
            // Opens the link in the user's default Linux web browser (Firefox, Chrome, etc.)
            await shell.openExternal('https://www.reddit.com/r/HeroWarsApp/');
          }
        }
        ,
        {
          label: 'Facebook',
          click: async () => {
            // Opens the link in the user's default Linux web browser (Firefox, Chrome, etc.)
            await shell.openExternal('https://www.facebook.com/herowarsalliance');
          }
        }
        ,
        {
          label: 'Youtube',
          click: async () => {
            // Opens the link in the user's default Linux web browser (Firefox, Chrome, etc.)
            await shell.openExternal('https://www.youtube.com/@HeroWarsAlliance');
          }
        }
        ,
        {
          label: 'Instagram',
          click: async () => {
            // Opens the link in the user's default Linux web browser (Firefox, Chrome, etc.)
            await shell.openExternal('https://www.instagram.com/herowarsapp/');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});