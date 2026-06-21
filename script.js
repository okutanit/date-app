const card = document.getElementById("card");

let selectedPlace = "";
let selectedDate = "";
let selectedTime = "";
let selectedFood = "";
let currentStep = "top";

function moveButton(button) {
  const x = Math.random() * (window.innerWidth - 150);
  const y = Math.random() * (window.innerHeight - 80);

  button.style.position = "fixed";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}

function showTop() {
  currentStep = "top";

  card.innerHTML = `
    <div class="icon">🐶</div>
    <h1>俺とデート行かない？</h1>
    <p>Will you go on a date with me?</p>

    <div class="buttons">
      <button id="yesBtn">いいよー 💗</button>
      <button id="noBtn">いけない 💔</button>
    </div>
  `;

  document.getElementById("yesBtn").addEventListener("click", showYes);
  document.getElementById("noBtn").addEventListener("mouseover", function () {
    moveButton(this);
  });
  document.getElementById("noBtn").addEventListener("touchstart", function () {
    moveButton(this);
  });
}

function showYes() {
  currentStep = "yes";

  card.innerHTML = `
    <div class="icon">😳</div>
    <h1>行ってくれんの！？</h1>
    <p>WAIT... YOU ACTUALLY SAID YES?</p>

    <button id="nextBtn">うんうん →</button>
    <br><br>
    <button onclick="goBack()">← 戻る</button>
  `;

  document.getElementById("nextBtn").addEventListener("click", showDatePicker);
}

function showDatePicker() {
  currentStep = "date";

  card.innerHTML = `
    <div class="icon">📅</div>
    <h1>いつ空いてるん？</h1>
    <p>When are you free?</p>

    <input type="date" id="dateInput" value="${selectedDate}">

    <select id="timeInput">
      <option value="">時間を選んで</option>
      ${createTimeOptions()}
    </select>

    <button id="placeBtn">次へ →</button>
    <br><br>
    <button onclick="goBack()">← 戻る</button>
  `;

  document.getElementById("placeBtn").addEventListener("click", function () {
    selectedDate = document.getElementById("dateInput").value;
    selectedTime = document.getElementById("timeInput").value;

    showPlacePicker();
  });
}

function createTimeOptions() {
  const times = [
    "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00",
    "19:00", "20:00", "21:00", "22:00", "23:00"
  ];

  return times
    .map(function (time) {
      const selected = time === selectedTime ? "selected" : "";
      return `<option value="${time}" ${selected}>${time}</option>`;
    })
    .join("");
}

function showPlacePicker() {
  currentStep = "place";

  card.innerHTML = `
    <div class="icon">📍</div>
    <h1>どこ行きたい？</h1>
    <p>Choose our destination ✨</p>

    <div class="food-grid">
      <button onclick="selectPlace('♨️ 温泉旅行')">♨️<br>温泉旅行</button>
      <button onclick="selectPlace('🏰 ディズニー')">🏰<br>ディズニー</button>
      <button onclick="selectPlace('✈️ 海外旅行')">✈️<br>海外旅行</button>
      <button onclick="selectPlace('✨ 星空')">✨<br>星空</button>
      <button onclick="selectPlace('🛍️ ショッピング')">🛍️<br>ショッピング</button>
      <button onclick="selectPlace('☕ 'カフェ)">☕<br>カフェ</button>
    </div>

    <br>
    <button onclick="goBack()">← 戻る</button>
  `;
}

function selectPlace(place) {
  selectedPlace = place;
  showFoodPicker();
}

function showFoodPicker() {
  currentStep = "food";

  card.innerHTML = `
    <div class="icon">🍽️</div>
    <h1>最後の質問！何食べたい？</h1>
    <p>What do you want to eat?</p>

    <div class="food-grid">
      <button onclick="selectFood('🍝 イタリアン')">🍝<br>イタリアン</button>
      <button onclick="selectFood('🥂 フレンチ')">🥂<br>フレンチ</button>
      <button onclick="selectFood('🍣 和食')">🍣<br>和食</button>
      <button onclick="selectFood('🥟 中華')">🥟<br>中華</button>
      <button onclick="selectFood('🍖 韓食')">🍖<br>韓食</button>
      <button onclick="selectFood('🍰 スイーツ')">🍰<br>スイーツ</button>
    </div>

    <br>
    <button onclick="goBack()">← 戻る</button>
  `;
}

function selectFood(food) {
  selectedFood = food;
  showResult();
}

function showResult() {
  currentStep = "result";

  card.innerHTML = `
    <div class="ticket" id="ticket">
      <div class="ticket-title">DATE TICKET</div>

      <div class="icon">🎟️</div>

      <h1>デートプラン完成</h1>

      <p>📅 ${selectedDate || "日付未選択"}</p>
      <p>🕒 ${selectedTime || "時間未選択"}</p>
      <p>📍 ${selectedPlace || "場所未選択"}</p>
      <p>🍽️ ${selectedFood || "食事未選択"}</p>

      <hr>

      <h2 style="font-size:18px; text-align:center;">
        なーちゃんこれからもよろしくねー<br>
        大好きやで
      </h2>

      <p>❤️ ❤️ ❤️ ❤️ ❤️</p>
    </div>

    <button class="save-btn" onclick="saveTicket()">
      📸 記念画像として保存
    </button>
  `;
}

function goBack() {
  if (currentStep === "yes") {
    showTop();
  } else if (currentStep === "date") {
    showYes();
  } else if (currentStep === "place") {
    showDatePicker();
  } else if (currentStep === "food") {
    showPlacePicker();
  } else if (currentStep === "result") {
    showFoodPicker();
  }
}

window.selectPlace = selectPlace;
window.selectFood = selectFood;
window.goBack = goBack;

showTop();