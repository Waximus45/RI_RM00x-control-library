Это библиотека, созданная для манипуляторов модели Robot Manipulator 00x.
Использование js-browser:
    new RM00x(device, post-init) -
        device - манипулятор
        post-init - Promise, вызывается после инициализации манипулятора
    RM00x.fetch_device() - запрос подключённого к устройству манипулятора
    RM00x.create_servo(name, index) - создаёт сервопривод манипулятора с именем name по индексу index
    RM00x.set_servo(name, pos) - устанавливает позицию сервопривода name в pos
    RM00x.release_device() - освобождает манипулятор