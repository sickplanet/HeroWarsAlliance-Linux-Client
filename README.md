# Hero Wars Alliance - Desktop Client

A lightweight, standalone desktop client for [Hero Wars Alliance](https://www.hero-wars-alliance.com/), built with Electron. 

## Why use this instead of a browser?

Playing Hero Wars Alliance in a standard web browser over long sessions often leads to memory leaks, sluggish performance, and incomplete asset caching. This dedicated wrapper was created to solve those issues and provide a better, faster gaming experience:

* **Eliminates Memory Leaks:** Prevents the gradual memory bloat and slowdowns that occur during extended browser sessions.
* **Lower Memory Footprint:** Despite being a web view, this dedicated application is optimized to use less RAM than running the game in a standard browser tab.
* **Aggressive Persistent Caching:** Browsers often clear or struggle to hold onto massive game data. This app uses a dedicated, persistent disk partition to cache *everything*. 
  * *Note: After your first launch—and after navigating through the various in-game menus to trigger asset downloads—the local cache will grow to approximately **~5GB**. Because all heavy assets are now stored locally, subsequent game launches will load incredibly fast.*
* **Isolated Environment:** Play the game as a native desktop app. It won't hang your main web browser, and you don't have to worry about accidentally closing a game tab.

## Keyboard Controls

* **`F11`** : Toggle Full Screen (borderless)
* **`F1`** (or **`Alt`**) : Toggle the application menu

## Downloads & Installation

Automated builds are generated via GitHub Actions. You can download the latest compiled binaries for your operating system from the [Releases](../../releases) tab.

* **Linux:** Download the `.AppImage` file, make it executable, and run it.
* **Windows:** Download and run the `.exe` installer.