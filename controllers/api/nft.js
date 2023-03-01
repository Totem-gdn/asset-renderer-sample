'use strict'
// підключеноємо необхідні бібліотеки для роботи
const path = require('path');
const fs = require('fs')

class NFTController {
  async get(req, res, next) {
    // виймаємо з параметрів урл - ід, по якій ми відображаємо певну картинку
    const { id } = req.params;
    // якщо айді нема, то формуємо відповідь з помилкою
    if (!id) {
      res.status(404).json({ error: 'Wrong format' })
    }

    // будуємо блок try-catch для відловлювання помилок
    try {
      // будуємо з айді шлях до нашого файлу
      // ми айді ділимо по модулю на 12, тому що в даному кроці в папці resources є 12 файлів
      const filePath = path.resolve(`resources/${id % 12}.png`);
      // якщо дійсно ми знайшли такий файл у нашій папці
      if (fs.existsSync(filePath)) {
        // ми його відправляємо користувачеві і відобраємо у браузері
        res.sendFile(filePath);
      } else {
        // цей блок відповідає за те, що в рачі чого ми не знайшли файл, і формуємо помилку користувачеві
        res.status(404).json({ error: 'File not found' })
      }
    } catch (error) {
      // цей блок виконує роль того, що якщо в блоці try виникне якась помилка, то ми можемо її опрацювати
      res.status(404).json({ error })
    }

  }
}

module.exports = new NFTController()