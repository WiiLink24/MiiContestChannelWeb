class WiiNumber {
  constructor(unscrambled) {
    this.unscrambled = unscrambled;
    this.hollywoodId = this.extractHollywoodID(unscrambled);
  }

  extractHollywoodID(unscrambled) {
    // Simulating the extraction of hollywoodId from unscrambled
    // This part should be adjusted according to the actual logic of the extraction
    return (unscrambled >> 32) & 0xffffffff;
  }

  checkWiiNumber() {
    let temp = this.unscrambled;
    for (let i = 0; i <= 42; i++) {
      let val = temp >> BigInt(52 - i);
      if (val & BigInt(1)) {
        val = BigInt(0x0000000000000635) << BigInt(42 - i);
        temp ^= val;
      }
    }
    return Number(temp & BigInt(0xff)) === 0;
  }

  getHollywoodID() {
    return this.hollywoodId;
  }
}

function loadWiiNumber(id) {
  return new WiiNumber(BigInt(id));
}

function validateFriendCode(strId) {
  if (strId.length !== 16) {
    // All Wii Numbers are 16 characters long.
    return false;
  }

  let id;
  try {
    id = BigInt(strId);
  } catch (e) {
    // Not an integer value, therefore not an ID
    return false;
  }

  const wiiNumber = loadWiiNumber(id);
  if (!wiiNumber.checkWiiNumber()) {
    // Invalid Wii Number (crc is invalid)
    return false;
  }

  return !(wiiNumber.getHollywoodID() === 0x0403ac68);
}

module.exports = {
  validateFriendCode,
};

