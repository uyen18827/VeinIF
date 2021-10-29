# VeinIF
VeinIF is a framework for creating choice-based Interactive Fiction game.\
This project uses TypeScript, HTML (& CSS)!  \
\
[See a sample game made using VeinIF.](https://uyen18827.github.io/VeinIF-Demo/)
## Features
Out of the box, VeinIF offers:

- Inventory System: Picking up items, loosing items and locking certain choices if items aren't in the player's inventory.

- Attribute System: Player attributes increase or decrease depends on their choices. Choices can also be locked if certain atrribute is less than required.

- Name & Pronouns: Built in functions that handle custom character name and pronouns.

- Multiple save slots: Save anytime, at any point of the game. Choose between saving in the browser's localStorage or export a copy to player's local machine that can be loaded again in other browsers/devices.

For more informations, please refer to [the documentation](https://uyen18827.gitbook.io/veinif/features).

## Setting up
Please make sure that Node.js is installed in your machine and a copy of VeinIF is present.\
Navigate to the folder and run the following command:
```
npm install
```
## Development
User can use the command line to run commands, or use `buildGUI.exe` to conveniently run commands.
## Commands
Run the development environment server:
```
npm run dev
```
Build the project for web distribution:
```
npm run build
```
Build a Window, stand-alone executable copy of your game:
```
npm run electron-build
```
