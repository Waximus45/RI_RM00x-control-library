class RM00x {
    device = null;
    servos = new Object();

    constructor (device, onready) {
        this.device = device;

        write_to_address(this.device, 0x00, [0x31])
        .then(() => write_to_address(this.device, 0xFE, [0x5F]))
        .then(() => write_to_address(this.device, 0x00, [0x21]))
        .then(() => onready());
    }

    create_servo (name, index) {
        this.servos[name] = new Servo(this.device, index, -100, 100);
    }

    set_servo (name, position) {
        this.servos[name].set_position(position);
    }

    release_device () {
        return this.device.releaseInterface(0)
        .then(() => this.device.close())
        .then(() => {
            this.device = null;
        });
    }

    static fetch_device () {
        return navigator.usb.requestDevice({ filters: [{ vendorId: 0x1A86, productId: 0x5512 }] })
        .then((device) => device.open()
            .then(() => device.selectConfiguration(1))
            .then(() => device.claimInterface(0))
            .then(() => device.selectAlternateInterface(0, 0))
            .then(() => device)
        );
    }
};

class Servo {
    #device = null;
    #address;
    #position = 0;
    #minPosition;
    #maxPosition;

    constructor (device, index, minPosition = 0, maxPosition = 180) {
        this.#device = device;
        this.#address = (index * 4) + 0x06; // Get address of servo by it's index

        this.#minPosition = minPosition;
        this.#maxPosition = maxPosition;

        this.set_position(0); // Move to default position
    }

    set_position (position) {
        if (position < this.#minPosition)
            position = this.#minPosition;
        if (position > this.#maxPosition)
            position = this.#maxPosition;

        write_to_address(this.#device, this.#address, [0x00, 0x00, position & 0xFF, (position >> 8) & 0xFF]);
    }
    get position () {
        return this.#position;
    }
};

function write_to_address (device, address, data) {
    let bytes = Uint8Array.from([
        0xAA, 0x74, 0x80 | (data.length + 2) & 0x0F, 0x80, address, ...data, 0x75, 0x00
    ]);

    return device.transferOut(2, bytes);
}

export {
    RM00x,
    Servo
};