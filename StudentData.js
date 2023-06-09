const students = [
  { name: 'John', marks: [64, 81, 72, 89, 79, 67] },
  { name: 'Mary', marks: [71, 74, 76, 78, 64, 81] },
  { name: 'Anne', marks: [74, 76, 72, 82, 80, 73] },
  { name: 'Mark', marks: [69, 64, 59, 66, 86, 72] },
  { name: 'Rick', marks: [82, 80, 77, 84, 83, 79] },
  { name: 'Eve', marks: [88, 86, 90, 77, 74, 80] }
];
 

const subjects = ['Math', 'Bio', 'Geo', 'Eng', 'Hist', 'Physics'];

// Function to generate the student table
function generateStudentTable() {
  const tableBody = document.querySelector('#student-table tbody');
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const row = document.createElement('tr');

    const studentCell = document.createElement('td');
    studentCell.textContent = student.name;
    row.appendChild(studentCell);

    for (let j = 0; j < student.marks.length; j++) {
      const markCell = document.createElement('td');
      markCell.textContent = student.marks[j];
      row.appendChild(markCell);
    }

    tableBody.appendChild(row);
  }
}

// Function to sort the student list by average marks in ascending order
function sortStudentsAscending() {
  const studentsList = document.querySelector('#students-ul');
  students.sort((studentA, studentB) => {
    const averageA = studentA.marks.reduce((a, b) => a + b, 0) / studentA.marks.length;
    const averageB = studentB.marks.reduce((a, b) => a + b, 0) / studentB.marks.length;
    return averageA - averageB;
  });

  // Clear the current student list
  studentsList.innerHTML = '';

  // Add sorted students to the list
  students.forEach(student => {
    const listItem = document.createElement('li');
    listItem.textContent = student.name;
    studentsList.appendChild(listItem);
  });
}

// Function to sort the student list by average marks in descending order
function sortStudentsDescending() {
  const studentsList = document.querySelector('#students-ul');
  students.sort((studentA, studentB) => {
    const averageA = studentA.marks.reduce((a, b) => a + b, 0) / studentA.marks.length;
    const averageB = studentB.marks.reduce((a, b) => a + b, 0) / studentB.marks.length;
    return averageB - averageA;
  });

  // Clear the current student list
  studentsList.innerHTML = '';

  // Add sorted students to the list
  students.forEach(student => {
    const listItem = document.createElement('li');
    listItem.textContent = student.name;
    studentsList.appendChild(listItem);
  });
}

// Function to sort the subject list by average marks in ascending order
function sortSubjectsAscending() {
  const subjectsList = document.querySelector('#students-ul');
  subjects.sort((subjectA, subjectB) => {
    const averageA = students.reduce((sum, student) => sum + student.marks[subjects.indexOf(subjectA)], 0) / students.length;
    const averageB = students.reduce((sum, student) => sum + student.marks[subjects.indexOf(subjectB)], 0) / students.length;
    return averageA - averageB;
  });

  // Clear the current subject list
  subjectsList.innerHTML = '';

  // Add sorted subjects to the list
  subjects.forEach(subject => {
    const listItem = document.createElement('li');
    listItem.textContent = subject;
    subjectsList.appendChild(listItem);
  });
}

// Function to sort the subject list by average marks in descending order
function sortSubjectsDescending() {
  const subjectsList = document.querySelector('#students-ul');
  subjects.sort((subjectA, subjectB) => {
    const averageA = students.reduce((sum, student) => sum + student.marks[subjects.indexOf(subjectA)], 0) / students.length;
    const averageB = students.reduce((sum, student) => sum + student.marks[subjects.indexOf(subjectB)], 0) / students.length;
    return averageB - averageA;
  });

  // Clear the current subject list
  subjectsList.innerHTML = '';

  // Add sorted subjects to the list
  subjects.forEach(subject => {
    const listItem = document.createElement('li');
    listItem.textContent = subject;
    subjectsList.appendChild(listItem);
  });
}

// Function to display the statistics of each subject
function displaySubjectStats() {
  const subjectStats = document.querySelector('#student-stats-ul');
  let stats = '';

  subjects.forEach(subject => {
    let highestScore = 0;
    let highestScoreStudent = '';
    let lowestScore = Infinity;
    let lowestScoreStudent = '';

    students.forEach(student => {
      const score = student.marks[subjects.indexOf(subject)];
      if (score > highestScore) {
        highestScore = score;
        highestScoreStudent = student.name;
      }
      if (score < lowestScore) {
        lowestScore = score;
        lowestScoreStudent = student.name;
      }
    });

    stats += `Subject: ${subject} | Highest Score: ${highestScore} (Student: ${highestScoreStudent}) | Lowest Score: ${lowestScore} (Student: ${lowestScoreStudent})\n`;
  });

  subjectStats.textContent = stats;
}

