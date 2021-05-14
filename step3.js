const axios = require('axios');

const fs = require('fs');


function cat(path, outputPath=null) {
    let contents = null; 
    try {
        contents = fs.readFileSync(path, 'utf-8');

    }
    catch (err) {
        console.error("Error: ", err.message);
        process.exit(1);
    }

    if(outputPath === null){
        console.log(contents);
        return; 
    }

    try{
        fs.writeFileSync(outputPath, contents, 'utf-8'); 
    }
    catch(err){
        console.error("Error:", err.message);
        process.exit(1);
    }
}

async function webCat(url, outputPath=null) {
    let data = null; 
    try {
        data = await axios.get(url)
            .then(resp => resp.data);
    }
    catch(err){
        console.error("Error:", err.message);
        process.exit(1);
    }

    if(outputPath === null){
        console.log(data);
        return; 
    }

    try{
        fs.writeFileSync(outputPath, data, 'utf-8');
    }
    catch(err){
        console.error("Erorr:", err.message);
        process.exit(1); 
    }
}

const args = [];
if(process.argv[2] === '--out'){
    const read = process.argv[4];
    const outPath = process.argv[3]; 
    args.push(read, outPath);
}
else{
    args.push(process.argv[2]); 
}

try{
    const url = new URL(args[0]); 
    webCat.apply(null, args);
}
catch{
    cat.apply(null, args); 
}