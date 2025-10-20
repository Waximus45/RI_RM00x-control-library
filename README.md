#RM00x

Это библиотека, созданная для управления манипуляторами модели Robot Manipulator версий 00x от RoboIntellect.

##RM00x js-browser

Версия для программирования на языке JavaScript для браузера.

Получение манипулятора из списка доступных устройств.
```js
const device = RM00x.fetch_device();
```

Создание экземпляра манипулятора на основе полученного устройства.
```js
const rm = new RM00x(device, postinit);
```

Добавление сервоприводов в функции пост-инициализации манипулятора.
```js
const postinit = function() {
    rm.create_servo("base", 0);
};
```