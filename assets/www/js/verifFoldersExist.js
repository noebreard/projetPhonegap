function setFolderMetadata(localFileSystem, subFolder, metadataKey, metadataValue)
{
    var onSetMetadataWin = function() {
        console.log("success setting metadata")
    }
    var onSetMetadataFail = function() {
        console.log("error setting metadata")
    }

    var onGetDirectoryWin = function(parent) {
		//alert('parent: '+parent.fullPath);
		if(subFolder=="phonegap")
        {
			alert("les dossiers de l'application ont bien ete cree a la racine de votre systeme (repertoire \"/storage/sdcard0/phonegap\", veuillez deposer vos fichiers dans les sous-dossiers images et sons"); 
		}
        var data = {};
        data[metadataKey] = metadataValue;
        parent.setMetadata(onSetMetadataWin, onSetMetadataFail, data);
        
        
    }
    var onGetDirectoryFail = function() {
        console.log("error getting dir")
    }

    var onFSWin = function(fileSystem) {
        fileSystem.root.getDirectory(subFolder, {create: true, exclusive: false}, onGetDirectoryWin, onGetDirectoryFail);
    }

    var onFSFail = function(error) {
        console.log(error.code);
    }

    window.requestFileSystem(localFileSystem, 0, onFSWin, onFSFail);
}

    

function creaFolders()
{
	setFolderMetadata(LocalFileSystem.PERSISTENT, "phonegap", "com.iut.entities", 1);
	setFolderMetadata(LocalFileSystem.PERSISTENT, "phonegap/sons", "com.iut.entities", 1);
	setFolderMetadata(LocalFileSystem.PERSISTENT, "phonegap/images", "com.iut.entities", 1);
}

	document.addEventListener("deviceready", checkIfFileExists, false);

	function checkIfFileExists(){
		path="phonegap";
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
			fileSystem.root.getDirectory(path, { create: false }, fileExists, fileDoesNotExist);
		}, getFSFail); //of requestFileSystem
	}
	function fileExists(fileEntry){
	}
	function fileDoesNotExist(){
		
		alert("les dossiers de l'application NE SONT PAS crees, veuillez les mettre a la racine de votre systeme (repertoire \"/storage/sdcard0/\", veuillez deposer vos fichiers dans les sous-dossiers images et sons"); 
		//creaFolders();
	}
	function getFSFail(evt) {
		console.log(evt.target.error.code);
	}
