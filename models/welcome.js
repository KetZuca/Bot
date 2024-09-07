const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  guildID: {
      type: String,
      required: true
  },
  canalID: {
      type: String,
      required: true
  },
  mensaje: {
      type: String,
      required: true
  },
  fondo: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model("welcome", Schema);