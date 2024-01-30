// index.js

function calculateDelivery() {
	// Получаем значения полей
	const fromCity = document.getElementById('fromCity').value;
	const toCity = document.getElementById('toCity').value;
	const packageSize = document.getElementById('packageSize').value;

	// Валидация полей
	if (!fromCity || !toCity || !packageSize) {
		alert('Пожалуйста, заполните все поля');
		return;
	}

	// Отправка запроса на расчет доставки
	fetch('https://shift-backend.onrender.com/api/delivery/calc', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			fromCity,
			toCity,
			packageSize,
		}),
	})
		.then(response => response.json())
		.then(data => {
			// Обработка результатов расчета (можете добавить код обновления интерфейса)
			console.log('Результат расчета доставки:', data);
		})
		.catch(error => {
			console.error('Ошибка при расчете доставки:', error);
		});
}
