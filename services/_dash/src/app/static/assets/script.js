function waitForId(id, interval = 50, retries = 200) {

    return new Promise((resolve, reject) => {
        const idExists = () => {
            try {
                return document.getElementById(id);
            } catch (e) {
                return null;
            }
        };

        let retriesLeft = retries;
        const searchInterval = setInterval(() => {
            const result = idExists();
            if (result) {
                clearInterval(searchInterval);
                resolve(result)
            } else {
                retriesLeft--;
                if (retriesLeft === 0) {
                    clearInterval(searchInterval);
                    reject();
                }
            }
        }, interval);
    });
}

waitForId('print').then(printButton => {
    printButton.addEventListener('click', () => {
        window.print();
    });
}).catch(() => {
    console.error("Print functionality is not working as expected.");
});
