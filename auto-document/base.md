# Mrs Marper

## Current project goals:
* Change folder structure so that we have a project folder, that contains username folders, that in turn contains project folders.
* Each project folder should contain the following source files:
  * index.md
  * theme.css
  * fonts.css
  * font folder
  * image folder
* Update the command **npm run make** / read CLI parameter in make/_index.js so that can choose a project folder to run through Mrs Marper. 'npm run make dirname'.
* Create online frontend/backend for creating, viewing and editing projects, running the npm run make command as a worker/sub-process.
* Create interactive preview for frontend.
* Future ideas: Automatic flow of text into new slides / "book setting".

**Note:** This README.md file can (and should) be auto-generated by running **npm run make-doc**. 

## What do we have here?
A slide-deck built with [MARP](https://marp.app)+ **Mrs Marper**.

The **Mrs Marper** source code is located in the folder [make](make).

**Mrs Marper** is a project started by Ironboy at Node Hill.

It extends the [MARP](https://marp.app) concept by allowing:

* Auto generation of completely stand alone HTML files (with fonts, css and images embedded).
*  Generation of much smaller PDF:s than standard MARP can accomplish.
* Generation of PPTX/PowerPoint files with internal and external links intact.
* Hyphenation and word-spacing for justified text. Our goal is to achieve good typography with correct hyphenation and a mild variable letter-spacing that counteracts large spaces in justified text.

## Important! Install Ghostscript
For PDF creation/compression to work:

GhostScript must be installed on the computer and accessible as a global path via the 'gs' command in the terminal/shell. See installation settings:

#### Windows (as well as Linux Snap)
https://ghostscript.com/releases/gsdnld.html

*Note:* Select the correct OS + AGPL License

#### Mac
```
brew install ghostscript
```

*Note:* Install HomeBrew first if not already installed: https://brew.sh

#### Debian/Ubuntu
```
sudo apt-get -y install ghostscript
```

## Install Node.js and VSCode
1. Make sure Node.js and VSCode (Visual Studio Code) are installed!
2. Use VSC (Visual Studio Code) as your code editor.
3. In Visual Studio Code, install the following extension: 
*Marp for VS Code*.
4. In the terminal (inside VSC) run the **npm install** command.

## Watch markdown and preview as Marp in VSC
Assuming you have installed Marp for VS Code:
1. Open index.md
2. Click on the preview symbol in the upper corner (pages with magnifying glass).
3. Note: The appearance is controlled by the *theme.css* file - but you have to set this once in VSC: Click on the Marp symbol and select "Open extension settings", then on *Add item* at the bottom of the list and write in "./theme.css"

## Generate finished HTML and PDF from markdown
Don't forget to run **npm install**, then:

1. Type **npm run make** in the terminal.
2. A folder named **dist** is created with an HTML version and a PDF version of the presentation.

(Note: *Don't* use the Marp VSC extension command "Export slide deck" - to create your slides it doesn't give as good results as using **Mrs Marper**, running **npm run make**.)

# Documentation of the Mrs Marper code base 

The **Mrs Marper** code base can be found in the **make** folder.

## Coding style &ndash; some ground rules
We're rather relaxed. But there are some important guidelines you really *should* follow:
* Name your functions, variables and parameters so that they can be easily understood. (With the exeception of parameter names for very short lambda like functions, where short code is easier to follow.)
* At the start of each file write a short description as a [JavaDoc](https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html) style comment with one bullet point per line (using "-" for bullets) - see how we've done it our files so far - follow that pattern!
* **Never** have more than 50 lines of code in a single JS file! Refactor and split if that limit is reached!
* Install and use the excellent VSC extension [Uncanny Cognitive Complexity](https://marketplace.visualstudio.com/items?itemName=Dabolus.uncanny-cognitive-complexity) to judge the complexity of each of your JS files. Try to keep things simple, below the measurement 10, and never go haywire (you **must** keep things below 20). Keep Mr Incredible happy! (You can read [more about Cognitive Complexity here](https://www.baeldung.com/java-cognitive-complexity).). You can also run **npm run test-cc** to see the complexity listed for all files.
* Don't uses classes and OOP &ndash; this application is a bunch of JS functions and that is a *deliberate choice*. Much less cruft in this particular case, although OOP is a better fit in other cases...
* *Note* that all *export*:s are automatically *imported* and made in to global variables in **_index.js**, so follow that convention and *don't* add *any* import statements in your files!
* *Only* comment things that are really hard to understand even if you know JS. **And** things that are domain specific.
* *Always* move things that you feel might be good to reach as *settings/options* to *make/__settings.js*. And, in *__settings.js*, comment what the setting actually does!
* End your lines with ";".

