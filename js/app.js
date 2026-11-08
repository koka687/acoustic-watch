// 1. Твій URL з MockAPI (зі скріншота)
const API_URL = "https://6af08bdf11a6aa866e7f9115.mockapi.io/api/v1/sensors"; 

// 2. Головна асинхронна функція для завантаження даних
async function loadSensors() { 
  try { 
    // Робимо запит на сервер
    const response = await fetch(API_URL); 
    
    // Перевіряємо, чи немає помилки (наприклад, 404)
    if (!response.ok) { 
      throw new Error(`HTTP error: ${response.status}`); 
    } 
    
    // Перетворюємо JSON-відповідь на масив об'єктів
    const sensors = await response.json(); 
    
    // Відправляємо масив на малювання
    renderSensors(sensors); 
    
  } catch (error) { 
    console.error("Не вдалося завантажити сенсори:", error); 
    const container = document.querySelector("#sensors-list");
    if (container) {
        container.innerHTML = "<p style='color: red;'>Помилка завантаження даних з API. Перевір вкладку Console.</p>";
    }
  } 
} 

// 3. Функція для створення HTML-карток
function renderSensors(sensors) { 
  // Знаходимо контейнер, який ми залишили в HTML
  const container = document.querySelector("#sensors-list"); 
  
  if (!container) return;
  
  // Очищаємо перед додаванням (щоб не дублювалися)
  container.innerHTML = ""; 

  // Проходимось по кожному сенсору з масиву
  sensors.forEach((sensor) => { 
    const card = document.createElement("article"); 
    // Додаємо класи для краси (з твого CSS)
    card.classList.add("card", "sensor-card"); 
    
    if (sensor.status) {
        card.classList.add(sensor.status); // normal, warning або critical
    }

card.innerHTML = ` 
      <div class="sensor-card__header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0;">${sensor.name || sensor.id}</h3>
        <span class="status-badge ${sensor.status || ''}" style="position: static !important; padding: 4px 10px; border-radius: 8px; font-size: 14px; background: rgba(255,255,255,0.1);">
          ${sensor.status}
        </span>
      </div>
      <p style="margin: 8px 0;">Район: ${sensor.district}</p> 
      <p class="sensor-card__level" style="margin: 8px 0;">Рівень шуму: <strong>${sensor.noiseLevel} дБ</strong></p> 
    `; 
    
    container.append(card); 
  }); 
} 

// 4. Запускаємо весь процес тільки після того, як HTML повністю завантажиться
document.addEventListener("DOMContentLoaded", () => {
    loadSensors();
});