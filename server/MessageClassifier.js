const BayesClassifier = require('bayes-classifier');
const path = require('path');
const fs = require('fs');
const storeFilePath = path.join(__dirname, 'store.json');

let classifier = new BayesClassifier();
async function getClassifier() {
    // check if the classifier is already stored
    return new Promise((resolve, reject) => {
        fs.access(storeFilePath, fs.F_OK, (err) => {
            if (err) {
                // classifier is not storred
                console.error('error in classifier', err);

                // classifying
                const positiveDocuments = require(`${__dirname}/positiveDocs`);
                const negativeDocuments = require(`${__dirname}/negativeDocs`);

                classifier.addDocuments(positiveDocuments, `positive`);
                classifier.addDocuments(negativeDocuments, `negative`);

                classifier.train();

                // test logs
                console.log(classifier.classify(`Hey man!`)); // "positive"
                console.log(classifier.classify(`fuck off`)); // "negative"

                // Storing classifier
                fs.writeFileSync(storeFilePath, JSON.stringify(classifier));
                resolve(classifier);
            } else {
                // file exists
                // Restoring classifier
                let storedClassifier = require(storeFilePath);
                classifier.restore(storedClassifier);

                // test logs
                console.log("from existing trained model:");
                console.log(classifier.classify(`you rock`)); // "positive"
                console.log(classifier.classify(`FUCK off`)); // "negative"
                resolve(classifier);
            }
        });
    })
}
module.exports = getClassifier;