// Function to display the statistics of each student
function displayStudentStats() {
  const studentStats = document.querySelector('#student-stats-ul');
  let stats = '';

  students.forEach(student => {
    let highestScore = 0;
    let highestScoreSubject = '';
    let lowestScore = Infinity;
    let lowestScoreSubject = '';

    subjects.forEach(subject => {
      const score = student.marks[subjects.indexOf(subject)];
      if (score > highestScore) {
        highestScore = score;
        highestScoreSubject = subject;
      }
      if (score < lowestScore) {
        lowestScore = score;
        lowestScoreSubject = subject;
      }
    });

    stats += `Student: ${student.name} | Highest Score: ${highestScore} (Subject: ${highestScoreSubject}) | Lowest Score: ${lowestScore} (Subject: ${lowestScoreSubject})\n`;
  });

  studentStats.textContent = stats;
}

// Function to display the subjects that have an average higher than the student average
function displaySubjectsAboveAverage() {
  const studentStats = document.querySelector('#student-stats-ul');
  let stats = '';

  students.forEach(student => {
    const average = student.marks.reduce((total, mark) => total + mark, 0) / student.marks.length;

    subjects.forEach((subject, index) => {
      const subjectAverage = students.reduce((sum, currStudent) => sum + currStudent.marks[index], 0) / students.length;
      if (subjectAverage > average) {
        stats += `Subject: ${subject} | Average: ${subjectAverage.toFixed(2)}\n`;
      }
    });
  });

  studentStats.textContent = stats;
}

// Function to display the students that have an average higher than the class average
function displayStudentsAboveAverage() {
  const studentStats = document.querySelector('#student-stats-ul');
  let stats = '';

  const classAverage = students.reduce((total, student) => {
    const sum = student.marks.reduce((a, b) => a + b, 0);
    return total + sum;
  }, 0) / (students.length * subjects.length);

  students.forEach(student => {
    const average = student.marks.reduce((a, b) => a + b, 0) / subjects.length;
    if (average > classAverage) {
      stats += `Student: ${student.name} | Average: ${average.toFixed(2)}\n`;
    }
  });

  studentStats.textContent = stats;
}

// Function to display the subjects that have an average higher than the class average
function displaySubjectsAboveClassAverage() {
  const subjectStats = document.querySelector('#student-stats-ul');
  let stats = '';

  const classAverage = students.reduce((total, student) => {
    const sum = student.marks.reduce((a, b) => a + b, 0);
    return total + sum;
  }, 0) / (students.length * subjects.length);

  subjects.forEach(subject => {
    const subjectAverage = students.reduce((total, student) => total + student.marks[subjects.indexOf(subject)], 0) / students.length;
    if (subjectAverage > classAverage) {
      stats += `Subject: ${subject} | Average: ${subjectAverage.toFixed(2)}\n`;
    }
  });

  subjectStats.textContent = stats;
}

// Function to display the students that have an average lower than the class average
function displayStudentsBelowClassAverage() {
  const studentStats = document.querySelector('#student-stats-ul');
  let stats = '';

  const classAverage = students.reduce((total, student) => {
    const sum = student.marks.reduce((a, b) => a + b, 0);
    return total + sum;
  }, 0) / (students.length * subjects.length);

  students.forEach(student => {
    const average = student.marks.reduce((a, b) => a + b, 0) / subjects.length;
    if (average < classAverage) {
      stats += `Student: ${student.name} | Average: ${average.toFixed(2)}\n`;
    }
  });

  studentStats.textContent = stats;
}

// Generate the student table and buttons when the page is loaded
window.addEventListener('load', () => {
  generateStudentTable();

  const ascendingStudentsBtn = document.querySelector('#ascending-students-btn');
  ascendingStudentsBtn.addEventListener('click', sortStudentsAscending);

  const descendingStudentsBtn = document.querySelector('#descending-students-btn');
  descendingStudentsBtn.addEventListener('click', sortStudentsDescending);

  const ascendingSubjectsBtn = document.querySelector('#ascending-subjects-btn');
  ascendingSubjectsBtn.addEventListener('click', sortSubjectsAscending);

  const descendingSubjectsBtn = document.querySelector('#descending-subjects-btn');
  descendingSubjectsBtn.addEventListener('click', sortSubjectsDescending);

  const subjectStatsBtn = document.querySelector('#subject-stats-btn');
  subjectStatsBtn.addEventListener('click', displaySubjectStats);

  const studentStatsBtn = document.querySelector('#student-stats-btn');
  studentStatsBtn.addEventListener('click', displayStudentStats);

  const subjectsAboveAvgBtn = document.querySelector('#subject-above-average-btn');
  subjectsAboveAvgBtn.addEventListener('click', displaySubjectsAboveAverage);

  const studentsAboveAvgBtn = document.querySelector('#student-above-average-btn');
  studentsAboveAvgBtn.addEventListener('click', displayStudentsAboveAverage);

  const subjectsAboveClassAvgBtn = document.querySelector('#subjects-class-above-average-btn');
  subjectsAboveClassAvgBtn.addEventListener('click', displaySubjectsAboveClassAverage);

  const studentsBelowClassAvgBtn = document.querySelector('#students-class-below-average-btn');
  studentsBelowClassAvgBtn.addEventListener('click', displayStudentsBelowClassAverage);
});
