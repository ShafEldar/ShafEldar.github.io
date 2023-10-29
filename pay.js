const form = document.querySelector('form');
const cardNumberInput = form.querySelector('#card-number');
const cardExpiryInput = form.querySelector('#card-expiry');
const cardCvvInput = form.querySelector('#card-cvv');
const cardNameInput = form.querySelector('#card-name');
const cardAmountInput = form.querySelector('#card-amount');
 
form.addEventListener('submit', function(event) {
  event.preventDefault(); // отменяем стандартное поведение формы
 
  const cardNumber = cardNumberInput.value;
  const cardExpiry = cardExpiryInput.value;
  const cardCvv = cardCvvInput.value;
  const cardName = cardNameInput.value;
  const cardAmount = cardAmountInput.value;
 
  // проверка введенных данных
  if (cardNumber.length !== 16 || isNaN(cardNumber)) {
    alert('Введите правильный номер карты');
    return;
  }
 
  if (!/^[0-9]{2}\/[0-9]{2}$/.test(cardExpiry)) {
    alert('Введите правильный срок действия карты');
    return;
  }
 
  if (cardCvv.length !== 3 || isNaN(cardCvv)) {
    alert('Введите правильный CVV-код');
    return;
  }
 
  if (!cardName.trim()) {
    alert('Введите имя на карте');
    return;
  }
 
  if (cardAmount <= 0 || isNaN(cardAmount)) {
    alert('Введите правильную сумму платежа');
    return;
  }
 
  // отправка запроса на сервер
  fetch('/payment', {
    method: 'POST',
    body: JSON.stringify({
      cardNumber,
      cardExpiry,
      cardCvv,
      cardName,
      cardAmount
    })
  }).then(response => {
    if (response.ok) {
      alert('Платеж успешно произведен');
    } else {
      alert('Произошла ошибка при платеже');
    }
  }).catch(error => {
    alert(`Произошла ошибка: ${error.message}`);
  });
});