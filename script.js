const firebaseConfig = {
    apiKey: "AIzaSyBf5F5vhbpu8fjp4rS9M-Uj-gUPR88qbds",
    authDomain: "my-site-6f7ff.firebaseapp.com",
    projectId: "my-site-6f7ff",
    storageBucket: "my-site-6f7ff.firebasestorage.app",
    messagingSenderId: "171038692625",
    appId: "1:171038692625:web:8c7742917d4b9d00a768b0",
    measurementId: "G-WDG48WFSK4",
    databaseURL: "https://my-site-6f7ff-default-rtdb.firebaseio.com"
};

// تهيئة Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// --- وظيفة التسجيل (للمستخدم الجديد) ---
function register() {
    const user = prompt("اختر اسم مستخدم جديد:");
    const pass = prompt("اختر كلمة مرور:");

    if (user && pass) {
        const userRef = db.ref('users_data/' + user);
        userRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                alert("هذا الاسم موجود، جرب اسماً آخر.");
            } else {
                // إنشاء بيانات المستخدم الافتراضية
                userRef.set({
                    password: pass,
                    clicks: 0,
                    earnings: 0
                }).then(() => alert("تم التسجيل بنجاح! سجل دخولك الآن."));
            }
        });
    }
}

// --- وظيفة تسجيل الدخول ---
function login() {
    const user = prompt("اسم المستخدم:");
    const pass = prompt("كلمة المرور:");

    if (user && pass) {
        const userRef = db.ref('users_data/' + user);
        userRef.once('value', (snapshot) => {
            const data = snapshot.val();
            if (data && data.password === pass) {
                alert("أهلاً بك " + user);
                // مراقبة بيانات هذا المستخدم فقط وتحديثها فوراً
                userRef.on('value', (update) => {
                    const latest = update.val();
                    document.getElementById('total-clicks').innerText = latest.clicks || 0;
                    document.getElementById('earnings').innerText = '$' + (latest.earnings || 0).toFixed(2);
                });
            } else {
                alert("بيانات الدخول خاطئة!");
            }
        });
    }
}

// تشغيل النظام عند فتح الصفحة
window.onload = () => {
    // يمكنك هنا اختيار البدء بالدخول أو التسجيل
    // سأترك لكِ حرية استدعاء login() أو register() عبر أزرار في الـ HTML
};
