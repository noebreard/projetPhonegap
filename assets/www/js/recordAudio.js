var mediaRec = null;
    var fini=0;
    
    
    
    function goLoadSound() 
	{		
		var imageURI = document.getElementById('file_son').value;
		//alert(imageURI);
		window.resolveLocalFileSystemURI(imageURI, moveFile2, fail);
		
	}
	
	
	function moveFile2(entry) {
		//alert('phonegap: '+absolutePathSon);
		var test_chemin = entry.fullPath;
		test_chemin=test_chemin.substring(0, test_chemin.lastIndexOf("/")+1);
		
		//alert(test_chemin);
		
		return;
		
		if(test_chemin==absolutePath)
		{
			//alert('ils sont identiques !!!');
			cheminImage=entry.fullPath;
			updateImage(2);
			return;
		}
		
		//alert('fullpath: '+entry.fullPath);
		var parent = absolutePathSon.substring(0,absolutePathSon.length-1),
			parentName = parent.substring(parent.lastIndexOf('/')+1),
			parentEntry = new DirectoryEntry(parentName, parent);

		
		
		

		var completeName = entry.fullPath.substring(entry.fullPath.lastIndexOf('/')+1);
		var name = completeName.substring(0, completeName.indexOf('.'));
		var extension = completeName.substring(completeName.lastIndexOf('.'));
		
		var image_dest = titre+Date.now()+extension;
		
		entry.moveTo(parentEntry, image_dest, success, fail);
		
		cheminImage=absolutePath+image_dest;
		//alert("ici: "+cheminImage);
		updateImage(2);
	}
	
	function success(entry){ 

                console.log("New Path: " + entry.fullPath);

                }
        function fail(){
			console.log("fail");
        }
    
    // ... experimentation 2
    
    var errorCallback = function(e) {
    console.log('Reeeejected!', e);
  };

  // Not showing vendor prefixes.
  function superMegaTestAudio(){
	  navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
		var video = document.querySelector('video');
		video.src = window.URL.createObjectURL(localMediaStream);
		// Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
		// See crbug.com/110938.
		video.onloadedmetadata = function(e) {
		  // Ready to go. Do some stuff.
		};
	
	}, errorCallback);
}
    
    
    
    
    // ... fin experimentation
    
    
    
    /*document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
        recordAudio();
    }*/

	var titre;
    // Record audio
    //
    var src;
    function recordAudio() {
		
		titre = document.getElementById('titre_form').value;
		
		if(titre=="")
		{
			alert('le titre doit d\'abord etre renseigne pour determiner le nom du fichier son'); 
			return;
		}
		
		src = absolutePathSon+titre+(Date.now())+".mp3";
		//alert("/storage/sdcard0/phonegap/sons/"+titre+(Date.now())+".mp3");
		mediaRec = new Media(src, onSuccess, onError);
		
		document.getElementById('mess_record').innerHTML='Recording audio...';
		document.getElementById("bouton_record").innerHTML="<img id =\"btn_record\" ontouchstart=\"arreter()\" src=\"./img/stprec.png\"/>";
        // Record audio
        mediaRec.startRecord();
        // Stop recording after 10 sec
        var recTime = 0;
        var recInterval = setInterval(function() {
            recTime = recTime + 1;
            setAudioPosition(recTime + " sec");
            if(fini==1)
				clearInterval(recInterval);
        }, 1000);
    }

    // onSuccess Callback
    //
    function onSuccess() {
        console.log("recordAudio():Audio Success");
    }

    // onError Callback
    //
    function onError(error) {
        //alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }

    // Set audio position
    //
    function setAudioPosition(position) {
        document.getElementById('posi_record').innerHTML = position;
    }
    
    function arreter(){
		mediaRec.stopRecord();
		fini=1;
		cheminSon=src;
		updateSon(2);
		document.getElementById('mess_record').innerHTML='Enregistrement termine';
		document.getElementById("bouton_record").innerHTML="<img ontouchstart=\"recordAudio()\" id=\"btn_record\" src=\"./img/record.png\"/>";
		
		
	}
	
	function btnRecordStop()
	{
	document.getElementById("bouton_record").innerHTML="<img id =\"btn_record\" ontouchstart=\"btnRecordPlay(),arreter()\" src=\"./img/stprec.png\"/>";
	}
	
	function btnRecordPlay()
	{
	document.getElementById("bouton_record").innerHTML="<img ontouchstart=\"recordAudio(),btnRecordStop()\" id=\"btn_record\" src=\"./img/record.png\"/>";
	}
