const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const DictionaryAPI = {
    getDefinition(word, partOfSpeach, limit = 1) {
        const searchQuery = `http://api.pearson.com/v2/dictionaries/entries?headword=${word}&part_of_speech=${partOfSpeach}&limit=${limit}`;

        let request = new XMLHttpRequest();
        request.open("GET", searchQuery, false);
        request.send();
        try {
            let definition = JSON.parse(request.responseText).results[0].senses[0].definition;
            return definition;
        } catch(e) {
            return null;
        }
    }
};

module.exports = DictionaryAPI;