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
    