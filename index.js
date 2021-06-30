const fs = require('fs');
// let finalFolder = "C:/Users/cardonacoder/Downloads/RN/TestFolder/";
let finalFolder = "C:/Users/cardonacoder/Downloads/RN/RN ZTM/";

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
            let finalName =finalDest+initNum+" "+auxZero+" RN "+f.slice(3,f.length);
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

// createTestFolders(finalFolder);
// deleteTestFolders(finalFolder);
manageFiles(finalFolder, "mp4");



