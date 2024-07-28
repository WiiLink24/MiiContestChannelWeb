function encodeEntry(entry_id) {
    let num = entry_id;
    num = (num ^ ((num << 0x1E) ^ (num << 0x12) ^ (num << 0x18))) >>> 0;
    num = (num ^ ((num & 0xF0F0F0F) << 4)) >>> 0;
    num = (num ^ ((num >>> 0x1D) ^ (num >>> 0x11) ^ (num >>> 0x17) ^ 0x20070419)) >>> 0;

    let crc = ((num >>> 8) ^ (num >>> 24) ^ (num >>> 16) ^ (num & 0xFF) ^ 0xFF) >>> 0;
    if (232 < ((0xD4A50FFF < num) + (crc & 0xFF))) {
        crc &= 0x7F;
    }

    crc &= 0xFF;

    let crcBinary = crc.toString(2).padStart(8, '0');
    let numBinary = num.toString(2).padStart(32, '0');
    let combinedBinary = crcBinary + numBinary;
    let combinedNumberString = parseInt(combinedBinary, 2).toString().padStart(12, '0');

    return combinedNumberString.match(/.{1,4}/g).join('-');
}

function decodeEntry(entry_id) {
    let combinedNumberString = entry_id.replace(/-/g, '');
    let combinedBinary = parseInt(combinedNumberString).toString(2).padStart(40, '0');
    let crcBinary = combinedBinary.slice(0, 8);
    let numBinary = combinedBinary.slice(8);
    let num = parseInt(numBinary, 2);
    let crc = parseInt(crcBinary, 2);

    if (232 < ((0xD4A50FFF < num) + (crc & 0xFF))) {
        crc &= 0x7F;
    }

    crc &= 0xFF;

    num = (num ^ ((num >>> 0x1D) ^ (num >>> 0x11) ^ (num >>> 0x17) ^ 0x20070419)) >>> 0;
    num = (num ^ ((num & 0xF0F0F0F) << 4)) >>> 0;
    num = (num ^ ((num << 0x1E) ^ (num << 0x12) ^ (num << 0x18))) >>> 0;

    return num;
}

module.exports = {
    encodeEntry,
    decodeEntry
}