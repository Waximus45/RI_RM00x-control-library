<h1>RM00x js-browser</h1>
<p>Это библиотека, созданная для манипуляторов модели Robot Manipulator 00x.</p>
<p>Использование js-browser:</p>
<p>    new RM00x(device, post-init) -</p>
<p>        device - манипулятор</p>
<p>        post-init - Promise, вызывается после инициализации манипулятора</p>
<p>    RM00x.fetch_device() - запрос подключённого к устройству манипулятора</p>
<p>    RM00x.create_servo(name, index) - создаёт сервопривод манипулятора с именем name по индексу index</p>
<p>    RM00x.set_servo(name, pos) - устанавливает позицию сервопривода name в pos</p>
<p>    RM00x.release_device() - освобождает манипулятор</p>