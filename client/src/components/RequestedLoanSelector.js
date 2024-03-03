import React, { useState } from 'react';

const AgeSelector = () => {
    const [age, setAge] = useState(18); // начальный возраст - 18 лет

    const handleAgeChange = (e) => {
        setAge(parseInt(e.target.value)); // обновляем состояние с выбранным возрастом
    };

    return (
        <div>
            <input
                type="range" // тип ползунка
                min="0" // минимальное значение возраста
                max="10000" // максимальное значение возраста
                value={age} // текущее значение
                onChange={handleAgeChange} // обработчик изменения значения
            />
            <p>Ваш возраст: {age} лет</p>
        </div>
    );
};

export default AgeSelector;
