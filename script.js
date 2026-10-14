/**
 * ===========================================================================
 * EduTrack - Student Management System (script.js)
 * Author: Saiganesh Durgarao Yalamanchi
 * Assignment: Internnova Week 5 JavaScript Project
 * ============================================================================
 */

// --- TASK 3: Variables, Arrays & Objects ---
const STORAGE_KEY = 'edutrack_students_v1';

// Default seed array of student objects for immediate testing
const DEFAULT_STUDENTS = [
  {
    id: 'stu-101',
    name: 'Aarav Sharma',
    roll: 'CS-101',
    email: 'aarav.sharma@edutrack.edu',
    course: 'Computer Science',
    marks: 92
  },
  {
    id: 'stu-102',
    name: 'Priya Nair',
    roll: 'AI-104',
    email: 'priya.nair@edutrack.edu',
    course: 'AI & Machine Learning',
    marks: 86
  },
  {
    id: 'stu-103',
    name: 'Rohan Deshmukh',
    roll: 'IT-108',
    email: 'rohan.d@edutrack.edu',
    course: 'Information Technology',
    marks: 74
  },
  {
    id: 'stu-104',
    name: 'Sneha Kulkarni',
    roll: 'DS-112',
    email: 'sneha.k@edutrack.edu',
    course: 'Data Science',
    marks: 34
  }
];

// Application State
let students = [];

// --- TASK 4: Selecting HTML Elements (DOM Selection) ---
const studentForm = document.getElementById('studentForm');
const editStudentIdInput = document.getElementById('editStudentId');
const nameInput = document.getElementById('studentName');
const rollInput = document.getElementById('studentRoll');
const marksInput = document.getElementById('studentMarks');
const emailInput = document.getElementById('studentEmail');
const courseInput = document.getElementById('studentCourse');

const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const liveGradePreview = document.getElementById('liveGradePreview');
const alertBox = document.getElementById('alertBox');

const searchInput = document.getElementById('searchInput');
const filterCourse = document.getElementById('filterCourse');
const filterStatus = document.getElementById('filterStatus');
const sortBy = document.getElementById('sortBy');

const studentTableBody = document.getElementById('studentTableBody');
const emptyState = document.getElementById('emptyState');
const recordCountText = document.getElementById('recordCountText');

const statTotalStudents = document.getElementById('statTotalStudents');
const statAverageMarks = document.getElementById('statAverageMarks');
const statPassRate = document.getElementById('statPassRate');
const statPassCount = document.getElementById('statPassCount');
const statTopScorer = document.getElementById('statTopScorer');
const statTopScoreMeta = document.getElementById('statTopScoreMeta');

const resetDemoBtn = document.getElementById('resetDemoBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

// --- TASK 3 & 5: Functions, Conditional Statements & Score Calculation ---

/**
 * Calculates letter grade and Pass/Fail status based on numerical marks.
 * @param {number} marks - Student marks between 0 and 100
 * @returns {Object} Grade and status metadata
 */
function calculateAcademicMetrics(marks) {
  const numericMarks = Number(marks);
  let grade = 'F';
  let status = 'Fail';

  if (numericMarks >= 90) {
    grade = 'A+';
    status = 'Pass';
  } else if (numericMarks >= 80) {
    grade = 'A';
    status = 'Pass';
  } else if (numericMarks >= 70) {
    grade = 'B';
    status = 'Pass';
  } else if (numericMarks >= 55) {
    grade = 'C';
    status = 'Pass';
  } else if (numericMarks >= 40) {
    grade = 'D';
    status = 'Pass';
  } else {
    grade = 'F';
    status = 'Fail';
  }

  return { grade, status };
}

/**
 * Loads student records from localStorage or initializes with default data.
 */
function loadStudents() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    students = JSON.parse(savedData);
  } else {
    students = [...DEFAULT_STUDENTS];
    saveStudents();
  }
}

/**
 * Persists current student array to localStorage.
 */
function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

/**
 * Displays a temporary notification alert in the form panel.
 */
function showAlert(message, type = 'error') {
  alertBox.textContent = message;
  alertBox.className = `alert ${type === 'success' ? 'alert-success' : 'alert-error'}`;
  alertBox.classList.remove('hidden');

  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 3500);
}

