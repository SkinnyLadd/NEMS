# PROJECT SETUP
  - Create a simple java project in IntelliJ with Maven named "NEMS".
# Backend
    - Right-Click on the project and select New → Module
    - Select SpringBoot and enter the following details:
        - Type: Maven
         - GroupId: com.car
         - Name: backend
        - Java Version: 21
         - JDK: 21
     - Click Next and choose the following dependencies:
         - Spring Web
         - Spring Data JPA
         - Spring Boot DevTools
         - Lombok
         - PostgreSQL Driver
         - Spring Security
     - And finally, click Finish.

# Frontend
    - First, install [Node.js](https://nodejs.org/dist/v23.11.0/node-v23.11.0-x64.msi).
        - (uncheck the Automatically install the necessary tools option during installation)
    - Restart IntelliJ.

    - Right-Click on the project and select New → Module
    - Select Vite and enter the following details:
        - Name: ui
        - Node interpreter: 23.11.0
        - Vite: npx create-vite (6.4.1)
        - Template: React (with TypeScript Checked)
    - There should be a pop-up at the bottom right corner of the screen asking to run npm install.
        - Click on it to install the necessary packages.

    - Now, we need to install tailwindcss
        - cd to the ui directory then run the following command
          `npm install tailwindcss @tailwindcss/vite`
