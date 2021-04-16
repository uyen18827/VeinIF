import os
import subprocess
import tkinter as tk
import webbrowser
from threading import *

app = tk.Tk()

app.title('Chosen Launcher')
app.geometry('800x600')
canvas = tk.Canvas(app, width=350, height=250)
dirname = os.path.dirname(os.path.realpath(__file__))

#new thread:
def startDevThread():
    t1=Thread(target=startDevEnvironment)
    t1.start()

def startBuildThread():
    t2=Thread(target = buildProduction)
    t2.start()

def startDesktopBuild():
    t3=Thread(target = buildElectron)
    t3.start()

#function: run dev batch file
def startDevEnvironment():
    filename = os.path.join(dirname, 'npm run dev.bat')
    subprocess.call([filename])

#function: run build file
def buildProduction():
    buildBatch = os.path.join(dirname, 'npm run build.bat')
    subprocess.call([buildBatch])

# function: electron build
def buildElectron():
    buildBatch = os.path.join(dirname, 'npm run electron-build.bat')
    subprocess.call([buildBatch])

#function: open Github Repo
def openGitHub():
    webbrowser.open('https://github.com/uyen18827/Choosen')

#function: Open Documentation Page
def openDoc():
    print("to be continue")

#Run Development Environment button
runDevButton = tk.Button(app, text='Run Dev Environment (Browser)', command = startDevThread)
runDevButton.pack()

#Run Build Button
runBuildButton = tk.Button(app, text='Build Production (Web)', command = startBuildThread)
runBuildButton.pack()

#Build Windows Distribution
runElectronBuild = tk.Button(app, text='Build Distribution (Windows | Portable)', command = startDesktopBuild)
runElectronBuild.pack()

#Open GitHub Repo Button
gitRepoButton = tk.Button(app, text='Visit GitHub Page (Online)', command = openGitHub )
gitRepoButton.pack()

#Open Documentation
docButton = tk.Button(app, text='Open Documentation (Online)', command = openDoc)
docButton.pack()

#start program
app.mainloop()