// --- TASK 5: Form Validation ---
function validateFormData(name, roll, email, course, marks, editingId) {
  if (!name || !roll || !email || !course || marks === '') {
    return 'Please fill in all required fields.';
  }

  if (name.length < 2) {
    return 'Student name must be at least 2 characters long.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return 'Please enter a valid email address.';
  }

  const numericMarks = Number(marks);
  if (isNaN(numericMarks) || numericMarks < 0 || numericMarks > 100) {
    return 'Marks must be a valid number between 0 and 100.';
  }

  // Check duplicate Roll Number using Array.some()
  const isDuplicateRoll = students.some(
    (stu) => stu.roll.toLowerCase() === roll.toLowerCase() && stu.id !== editingId
  );

  if (isDuplicateRoll) {
    return `Roll Number "${roll.toUpperCase()}" already exists. Please use a unique Roll Number.`;
  }

  return null; // Valid
}

// --- TASK 3 & 5: Array Methods (filter, sort, reduce) & Dynamic Rendering ---

/**
 * Filters and sorts the students array based on active UI controls.
 */
function getProcessedStudents() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCourse = filterCourse.value;
  const selectedStatus = filterStatus.value;
  const sortMode = sortBy.value;

  // 1. Array.filter() for search, department, and pass/fail status
  const filtered = students.filter((student) => {
    const { status } = calculateAcademicMetrics(student.marks);

    const matchesSearch =
      student.name.toLowerCase().includes(query) ||
      student.roll.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query);

    const matchesCourse =
      selectedCourse === 'ALL' || student.course === selectedCourse;

    const matchesStatus =
      selectedStatus === 'ALL' || status === selectedStatus;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  // 2. Array.sort() for multi-column sorting
  return filtered.sort((a, b) => {
    if (sortMode === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortMode === 'marks-desc') {
      return b.marks - a.marks;
    }
    if (sortMode === 'marks-asc') {
      return a.marks - b.marks;
    }
    // Default: roll-asc
    return a.roll.localeCompare(b.roll, undefined, { numeric: true });
  });
}

/**
 * Updates the 4 KPI Dashboard Cards using Array methods (reduce, filter).
 */
function updateDashboardStats() {
  const total = students.length;
  statTotalStudents.textContent = total;

  if (total === 0) {
    statAverageMarks.textContent = '0%';
    statPassRate.textContent = '0%';
    statPassCount.textContent = '0 Passed / 0 Failed';
    statTopScorer.textContent = '—';
    statTopScoreMeta.textContent = 'No records available';
    return;
  }

  // Calculate average marks using Array.reduce()
  const totalMarks = students.reduce((sum, stu) => sum + Number(stu.marks), 0);
  const average = (totalMarks / total).toFixed(1);
  statAverageMarks.textContent = `${average}%`;

  // Calculate Pass/Fail counts using Array.filter()
  const passedCount = students.filter(
    (stu) => calculateAcademicMetrics(stu.marks).status === 'Pass'
  ).length;
  const failedCount = total - passedCount;
  const passRate = Math.round((passedCount / total) * 100);

  statPassRate.textContent = `${passRate}%`;
  statPassCount.textContent = `${passedCount} Passed / ${failedCount} Failed`;

  // Find Top Scorer using Array.reduce()
  const topStudent = students.reduce((top, current) =>
    Number(current.marks) > Number(top.marks) ? current : top
  );
  statTopScorer.textContent = topStudent.name;
  statTopScoreMeta.textContent = `${topStudent.marks}\% (${topStudent.course})`;
}

// --- TASK 4: Updating Content Dynamically & Creating/Removing Elements ---

/**
 * Renders the filtered student list into the HTML table body.
 */
