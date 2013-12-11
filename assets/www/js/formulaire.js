
var param = window.location.search;
var tab = param.split("=");
var rubrique = tab[1];

var cheminImage;
var cheminSon;
var nomImage;
var nomSon;
var fichier;





// ... ICI FIN !!!

function updateImage(value)
	{
		var tab;
		// si la validation a été effectuée du formulaire
		if(value==1)
		{
			cheminImage = document.getElementById('file').value;
			tab = cheminImage.split("\\");	// on cherche sur l'antislash (celui-ci est protégé par un autre antislash
		}
		else
		{
			tab = cheminImage.split("/");	
		}
		
		
		
		var image = absolutePath+tab[(tab.length-1)];
		nomImage=tab[(tab.length-1)];
		document.getElementById("image_item").innerHTML="<img id =\"imageModif\" src=\""+image+"\"/>";
	}
	
function updateSon(value)
	{
		var tab;
		if(value==1)
		{
			cheminSon = document.getElementById('file_son').value;
			tab = cheminSon.split("\\");
		}
		else
		{
			tab = cheminSon.split("/");	
		}
		
		nomSon=tab[(tab.length-1)];
		fichier = absolutePathSon+nomSon;
		
		document.getElementById("fichier_son").innerHTML="Fichier son: "+nomSon+"";
	}
	
	function playAudio_verif() {
	
			fichier = absolutePathSon+nomSon;
			var my_media = new Media(fichier,
			// success callback
			function () {
				console.log("playAudio():Audio Success");
			},
			// error callback
			function (err) {
				console.log("playAudio():Audio Error: " + err);
			}
		);
		// Play audio
		my_media.play();	
}

function goUpdateItem()
	{
		var titre = document.getElementById('titre_form').value;
		
		
		if( (nomImage=="") || (titre=="") )
			alert("Vous devez renseigner:\r\n- le titre de l'item\r\n- une image associee a cet item");
		else
		{
			if (confirm("Voulez-vous valider la modification de cet élément dans la base de donnees ?")) 
			{
				updateItem(id_item, titre, nomImage, nomSon);
			}
		}
	}
	
function goUpdateRubrique()
{
	var titre = document.getElementById('titre_form').value;		
	
	if( (nomImage=="") || (titre=="") )
		alert("Vous devez renseigner:\r\n- le titre de la rubrique\r\n- une image associee a cet item");
	else
	{
		if (confirm("Voulez-vous valider la modification de cet élément dans la base de donnees ?")) 
		{
			updateRubrique(id_rubrique, titre, nomImage, nomSon);
		}
	}
}
	
function fin_chargement_infos_items(monItem)
{
	mon_item=monItem;
	nomImage=monItem.lien_image_original;
	nomSon=monItem.lien_son_original;
	document.getElementById('titre_form').value=monItem.titre;
	document.getElementById("image_item").innerHTML="<img id =\"imageModif\" src=\""+monItem.lien_image+"\"/>";
	document.getElementById("fichier_son").innerHTML="Fichier son: "+monItem.lien_son_original+"";
	recupererItemsAndRubriquesByParent(monItem.rubrique);
	getFilArianeRubrique(monItem.rubrique);
}
	
	
function verifierRubrique()
	{
		var titre = document.getElementById('titre_form').value;
		if( (cheminImage==null) || (titre=="") )
			alert("Vous devez renseigner:\r\n- le titre de la rubrique\r\n- une image associee a cette rubrique");
		else
		{
			if (confirm("Voulez-vous valider la modification de cet élément dans la base de donnees ?")) 
			{
				insererRubrique(titre, nomImage, nomSon, rubrique);
			}
		}
	}
	

function verifierItem()
	{
		var titre = document.getElementById('titre_form').value;
		
		if( (cheminImage==null) || (titre=="") )
			alert("Vous devez renseigner:\r\n- le titre de l'item\r\n- une image associee a cet item");
		else
		{
			if (confirm("Voulez-vous valider la modification de cet élément dans la base de donnees ?")) 
			{
				insererItem(titre, nomImage, nomSon, rubrique);
			}
		}
	}	


function affiche_elements_position()
{
		
	tableauElements.sort(comparePosition);
	var bool_ok=1;
	var aff="";
	for(var i=0; i<(tableauElements.length); i++)
	{
		bool_ok=1;
		if(myType=="item")
		{
			if((tableauElements[i].type==myType) && (tableauElements[i].id==id_item))
			{
				aff+=" <span style=\"color:red;\">"+tableauElements[i].titre+" / "+tableauElements[i].position+"("+tableauElements[i].type+")</span></br>";
				bool_ok=0;
				positionDansRubrique=i;
			}
		}
		else
		{
			if((tableauElements[i].type==myType) &&(tableauElements[i].id==id_rubrique))
			{
				aff+=" <span style=\"color:red;\">"+tableauElements[i].titre+" / "+tableauElements[i].position+"("+tableauElements[i].type+")</span></br>";
				bool_ok=0;
				positionDansRubrique=i;
			}
		}
		
		if(bool_ok==1)
			aff+=" "+tableauElements[i].titre+" / "+tableauElements[i].position+"("+tableauElements[i].type+")</br>";
	}
		
	document.getElementById('elements_positions').innerHTML=aff;
}

var pictureSource;   
var destinationType; 

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() 
{
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}



function verifierSuppressionItem(){
	
	if (confirm("Voulez-vous valider la suppression de l'item ?"))
	{
		verifSemaphore(mon_item);
	}
}


function verifierSuppressionRubrique(){
	
	if (confirm("Voulez-vous valider la suppression de ce dossier ainsi que des éléments sous-jacent de la base de donnees ?"))
	{
		verifSemaphore(mon_item);
	}
}
