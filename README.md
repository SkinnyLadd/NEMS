# PROJECT SETUP
  - Make sure you have the following installed:
    - Node.js (23.11.0) (run `node -v` in terminal to check)
    - JDK 21 and Java 21 (run `java -version` in terminal to check)   
  - If missing: [Node.js](https://nodejs.org/dist/v23.11.0/node-v23.11.0-x64.msi) | [JDK 21](https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.msi)
  

  
  - Clone the repository in optimal directory:
    ```bash
    git clone https://github.com/SkinnyLadd/NEMS.git
    ```
    
  - Navigate to the ui directory:
    ```bash
    cd NEMS/ui
    ```
  - Install the dependencies:
    ```bash
    npm install
    ```
  
  - Open the Project Folder (NEMS) in IntelliJ IDEA
  - IntelliJ should automatically detect the maven module and download dependencies
  - If it doesn't, you can manually import the maven module by
    - opening the `pom.xml` file in the backend directory
    - right-clicking on the file and selecting "Add as Maven Project"
  
  That should be all, try building the backend module and running npm run dev in the ui directory through the terminal.  
  (backend will prob give a build error for now, will have to setup the database (pain) for that to fully work)

# GIT HOW-TO

  - Once you've done some meaningful work, you can stage your changes:
    ```bash
    git add .
    ```
    or a specific file: 
    ```bash
    git add <filename with path>
    ```
  
    - Commit your changes with a message:
    ```bash
    git commit -m "Your commit message here"
    ```
      
  - **IMPORTANT :** Before pushing your changes, make sure to pull the latest changes from the main branch to avoid conflicts:
    ```bash
    git pull
    ```
    
  - If there are any merge conflicts, resolve them in IntelliJ . After resolving, stage the changes again

    
  - Finally, push your changes to the main branch:
    ```bash
    git push 
    ```
        