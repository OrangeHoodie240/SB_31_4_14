const fs = require('fs'); 

function cat(path){
    try{
        const contents = fs.readFileSync(path, 'utf-8'); 
        console.log(contents); 
    }
    catch(err){
        console.error("Error: ", err.message); 
        process.exit(1);
    }
}

cat(process.argv[2]); 