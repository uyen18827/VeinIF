import os
import subprocess
import tkinter as tk
import webbrowser
from threading import *

app = tk.Tk()

app.title('VeinIF Build Tools')
app.resizable(False, False)
# app.geometry('800x600')
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

#function: install dependencies
# def installDependencies():
#     dep =

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
    webbrowser.open('https://github.com/uyen18827/VeinIF')

#function: Open Documentation Page
def openDoc():
    webbrowser.open('https://uyen18827.gitbook.io/veinif/')

#Install Dependencies button
# depButton = tk.Button(app, text = 'Install Dependencies')
# depButton.grid(column=0, row = 0, padx=5, pady=2)


#Framework name label
user_name = tk.Label(app, text="VeinIF development tools", font=(18)).grid(
    column=0, row=0, columnspan=2, padx=5, pady=2)

#Run Development Environment button
runDevButton = tk.Button(app, text='Run Dev Environment (Browser)', command = startDevThread)
runDevButton.grid(column=0, row=1, padx=5, pady=2)

#Run Build Button
runBuildButton = tk.Button(app, text='Build Production (Web)', command = startBuildThread)
runBuildButton.grid(column=1, row=1, padx=5, pady=2)

#Build Windows Distribution
runElectronBuild = tk.Button(app, text='Build Distribution (Windows | Portable)', command = startDesktopBuild)
runElectronBuild.grid(column=0,columnspan=2, row=2, padx=5, pady=2)

#Open GitHub Repo Button
gitRepoButton = tk.Button(app, text='Visit GitHub Page (Online)', command = openGitHub )
gitRepoButton.grid(column=0, columnspan=2, row=3, padx=5, pady=2)

#Open Documentation
docButton = tk.Button(app, text='Open Documentation (Online)', command = openDoc)
docButton.grid(column=0, columnspan=2, row=4, padx=5, pady=2)

#start program
app.mainloop()
