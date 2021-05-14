const axios = require('axios');

const fs = require('fs');


function cat(path) {
    try {
        const contents = fs.readFileSync(path, 'utf-8');
        console.log(contents);
    }
    catch (err) {
        console.error("Error: ", err.message);
        process.exit(1);
    }
}

async function webCat(url) {
    try {
        const data = await axios.get(url)
            .then(resp => resp.data);
        console.log(data);
    }
    catch(err){
        console.error("Error", err.message);
        process.exit(1);
    }
}

const arg = process.argv[2]; 
try{
    const url = new URL(arg); 
    webCat(arg);
}
catch{
    cat(arg); 
}