

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


// Обработчик события для отображения списка городов при фокусировке на поле ввода
document.addEventListener('DOMContentLoaded', () => {
	// Вызываем функцию для поля "Город отправки"
	showCitiesList('fromCity');

	// Вызываем функцию для поля "Город назначения"
	showCitiesList('toCity');

	showPackageList('packageSize');

});


async function showCitiesList(inputId) {
	const inputField = document.getElementById(inputId);

	try {
		// Выполнение запроса к API для получения списка городов
		const response = await fetch('https://shift-backend.onrender.com/delivery/points');
		const responseData = await response.json();

		// Проверка, что данные являются объектом и у него есть свойство "points"
		// if (responseData && responseData.success && responseData.points && Array.isArray(responseData.points)) {
		// 	// Вывод списка городов в консоль
		console.log('Список городов:');
		responseData.points.forEach(city => {
			console.log(city.name);
		});

		// Очистка текущих опций в select
		inputField.innerHTML = '';

		// Добавление опции "Выберите город"
		const defaultOption = document.createElement('option');
		defaultOption.value = '';
		defaultOption.text = 'Выберите город';
		inputField.appendChild(defaultOption);

		// Заполнение select городами
		responseData.points.forEach(city => {
			const option = document.createElement('option');
			option.value = city.id;
			option.text = city.name;
			inputField.appendChild(option);
		});

		// 	console.log('Список городов успешно загружен и отображен.');
		// } else {
		// 	console.error('Ошибка при загрузке городов: неверный формат данных', responseData);
		// }
	} catch (error) {
		console.error('Ошибка при загрузке городов:', error);
	}
}



async function showPackageList(inputId) {
	const inputField = document.getElementById(inputId);

	try {
		const response = await fetch('https://shift-backend.onrender.com/delivery/package/types');
		const responseData = await response.json();


		console.log('Список размеров посылки:');
		responseData.packages.forEach(packageItem => {
			console.log(packageItem.name);
		});

		// Очистка текущих опций в select
		inputField.innerHTML = '';

		// Добавление опции "Выберите город"
		const defaultOption = document.createElement('option');
		defaultOption.value = '';
		defaultOption.text = 'Выберите размер посылки';
		inputField.appendChild(defaultOption);

		// Заполнение select городами
		responseData.packages.forEach(packageItem => {
			const option = document.createElement('option');
			option.value = packageItem.id;
			option.text = packageItem.name;
			inputField.appendChild(option);
		});

	}
	catch (error) {
		console.error('Ошибка при загрузке размеров посылки:', error);
	}
}
