function showRegisterForm() {
    document.getElementById("landingView").style.display = "none";
    document.getElementById("formsContainer").style.display = "flex";
    document.getElementById("registerCard").style.display = "block";
    document.getElementById("loginCard").style.display = "none";
}

function showLoginForm() {
    document.getElementById("landingView").style.display = "none";
    document.getElementById("formsContainer").style.display = "flex";
    document.getElementById("registerCard").style.display = "none";
    document.getElementById("loginCard").style.display = "block";
}

function toggleTheme() {
    document.body.classList.toggle("dark");
    const button = document.getElementById("themeBtn");
    button.innerHTML = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

function showPassword(id, button) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        button.innerHTML = "🙈";
    } else {
        input.type = "password";
        button.innerHTML = "👁️";
    }
}

// تسجيل طالب جديد وحفظه في الذاكرة
function registerStudent(event) {
    event.preventDefault();
    const pass = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;

    if (pass !== confirmPass) {
        alert("كلمة السر غير متطابقة!");
        return;
    }

    let studentData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phone: document.getElementById("studentPhone").value,
        parentPhone: document.getElementById("parentPhone").value,
        email: document.getElementById("email").value,
        password: pass,
        grade: document.getElementById("grade").value,
        governorate: document.getElementById("governorate").value,
        lastLogin: new Date().toLocaleTimeString()
    };

    let students = JSON.parse(localStorage.getItem("platformStudents")) || [];
    students.push(studentData);
    localStorage.setItem("platformStudents", JSON.stringify(students));

    document.getElementById("successMessage").style.display = "block";
    setTimeout(() => { window.location.href = "admin.html"; }, 1000);
}

// تسجيل الدخول
function loginStudent(event) {
    event.preventDefault();
    let phone = document.getElementById("loginPhone").value;
    let students = JSON.parse(localStorage.getItem("platformStudents")) || [];
    
    let student = students.find(s => s.phone === phone);
    if (student) {
        student.lastLogin = new Date().toLocaleTimeString();
        localStorage.setItem("platformStudents", JSON.stringify(students));
        alert("مرحباً بك مجدداً يا " + student.firstName);
        window.location.href = "admin.html";
    } else {
        alert("رقم الهاتف غير مسجل، برجاء إنشاء حساب جديد.");
    }
}