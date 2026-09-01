# Attendance-tracker



##  Project Overview

Attendance Tracker is a responsive web-based application designed to manage attendance records of event or club participants.

The application allows users to register participants using their name and participant ID, mark them as Present or Absent, view attendance records, search and filter participants, and monitor attendance statistics through a dashboard.


##  Features


- Add/register new participants
- Store participant Name and ID
- Mark participants as Present or Absent
- View all attendance records
- Search participants by Name or ID
- Filter participants by attendance status
- Edit participant details
- Delete participants
- Display total participants
- Display total Present and Absent participants
- Calculate attendance percentage automatically
- Store data using browser Local Storage
- Responsive and user-friendly dashboard UI
- Toast notifications for user actions

## 🛠️ Technologies Used

- **HTML5** – Used to create the structure of the application.
- **CSS3** – Used for styling, dashboard layout, responsive design, cards, tables, buttons and modal.
- **JavaScript** – Used to implement application functionality, attendance management, search, filtering, editing, deletion and dynamic updates.
- **Local Storage** – Used to save participant data in the browser so that data remains available after refreshing the page.

##  Approach

The project follows a simple client-side approach.

1. Participants are added through an input form.
2. Each participant is stored as a JavaScript object containing their ID, name and attendance status.
3. JavaScript dynamically displays the participant data in the attendance table.
4. Present and Absent buttons update the participant's attendance status.
5. Search and filter options allow users to quickly find specific participants.
6. The dashboard automatically calculates and displays total participants, Present participants, Absent participants and attendance percentage.
7. Local Storage is used to persist the data in the browser.
8. The application uses a responsive dashboard design so that it can work on different screen sizes.

##  Project Structure

Attendance-Tracker/

├── index.html  
├── style.css  
├── script.js  
└── README.md  

## How to Run

1. Download or clone the project.
2. Open the project folder in VS Code.
3. Make sure `index.html`, `style.css` and `script.js` are in the same folder.
4. Open `index.html` in any modern web browser.
5. Start adding participants and managing their attendance.

## Example

A participant can be added with:

- **Name:** Rahul Sharma
- **Participant ID:** P101
- **Status:** Present

The dashboard automatically updates the attendance statistics.

##  Objective

The main objective of this project is to provide a simple, organized and user-friendly solution for managing attendance of event or club participants.
