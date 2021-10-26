const fs = require('fs');
// let finalFolder = "C:\Users\cardonacoder\OneDrive - UPB\Recordings\TGP";
let finalFolder = "C:/Users/cardonacoder/OneDrive - UPB/Recordings/F del D/";

const files = [
    {
        name: "1. Folder1",
        content: ["1. File1.1", "2. File1.2", "3. File1.3", "4. File1.4", "5. File1.5"]
    },
    {
        name: "2. Folder2",
        content: ["1. File2.1", "2. File2.2", "3. File2.3", "4. File2.4", "5. File2.5"]
    },
    {
        name: "33. Folder3",
        content: ["1. File3.1", "2. File3.2", "3. File3.3", "4. File3.4", "5. File3.5"]
    }
];

const createFolderFx = (folderName) => {

    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }

};

const createFileFx = (fileName, content) => fs.writeFile(fileName, content,function(err) {
    if(err) { return console.log(err); }
    console.log("The file was saved!");
});


const createTestFolders = (fname) => {

    var fileType = "";

    for (let i = 0; i < files.length; i++) {
    
        let name = fname+files[i].name;
        createFolderFx(name);

        for (let j = 0; j < files[i].content.length; j++) {
            j % 2 === 0 ? fileType = ".txt" : fileType = ".html";
            createFileFx(name+"/"+(files[i].content[j])+fileType,Math.random().toString());
        }
    }
};

const deleteTestFolders = (fname) => files.forEach( e => fs.rmdirSync(fname+e.name, { recursive: true }) );

const isSelectedType = (fileName, fileType) => fileName.slice(fileType.length*-1) === fileType ?  true : false;
const deleteFile = (path,file) => fs.unlink(path+file, e => { if(e){ console.log(e); } } );
const moveFile = (oldPath, newPath) => fs.rename(oldPath, newPath, e => e ? console.log(e) : console.log("Success!!"));

const renamingFiles = (folder, fileType) => {

    fs.readdir(folder, (e, file) => {

        let path = folder.slice(0,folder.lastIndexOf("/"));
        let dest = path.lastIndexOf("/");
        let finalDest = path.slice(0,dest)+"/";
        let ini = dest+1;

        let fin = folder.indexOf(". ",ini);
        let number = folder.slice(ini,fin);
        let initNum = number.length === 2 ? number : "0"+number;

        if(e){ console.log(e); }          
        file.forEach( f => { 
            let slicePos = f.indexOf(". ",);
            let aux = f.slice(0,slicePos);
            let auxZero = aux.length === 2 ? aux : "0"+aux;
            let finalName =finalDest+initNum+" "+auxZero+" RN ACADEMIND"+f.slice(3,f.length);
            isSelectedType(f.toString(),fileType) ?  moveFile(folder+f,finalName) : deleteFile(folder,f);
        });
    });
};

const manageFiles = (folder,typeFile) => {
    fs.readdir(folder, (err, files) => {

        if(err){
            console.log("EL ERROR: "+err);
        }
        files.forEach(file => {
          renamingFiles(folder+file+"/" , typeFile);
        });
    });
};

const correctName = (folder) =>{
    fs.readdir(folder, (e, file)=> {
        if(e){ console.log(e); }
        file.forEach(e=>{
/*             if(e.indexOf("D Penal General I") === -1){
                let aux = e.replace("D Penal General I","Const Co I - Dogmática");
                console.log(folder+aux);
                
                moveFile(folder+e,folder+aux);
            } */
            let aux = e.replace(" Derecho Penal I"," Teoría General del Proceso");
            moveFile(folder+e,folder+aux);

        });

    });
};


const putClassNumber = (folder) =>{
    fs.readdir(folder, (e, file)=> {
        if(e){ console.log(e); }
        let c = 17;
        file.forEach(e=>{
            let aux = e.indexOf("2021");
            let cAux = c < 10 ? "0"+c :c;
            //console.log("C#"+cAux+" "+e.slice(0,aux+8)+" Teoría General del Proceso.mp4");
            moveFile(folder+e,folder+"C#"+cAux+" "+e.slice(0,aux+8)+" Filosofía del Derecho.mp4");
            c++;
        });

    });
};

const extractDate = (folder) => {
    fs.readdir(folder, (e, file)=> {
        if(e){ console.log(e); }

        file.forEach(e=>{
            let aux = e.indexOf("2021");

            //console.log(folder+e,folder+e.slice(aux,aux+8)+".mp4");
            moveFile(folder+e,folder+e.slice(aux,aux+8)+".mp4");

        });

    });
}

// createTestFolders(finalFolder);
// deleteTestFolders(finalFolder);
// manageFiles(finalFolder, "mp4");
// correctName(finalFolder);
// putClassNumber(finalFolder);
extractDate(finalFolder);


