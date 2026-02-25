// Mobile nav
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

// Data kelas + kuis per kelas
const classes = {
  speaking: {
    tag: "Percaya Diri",
    title: "Public Speaking Mini Course",
    level: "Pemula",
    desc: "Latihan bicara terstruktur: pembuka, isi, penutup + cara mengatasi grogi.",
    video: "https://youtu.be/iMRoNIiCPE0?si=RMyy4U-bIX-0LJYx",
    list: [
      "Struktur presentasi 1 menit (mudah diingat)",
      "Latihan suara & kontak mata",
      "Cara menenangkan diri sebelum tampil"
    ],
    quiz: [
      {
        q: "1) Kalau kamu grogi saat presentasi, langkah paling membantu adalah…",
        options: [
          "Membayangkan hal buruk agar siap",
          "Tarik napas, susun poin, mulai dari pembuka sederhana",
          "Menghindari presentasi sama sekali"
        ],
        answer: 1
      },
      {
        q: "2) Pembuka presentasi yang paling aman untuk pemula adalah…",
        options: [
          "Langsung loncat ke inti tanpa salam",
          "Perkenalan singkat + tujuan presentasi",
          "Minta maaf karena kamu grogi"
        ],
        answer: 1
      },
      {
        q: "3) Kontak mata saat presentasi sebaiknya…",
        options: [
          "Fokus ke satu orang saja",
          "Melihat ke lantai agar tidak grogi",
          "Sapu pandang ke beberapa area secara bergantian"
        ],
        answer: 2
      }
    ]
  },

  study: {
    tag: "Belajar Efektif",
    title: "Belajar Pintar: Notion & Catatan Rapi",
    level: "Pemula",
    desc: "Bikin catatan yang enak dibaca dan gampang diulang menjelang ujian.",
    video: "https://youtu.be/yD6dfHYgJm4?si=OBJ8Klhajm6MV1op",
    list: [
      "Template catatan: ringkas, jelas, rapi",
      "Teknik rangkum 3-2-1",
      "Checklist belajar harian biar konsisten"
    ],
    quiz: [
      {
        q: "1) Metode belajar fokus 25 menit lalu istirahat disebut…",
        options: ["Pomodoro", "Multitasking", "Overlearning nonstop"],
        answer: 0
      },
      {
        q: "2) Catatan yang baik biasanya…",
        options: [
          "Panjang banget supaya lengkap",
          "Ringkas, pakai heading dan poin penting",
          "Ditulis acak biar unik"
        ],
        answer: 1
      },
      {
        q: "3) Cara efektif sebelum ujian adalah…",
        options: [
          "Mengulang materi dengan rangkuman + latihan soal",
          "Begadang semalam penuh tanpa istirahat",
          "Hanya baca sekali tanpa latihan"
        ],
        answer: 0
      }
    ]
  },

  leader: {
    tag: "Leadership",
    title: "Leadership untuk OSIS & Organisasi",
    level: "Menengah",
    desc: "Belajar komunikasi tim, pembagian tugas, dan cara memimpin dengan empati.",
    video: "https://www.youtube.com/embed/v9CKPhoI49Q?si=d4nHPtmDl0cWiEXX",
    list: [
      "Komunikasi tim: jelas & sopan",
      "Cara memberi arahan tanpa menyakiti",
      "Menyusun agenda rapat yang efektif"
    ],
    quiz: [
      {
        q: "1) Leadership yang sehat itu artinya…",
        options: [
          "Harus selalu menang dan paling benar",
          "Mendengar tim, bertanggung jawab, dan mengarahkan dengan empati",
          "Menyuruh tanpa memberi contoh"
        ],
        answer: 1
      },
      {
        q: "2) Kalau ada anggota tim yang telat, yang paling tepat adalah…",
        options: [
          "Dimarahi di grup besar",
          "Ajak bicara baik-baik, cari sebabnya, buat solusi",
          "Dibiarkan saja sampai semua kacau"
        ],
        answer: 1
      },
      {
        q: "3) Agenda rapat yang baik harus punya…",
        options: [
          "Tujuan rapat + poin bahasan + pembagian tugas",
          "Topik random biar seru",
          "Durasi bebas tanpa arah"
        ],
        answer: 0
      }
    ]
  }
};

let currentClassKey = null;

// Render kuis untuk kelas yang dipilih
function renderQuiz(key){
  const quizWrap = document.getElementById("quizWrap");
  const quizResult = document.getElementById("quizResult");
  if(!quizWrap) return;

  const quiz = classes[key]?.quiz || [];
  quizWrap.innerHTML = quiz.map((item, idx) => {
    const name = `q_${key}_${idx}`;
    return `
      <div style="margin-bottom:10px;">
        <b>${item.q}</b><br/>
        ${item.options.map((opt, i) => `
          <label style="display:block;margin:6px 0;">
            <input type="radio" name="${name}" value="${i}"> ${opt}
          </label>
        `).join("")}
      </div>
    `;
  }).join("");

  if(quizResult){
    quizResult.style.display = "none";
    quizResult.textContent = "";
  }
}

window.openClass = function(key){
  const c = classes[key];
  if(!c) return;

  currentClassKey = key;

  const tag = document.getElementById("classTag");
  const title = document.getElementById("classTitle");
  const desc = document.getElementById("classDesc");
  const level = document.getElementById("classLevel");
  const video = document.getElementById("classVideo");
  const ul = document.getElementById("classList");

  if(tag) tag.textContent = c.tag;
  if(title) title.textContent = c.title;
  if(desc) desc.textContent = c.desc;
  if(level) level.textContent = c.level;
  if(video) video.src = c.video;
  if(ul) ul.innerHTML = c.list.map(x => `<li>${x}</li>`).join("");

  renderQuiz(key);
};

window.downloadPdf = function(){
  alert("PDF masih demo. Nanti ganti ke file materi asli, misalnya: assets/pdf/materi.pdf");
};

window.gradeQuiz = function(){
  const result = document.getElementById("quizResult");
  if(!result) return;

  if(!currentClassKey){
    result.style.display = "block";
    result.textContent = "Pilih kelas dulu ya, supaya kuisnya sesuai 🌸";
    return;
  }

  const quiz = classes[currentClassKey].quiz;
  let score = 0;
  let answered = 0;

  quiz.forEach((item, idx) => {
    const name = `q_${currentClassKey}_${idx}`;
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    if(selected){
      answered++;
      if(Number(selected.value) === item.answer) score++;
    }
  });

  result.style.display = "block";

  if(answered < quiz.length){
    result.textContent = `Kamu baru menjawab ${answered}/${quiz.length}. Lengkapi dulu ya 😊`;
    return;
  }

  const percent = Math.round((score/quiz.length)*100);
  let msg = percent === 100 ? "Mantap! Kamu paham banget ✅"
          : percent >= 67 ? "Bagus! Tinggal sedikit lagi 🔥"
          : "Santai, ulangi materi pelan-pelan ya 🌱";

  result.textContent = `Skor kamu: ${percent}% — ${msg}`;
};

// Active menu
window.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('nav a[data-page]').forEach(a => {
    if(a.getAttribute("data-page") === path) a.classList.add("active");
  });
});
