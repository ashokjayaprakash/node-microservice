const { writeFile } = require('fs')


/**
 * To genereate file iteratively by input n
 * @param {*} n 
 */
async function generateFile(n) {
    if(!n || isNaN(parseInt(n))) return; 
    for(let i =1; i <= n; i++) {
        const data = `Hello ${i}`
        const fileName = `out/file-${i}.txt`
        await writeDataToFile(fileName, data)
    }
    console.log("Generated Successfully")
}

/**
 * To create the file and return promise response 
 * @param {*} fileName 
 * @param {*} data 
 */
function writeDataToFile(fileName, data) {
    return new Promise((res, rej) => {
        writeFile(fileName, data, (err, data) => {
            if(err) return rej(err)
            return res()
        })
    })    
}

generateFile(5)