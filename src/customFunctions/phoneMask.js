export default function mask(event) {
    var blank = "8 (___) ___ __ __"; // Маска с 8 в начале
    var i = 0;
    event.target.value = event.target.value.replace(/\D/g, ""); // Убираем все нецифровые символы

    // Логика для замены 7, +7 и 9
    if (event.target.value.startsWith("7")) {
        event.target.value = "8" + event.target.value.slice(1); // Заменяем 7 на 8
    } else if (event.target.value.startsWith("9")) {
        event.target.value = "89" + event.target.value.slice(1); // Заменяем 9 на 89
    } else if (event.target.value.startsWith("+7")) {
        event.target.value = "8" + event.target.value.slice(2); // Заменяем +7 на 8
    }

    // Применяем маску
    event.target.value = blank.replace(/./g, function (char) {
        if (/[_\d]/.test(char) && i < event.target.value.length)
            return event.target.value.charAt(i++);

        return i >= event.target.value.length ? "" : char;
    });
}
