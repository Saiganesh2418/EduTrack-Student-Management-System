# 🎓 EduTrack — Interactive Student Management System


---

## 📌 Task 1: Project Planning

* **Project Title:** EduTrack – Interactive Student Management System
* **Project Objective:** To develop a complete, functional, and interactive client-side web application using HTML5, CSS3, and Vanilla JavaScript that allows educators and administrators to manage student records, compute grades, and analyze class performance in real time.
* **Target Users:** College administrators, faculty members, academic coordinators, and student community leads.
* **Technologies Used:** HTML5, CSS3 (CSS Grid, Flexbox, Responsive UI), Vanilla JavaScript (ES6+), and Browser `localStorage`.
* **Main Features:**
  * **Add & Delete Student Records:** Register students with full details or remove records with confirmation.
  * **Edit & Update Data:** Inline form population to modify existing student records seamlessly.
  * **Automatic Score & Grade Calculation:** Real-time computation of letter grades (`A+`, `A`, `B`, `C`, `D`, `F`) and Pass/Fail status.
  * **Live Search & Category Filtering:** Instant search by Name, Roll Number, or Email (`input` event) and filtering by Department or Status (`change` event).
  * **Multi-Column Sorting:** Sort directory records by Roll Number, Name (A–Z), or Marks (High-to-Low / Low-to-High).
  * **Form Validation:** Prevents empty inputs, out-of-range marks (0–100), invalid email formats, and duplicate Roll Numbers.
  * **Dynamic Dashboard Counters:** Automatically updates Total Students, Class Average, Pass Rate %, and Top Performer.


---

## 🧠 Task 6: Project Documentation & Reflection (345 Words)

### Project Overview
EduTrack is an interactive, browser-based Student Management System designed to streamline academic record-keeping. Built during Week 5 of the Internnova Internship, the application provides educators and administrators with a unified dashboard to manage student profiles, compute grades automatically, and monitor real-time class performance metrics.

### Features Implemented
The platform incorporates seven core features:
1. Full CRUD operations allowing users to add, edit, update, and delete student records.
2. Automated grade (`A+` through `F`) and Pass/Fail status calculation based on marks.
3. Live instant search across student names, roll numbers, and emails.
4. Multi-criteria filtering by academic department and pass/fail status.
5. Multi-column sorting by roll number, alphabetical name, or marks.
6. Client-side form validation preventing empty fields, invalid emails, out-of-range marks, and duplicate roll numbers.
7. Real-time analytics counters tracking Total Students, Class Average, Pass Rate, and Top Performer, backed by `localStorage` persistence.

### Technologies & JavaScript Concepts Used
The user interface is built with semantic HTML5 and responsive CSS3 utilizing Flexbox, CSS Grid, and custom variables. The application logic uses Vanilla JavaScript (ES6+), incorporating state arrays of objects, modular functions, conditional branching, template literals, and array methods including `filter()`, `map()`, `reduce()`, `sort()`, `find()`, and `some()`. DOM manipulation and event handling are implemented using `getElementById()`, `createElement()`, event delegation on table rows, and listeners for `submit`, `input`, `change`, and `click` events.

### Challenges Faced & Solutions Implemented
A primary challenge was maintaining synchronization between the active search/filter states, the data table, and the top analytics cards whenever a student record was edited or deleted. Furthermore, attaching individual event listeners to dynamically generated edit and delete buttons risked memory leaks and repetitive code. I resolved these challenges by implementing a single source-of-truth state array paired with a central `renderStudentTable()` pipeline, and by applying DOM event delegation on the parent `<tbody>` container using `data-id` attributes.

### What I Learned & Future Improvements
This project strengthened my ability to architect state-driven user interfaces using pure JavaScript without external libraries. For future improvements, I plan to add CSV/PDF report exports, attendance tracking charts, and a backend REST API database integration.
