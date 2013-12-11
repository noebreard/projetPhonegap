/*
var absolutePathPhonegap = "/sdcard/phonegap/";
var absolutePath = "/sdcard/phonegap/images/";
var absolutePathSon = "/sdcard/phonegap/sons/";
*/


var cheminRelatif="";
var absolutePathPhonegap;
var absolutePath;
var absolutePathSon;

document.addEventListener("deviceready", checkIfFileExists, false);

	function checkIfFileExists(){
		
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
             cheminRelatif=fs.root.fullPath;
             absolutePathPhonegap = cheminRelatif+"/phonegap/";
			 absolutePath = cheminRelatif+"/phonegap/images/";
			 absolutePathSon = cheminRelatif+"/phonegap/sons/";
		});
	}

// si on est pas sous android, alors cet indice vaut -1, et donc le chemin d'accès est différent
if((navigator.userAgent.lastIndexOf('Android'))==-1)
	absolutePath = "../../../images/";


// utilisé pour un item ou une rubrique
function Item(id, rubrique, titre, lien_image, lien_son) {
	this.id=id;
	this.rubrique=rubrique;
	this.titre=titre;
	this.lien_image=absolutePath+lien_image;
	this.lien_son=absolutePathSon+lien_son;
	
	this.type="";
	this.position=0;
	
	// ceci est nécessaire, car par exemple pour former la phrase on se sert d'items pour créer d'autres item, et donc le absolutepath se duplique
	this.lien_image_original=lien_image;
	this.lien_son_original=lien_son;
	
	this.protectedTitle = function(){
		return titre.replace("'","");	// au pire cette méthode n'est appelée que lorsqu'un item est inséré dans la phrase
	}
}



