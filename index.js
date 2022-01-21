const fs = require('fs'),
    csv = require("csv-parser");
fs.stat('input_countries.csv', function (err) {
    if (err == null) {
        console.log('input_countries.csv File exists');
        var results = [];
        fs.createReadStream("input_countries.csv")
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
                fs.stat('canada.txt', function (err) {
                    if (err == null) {
                        console.log('canada.txt file exists');
                        fs.unlink('canada.txt', (err) => {
                            if (err) {
                                console.log(err)
                                return
                            }
                            console.log("canada.txt File Deleted...")
                        })
                    }
                    const arr = results.filter(result => result.country == "Canada")
                    const headers = 'country,year,population'
                    fs.writeFileSync('canada.txt', headers)
                    for (var i = 0; i < arr.length; i++) {
                        fs.writeFileSync('canada.txt', `\n${arr[i].country},${arr[i].year},${arr[i].population}`, { flag: 'a' })
                        
                    }
                })
                fs.stat('usa.txt', function (err) {
                    if (err == null) {
                        console.log('usa.txt file exists');
                        fs.unlink('usa.txt', (err) => {
                            if (err) {
                                console.log(err)
                                return
                            }
                            console.log("usa.txt File Deleted...")
                        })
                    }
                    const arr = results.filter(result => result.country == "United States")
                    const headers = 'country,year,population'
                    fs.writeFileSync('usa.txt', headers)
                    for (var i = 0; i < arr.length; i++) {
                        fs.writeFileSync('usa.txt', `\n${arr[i].country},${arr[i].year},${arr[i].population}`, { flag: 'a' })
                    }
                })
            });
    } else if (err.code === 'ENOENT') {
        console.log('input_countries.csv file does not exist');
    } else {
        console.log('Some other error: ', err.code);
    }
});