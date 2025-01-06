const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.vigenere = Array.from(Array(26))
      .map((_, index) => index + 65)
      .map((char) => String.fromCharCode(char));
    this.encoder = (cipherSymb, keySymb, encType) => {
      const cipherSymbIndex = this.vigenere.findIndex((el) =>
        el.includes(cipherSymb.toUpperCase())
      );
      const keySymbIndex = this.vigenere.findIndex((el) =>
        el.includes(keySymb.toUpperCase())
      );

      let shift;

      if (encType === "enc") {
        shift =
          cipherSymbIndex + keySymbIndex >= 26
            ? cipherSymbIndex + keySymbIndex - 26
            : cipherSymbIndex + keySymbIndex;
      } else {
        shift =
          cipherSymbIndex - keySymbIndex < 0
            ? cipherSymbIndex - keySymbIndex + 26
            : cipherSymbIndex - keySymbIndex;
      }

      return this.vigenere[shift];
    };
    this.generateKey = (message, key) => {
      const messageCleanLength = message.split(" ").join().length;
      return key.length < messageCleanLength
        ? key.repeat(Math.ceil(messageCleanLength / key.length))
        : key;
    };
  }

  encrypt(message, key) {
    if (!(message && key)) {
      throw new Error("Incorrect arguments!");
    }

    key = this.generateKey(message, key);

    const result = [];
    let keyIndex = 0;

    for (const symb of message.split("")) {
      if (symb.toLowerCase() !== symb.toUpperCase()) {
        result.push(this.encoder(symb, key[keyIndex], "enc"));
        keyIndex += 1;
      } else {
        result.push(symb);
      }
    }

    return this.isDirect ? result.join("") : result.reverse().join("");
  }
  decrypt(message, key) {
    if (!(message && key)) {
      throw new Error("Incorrect arguments!");
    }

    key = this.generateKey(message, key);

    const result = [];
    let keyIndex = 0;

    for (const symb of message.split("")) {
      if (symb.toLowerCase() !== symb.toUpperCase()) {
        result.push(this.encoder(symb, key[keyIndex], "dec"));
        keyIndex += 1;
      } else {
        result.push(symb);
      }
    }

    return this.isDirect ? result.join("") : result.reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine
};
