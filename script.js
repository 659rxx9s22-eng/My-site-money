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

// وظيفة مراقبة البيانات وتحديث الواجهة تلقائياً
function startMonitoring() {
    const clicksRef = db.ref('stats/clicks');
    const earningsRef = db.ref('stats/earnings');

    // تحديث النقرات
    clicksRef.on('value', (snapshot) => {
        const val = snapshot.val() || 0;
        const el = document.getElementById('total-clicks');
        if(el) el.innerText = val;
    });

    // تحديث الأرباح
    earningsRef.on('value', (snapshot) => {
        const val = snapshot.val() || 0;
        const el = document.getElementById('earnings');
        if(el) el.innerText = '$' + val.toFixed(2);
    });
}

window.onload = startMonitoring;
