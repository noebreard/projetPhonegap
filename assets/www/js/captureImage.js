var maVarCaptureImage="";
    var titre="";
    
    
    
    var pictureSource;   
	var destinationType; 

	document.addEventListener("deviceready",onDeviceReady,false);

	function onDeviceReady() 
	{
		pictureSource=navigator.camera.PictureSourceType;
		destinationType=navigator.camera.DestinationType;
	}
     

	function onPhotoURISuccess(imageURI) 
	{
		//alert(imageURI);
		//var largeImage = document.getElementById('imageModif');
		//largeImage.src = imageURI;
		
		window.resolveLocalFileSystemURI(imageURI, moveFile2, fail);
		
	}
	
	
	function moveFile2(entry) {
		var test_chemin = entry.fullPath;
		test_chemin=test_chemin.substring(0, test_chemin.lastIndexOf("/")+1);
		
		
		if(test_chemin==absolutePath)
		{
			cheminImage=entry.fullPath;
			updateImage(2);
			return;
		}
		
		
		var parent = absolutePath.substring(0,absolutePath.length-1),
			parentName = parent.substring(parent.lastIndexOf('/')+1),
			parentEntry = new DirectoryEntry(parentName, parent);

		
		
		

		var completeName = entry.fullPath.substring(entry.fullPath.lastIndexOf('/')+1);
		var name = completeName.substring(0, completeName.indexOf('.'));
		var extension = completeName.substring(completeName.lastIndexOf('.'));
		
		var image_dest = titre+Date.now()+extension;
		
		entry.copyTo(parentEntry, image_dest, success, fail);
		
		cheminImage=absolutePath+image_dest;
		updateImage(2);
	}
	
	
	function onFail(message) 
	{
		console.log('Failed because: ' + message);
	}

	function getPhoto(source) 
	{
		titre=document.getElementById('titre_form').value;
		if(titre=="")
		{
			alert('le titre doit d\'abord etre renseigne pour determiner le nom du fichier image'); 
			return;
		}
		
		
		navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
		destinationType: destinationType.FILE_URI,
		sourceType: source });
	}

	



// ... fin EXPERIMENTAION


	function moveFile(entry) {
		var parent = absolutePath.substring(0,absolutePath.length-1),
			parentName = parent.substring(parent.lastIndexOf('/')+1),
			parentEntry = new DirectoryEntry(parentName, parent);

		var completeName = entry.fullPath.substring(entry.fullPath.lastIndexOf('/')+1);
		var name = completeName.substring(0, completeName.indexOf('.'));
		var extension = completeName.substring(completeName.lastIndexOf('.'));

		// move the file to a new directory and rename it
		entry.moveTo(parentEntry, titre+name+extension, success, fail);
		
		cheminImage=absolutePath+titre+name+extension;
		updateImage(2);
	}


        function success(entry){ 

                console.log("New Path: " + entry.fullPath);

                }
        function fail(){
			console.log("fail");
        }

    

	function captureImage(){
		titre=document.getElementById('titre_form').value;
		if(titre=="")
		{
			alert('le titre doit d\'abord etre renseigne pour determiner le nom du fichier son'); 
			return;
		}
		
		navigator.camera.getPicture(onSuccess, fail, { quality: 50, 
    destinationType: Camera.DestinationType.FILE_URI,
    saveToPhotoAlbum: true }); 
	}

	function onSuccess(imageURI) {
		window.resolveLocalFileSystemURI(imageURI, moveFile, fail);
	}
