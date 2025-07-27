# The idea of the project and my contribution

## Project concept
Building on our initial hackathon prototype, we transformed the “Missing Persons Finder” into a full‑featured VK Mini App that not only helps locate missing seniors but also lost pets

By leveraging the VK ecosystem and Yandex Maps integration, volunteers can view last‑known coordinates, submit and search reports directly in the app, and communicate instantly via a WebSocket‑powered chat

Our goal is to streamline the entire search process—reporting, mapping and real‑time coordination—so communities can respond faster and more effectively when a loved one or a pet goes missing
## My role and contributions
The team was responsible for developing user scenarios and visual design in Figma, while I fully implemented both parts of the application — from the server logic to the interface
### Architecture and modularity
* I developed a clean backend structure: I divided the code into modules — controllers, routes, models, utilities
* It provided easy maintenance and quick bug fixes due to the clear responsibility of each file
### Backend development (Node.js + Express + MongoDB/Mongoose)
* REST API: implemented CRUD endpoints for missing persons (people and animals), users, and logs
* Data storage: configured the schema in MongoDB via Mongoose, provided validation and indexing
* File upload: connected Multer to receive photos and documents; organized storage in the /uploads folder
* WebSocket chat: based on Socket.IO and WebSocket (ws) implemented a real chat for volunteers and moderators — instant transmission of information about the findings
* Security and configuration: configured CORS, dotenv — isolated environment parameters; implemented body‑parser for correct JSON processing
### Frontend development (React + VKUI + Vite.js)
* VK Mini App platform: integrated @vkontakte/vk-bridge, vk-mini-apps-router and vkui for native interaction with the VKontakte mobile client
* One-page application: I assembled the routing logic via react-router-dom, configured the missing persons report forms with validation and masks (react-input-mask)
* Maps and geolocation: implemented react-yandex-maps to display the points of the last location and navigation of volunteers
* Chat client: I connected the socket.io client to synchronize with the backend in real time
* Code quality: I set up ESLint with React plugins and rules — I maintained a uniform style and the absence of "dead" code
### Results and interaction with the team
* In 2 weeks, I designed and implemented the entire server side, then transferred the logic to the UI components of the VK Mini App
* I worked closely with the designers: I quickly adapted their layouts from Figma, offered UX edits
* The team prepared a presentation and presented a ready—made solution at the hackathon - the project won a prize

Thus, I acted as a full‑stack developer, providing a stable and extensible foundation for the service, ready for scaling and further development

## Below are the key screens of our application, demonstrating the main user scenarios

At the beginning of the page is the choice of the role (assistant / seeker), an interactive map with the points of the last location of the missing
![main](https://github.com/user-attachments/assets/92d79572-4b65-47bc-9fe6-91e97cdddc55)

The "How to help" section is an instruction for volunteers: departure by coordinates, search by data from the site, the process of transferring the found person
![next](https://github.com/user-attachments/assets/eae14259-30d6-417f-9d3a-4d0ed40485ff)

The application form contains a detailed report on the disappearance: the applicant's contact, the missing person's parameters (photo, clothing, time and place of disappearance) and the ability to instantly transfer data to the database
![nextnext](https://github.com/user-attachments/assets/d34f8ade-b804-46a8-b53d-251e24290ed1)

# SMP Frontend Setup Guide

Welcome! This guide will help you set up and run the **SMP Frontend** project locally  
Technologies used: **Node.js**, **Vite.js** and **React 17**

![Static Badge](https://img.shields.io/badge/Node.js-20.18.3-green?link=https%3A%2F%2Fnodejs.org%2Fen%2Fdownload) ![Static Badge](https://img.shields.io/badge/Vite.js-5.4.10-purple)
 ![Static Badge](https://img.shields.io/badge/React.js-17-blue)

---

## 1. Clone the Repository

Create a folder for the project, for example "SMP"

Next, use this command to ```git clone https://github.com/winipux21/SMP-backend``` the repository into the created folder

## 2. Install Dependencies

Use the ```npm install``` command to install all required dependencies

Use the ```npm run build``` command to build a project 

## 3. Run the Server
Start the backend server with: to run it, use the command ```node server.js```

And of course, don't forget to download the frontend part - [SMP-Backend](https://github.com/winipux21/SMP-backend/tree/master)
