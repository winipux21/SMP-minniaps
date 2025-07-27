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
1. First introduction and basic navigation
- VK Mini Apps card with a brief description of the service
- Main screen: interactive map with two filter tabs ‑ "People" and "Pets", as well as lower navigation between the Home / Chats sections / Profile. The user immediately understands how to switch between search categories and the main sections of the application.
<img width="181" height="401" alt="Рисунок1" src="https://github.com/user-attachments/assets/412380c7-8ce5-4c01-a957-52c3e3cdb341" /> <img width="255" height="544" alt="Рисунок2" src="https://github.com/user-attachments/assets/2e0ebfaf-db30-45e5-a621-6ebcdfd60da9" /> <img width="255" height="544" alt="Рисунок3" src="https://github.com/user-attachments/assets/26f1f541-5a6f-4c68-9979-d98b9c096a14" />
2. Operational coordination of volunteers
The following two screenshots illustrate how the built-in chat works, which allows teams to quickly synchronize without third-party messengers
<img width="264" height="532" alt="Рисунок4" src="https://github.com/user-attachments/assets/087a94fb-4d7c-4b2a-8a3f-b4a7779d3961" /> <img width="281" height="532" alt="Рисунок5" src="https://github.com/user-attachments/assets/c195fa8c-e0ee-4ed8-b290-6450a5345492" />
3. Filing of missing persons reports
Next is a demonstration of the form to fill out to search for a person / pet. All fields are masked/validated, which reduces the chance of typing errors
<img width="257" height="544" alt="Рисунок6" src="https://github.com/user-attachments/assets/e9507511-2b0f-40f0-be00-1a6998e77548" /> <img width="256" height="543" alt="Рисунок7" src="https://github.com/user-attachments/assets/ce1ee36f-0af2-49ef-a803-c663680f3254" /> <img width="255" height="542" alt="Рисунок8" src="https://github.com/user-attachments/assets/21157e41-a009-4c4a-9a98-87525e3c628b" />
4. Personal account and tracking of applications
You can monitor the status of applications in your profile 
<img width="256" height="544" alt="Рисунок9" src="https://github.com/user-attachments/assets/de5bdfc0-7ab5-4f21-a3ed-bd14011ddedb" /> <img width="256" height="544" alt="Рисунок10" src="https://github.com/user-attachments/assets/ba78d90a-b633-40c7-b53e-7e11c1190a04" />

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