function renderStudentTable() {
  const visibleStudents = getProcessedStudents();
  studentTableBody.innerHTML = '';

  recordCountText.textContent = `Showing ${visibleStudents.length} of${students.length} student records`;

  if (visibleStudents.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');

    // Task 3: Loop through array using forEach
    visibleStudents.forEach((student) => {
      const { grade, status } = calculateAcademicMetrics(student.marks);
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td><strong>${student.roll.toUpperCase()}</strong></td>
        <td>
          <span class="student-name">${student.name}</span>
          <span class="student-email">${student.email}</span>
        </td>
        <td>${student.course}</td>
        <td><strong>${student.marks}%</strong></td>
        <td><span class="badge badge-grade">${grade}</span></td>
        <td>
          <span class="badge ${status === 'Pass' ? 'badge-pass' : 'badge-fail'}">
            ${status}
          </span>
        </td>
        <td class="text-right">
          <button class="action-btn action-edit" data-action="edit" data-id="${student.id}">
            Edit
          </button>
          <button class="action-btn action-delete" data-action="delete" data-id="${student.id}">
            Delete
          </button>
        </td>
      `;

      studentTableBody.appendChild(tr);
    });
  }

  updateDashboardStats();
}

/**
 * Resets form fields and exits Edit Mode.
 */
function resetFormState() {
  studentForm.reset();
  editStudentIdInput.value = '';
  formTitle.textContent = 'Register New Student';
  submitBtn.textContent = '+ Add Student';
  cancelEditBtn.classList.add('hidden');
  liveGradePreview.textContent = 'Enter marks (0–100)';
}

// --- TASK 4: Events (Form Submit, Input, Change, Click) ---

// 1. Form Submit Event (Add or Update Student)
studentForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const roll = rollInput.value.trim().toUpperCase();
  const email = emailInput.value.trim();
  const course = courseInput.value;
  const marks = marksInput.value.trim();
  const editingId = editStudentIdInput.value;

  const validationError = validateFormData(name, roll, email, course, marks, editingId);
  if (validationError) {
    showAlert(validationError, 'error');
    return;
  }

  if (editingId) {
    // Task 5: Edit / Update Existing Student Data
    students = students.map((stu) =>
      stu.id === editingId
        ? { ...stu, name, roll, email, course, marks: Number(marks) }
        : stu
    );
    showAlert(`Updated record for ${name} (${roll}).`, 'success');
  } else {
    // Task 5: Add New Student Item
    const newStudent = {
      id: 'stu-' + Date.now(),
      name,
      roll,
      email,
      course,
      marks: Number(marks)
    };
    students.push(newStudent);
    showAlert(`Added ${name} (${roll}) to the directory.`, 'success');
  }

  saveStudents();
  resetFormState();
  renderStudentTable();
});

// 2. Input Event: Live Grade Preview while typing marks
marksInput.addEventListener('input', function () {
  const val = marksInput.value.trim();
  if (val === '' || Number(val) < 0 || Number(val) > 100) {
    liveGradePreview.textContent = 'Enter valid marks (0–100)';
    return;
  }
  const { grade, status } = calculateAcademicMetrics(Number(val));
  liveGradePreview.textContent = `Grade ${grade} (${status})`;
});

// 3. Button Click Event: Cancel Edit Mode
cancelEditBtn.addEventListener('click', function () {
  resetFormState();
});

// 4. Table Click Events (Event Delegation for Edit & Delete Buttons)
studentTableBody.addEventListener('click', function (event) {
  const targetBtn = event.target.closest('button[data-action]');
  if (!targetBtn) return;

  const action = targetBtn.dataset.action;
  const studentId = targetBtn.dataset.id;

  if (action === 'edit') {
    const studentToEdit = students.find((stu) => stu.id === studentId);
    if (!studentToEdit) return;

    editStudentIdInput.value = studentToEdit.id;
    nameInput.value = studentToEdit.name;
    rollInput.value = studentToEdit.roll;
    emailInput.value = studentToEdit.email;
    courseInput.value = studentToEdit.course;
    marksInput.value = studentToEdit.marks;

    const { grade, status } = calculateAcademicMetrics(studentToEdit.marks);
    liveGradePreview.textContent = `Grade ${grade} (${status})`;

    formTitle.textContent = `Edit Student: ${studentToEdit.roll}`;
    submitBtn.textContent = 'Save Changes';
    cancelEditBtn.classList.remove('hidden');
    nameInput.focus();
  }

  if (action === 'delete') {
    const studentToDelete = students.find((stu) => stu.id === studentId);
    if (!studentToDelete) return;

    if (confirm(`Are you sure you want to delete ${studentToDelete.name} (${studentToDelete.roll})?`)) {
      students = students.filter((stu) => stu.id !== studentId);
      saveStudents();
      if (editStudentIdInput.value === studentId) {
        resetFormState();
      }
      renderStudentTable();
      showAlert(`Removed ${studentToDelete.name} from directory.`, 'success');
    }
  }
});

// 5. Input & Change Events for Live Search, Department Filter, Status Filter & Sorting
searchInput.addEventListener('input', renderStudentTable);
filterCourse.addEventListener('change', renderStudentTable);
filterStatus.addEventListener('change', renderStudentTable);
sortBy.addEventListener('change', renderStudentTable);

// 6. Reset Demo Data & Clear All Click Events
resetDemoBtn.addEventListener('click', function () {
  if (confirm('Restore default sample student records?')) {
    students = [...DEFAULT_STUDENTS];
    saveStudents();
    resetFormState();
    renderStudentTable();
    showAlert('Sample demo data restored.', 'success');
  }
});

clearAllBtn.addEventListener('click', function () {
  if (students.length === 0) return;
  if (confirm('Are you sure you want to delete ALL student records?')) {
    students = [];
    saveStudents();
    resetFormState();
    renderStudentTable();
    showAlert('All student records cleared.', 'success');
  }
});

// Initialize Application on Page Load
document.addEventListener('DOMContentLoaded', function () {
  loadStudents();
  renderStudentTable();
});
