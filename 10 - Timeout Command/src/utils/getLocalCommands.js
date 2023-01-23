const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
  let localCommands = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, '..', 'commands'),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile);

      if (exceptions.includes(commandObject.name)) {
        continue;
      }

      localCommands.push(commandObject);
    }
  }

  return localCommands;
};
