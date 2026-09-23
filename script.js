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

// تسجيل طالب جديد وإرسال البيانات إلى Google Sheets ولوحة التحكم
function registerStudent(event) {
    event.preventDefault();
    const pass = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;

    if (pass !== confirmPass) {
        alert("كلمة السر غير متطابقة!");
        return;
    }

    // رابط الويب السحري المحدث والصحيح
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxX2-cqLNiCfRK540mJxzaoNa1MxSHRCpf9Nlcc9Pe9OX1qwY5VKI9tAyqQkQ3988vL/exec';

    let studentData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phone: document.getElementById("studentPhone").value,
        parentPhone: document.getElementById("parentPhone").value,
        grade: document.getElementById("grade").value,
        email: document.getElementById("email").value,
        password: pass,
        governorate: document.getElementById("governorate").value,
        watched: 0,
        total: 10,
        subscription: "Standard"
    };

    // حفظ محلياً عشان تظهر في لوحة التحكم فوراً
    let students = JSON.parse(localStorage.getItem("platformStudents")) || [];
    // التأكد من عدم تكرار رقم الهاتف
    let existingIndex = students.findIndex(s => s.phone === studentData.phone);
    if (existingIndex >= 0) {
        students[existingIndex] = studentData;
    } else {
        students.push(studentData);
    }
    localStorage.setItem("platformStudents", JSON.stringify(students));

    // إرسال البيانات لجوجل شيت أوتوماتيك
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
    })
    .then(() => {
        document.getElementById("successMessage").style.display = "block";
        setTimeout(() => { window.location.href = "admin.html"; }, 1000);
    })
    .catch(error => {
        console.error('Error!', error.message);
        // حتى لو حصل خطأ في الشبكة، البيانات اتفظت محلياً وهتدخل لوحة التحكم
        window.location.href = "admin.html";
    });
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