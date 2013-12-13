
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
		
		// on enlève la possibilité de lire un son
		document.getElementById('btn_play').removeAttribute('ontouchstart');
		my_media.play();	
		
		var timerDur = setInterval(function() {
			duree = my_media.getDuration(); 
			
			// et dès que notre son est fini, on réactive le bouton play
			setTimeout("document.getElementById('btn_play').setAttribute('ontouchstart','playAudio_verif()');",(duree*1000));	// *1000 car le setTimeout prend un nombre de millisecc
			clearInterval(timerDur);
		}, 100);
}

var monTitreItem;

function goUpdateItem_verif(value)
{
	if(value==2)
	{
		updateItem(id_item, monTitreItem, nomImage, nomSon);
	}
			
}


function goUpdateItem()
	{
		var titre = document.getElementById('titre_form').value;
		monTitreItem=titre;
		
		if( (nomImage=="") || (titre=="") )
			alert("Vous devez renseigner:\r\n- le titre de l'item\r\n- une image associee a cet item");
		else
		{
			
			
			navigator.notification.confirm("Voulez-vous valider la modification de l'item '"+titre+"' ?", goUpdateItem_verif, "Modification", "Non, Oui");
			
			/*if (confirm("Voulez-vous valider la modification de cet élément dans la base de donnees ?")) 
			{
				updateItem(id_item, titre, nomImage, nomSon);
			}*/
		}
	}
	
function goUpdateRubrique_verif(value)
{
	if(value==2)
	{
		updateRubrique(id_rubrique, monTitreItem, nomImage, nomSon);
	}
			
}
	
function goUpdateRubrique()
{
	var titre = document.getElementById('titre_form').value;		
	monTitreItem=titre;
	
	if( (nomImage=="") || (titre=="") )
		alert("Vous devez renseigner:\r\n- le titre de la rubrique\r\n- une image associee a cet item");
	else
	{
		navigator.notification.confirm("Voulez-vous valider la modification de la rubrique '"+titre+"' ?", goUpdateRubrique_verif, "Modification", "Non, Oui");
		/*
		if (confirm("Voulez-vous valider la modification de cet élément dans la base de donnees ?")) 
		{
			updateRubrique(id_rubrique, titre, nomImage, nomSon);
		}*/
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
			insererRubrique(titre, nomImage, nomSon, rubrique);
		}
	}
	

function verifierItem()
	{
		var titre = document.getElementById('titre_form').value;
		
		if( (cheminImage==null) || (titre=="") )
			alert("Vous devez renseigner:\r\n- le titre de l'item\r\n- une image associee a cet item");
		else
		{
			insererItem(titre, nomImage, nomSon, rubrique);
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



function verifierSuppressionItem(value){
	
	if(value==2)
	{
		verifSemaphore(mon_item);
		return;
	}
	if(value==1)
		return;
	var titre = document.getElementById('titre_form').value;
	navigator.notification.confirm("Voulez-vous valider la suppression de l'item '"+titre+"' ?", verifierSuppressionItem, "Suppression", "Non, Oui");
	/*
	if (confirm("Voulez-vous valider la suppression de l'item ?"))
	{
		verifSemaphore(mon_item);
	}*/
}


function verifierSuppressionRubrique(value){
	if(value==2)
	{
		verifSemaphore(mon_item);
		return;
	}
	if(value==1)
		return;
	
	var titre = document.getElementById('titre_form').value;
	navigator.notification.confirm("Voulez-vous valider la suppression du dossier '"+titre+"' ainsi que des éléments sous-jacent de la base de donnees ?", verifierSuppressionRubrique, "Suppression", "Non, Oui");
	
	/*
	if (confirm("Voulez-vous valider la suppression de ce dossier ainsi que des éléments sous-jacent de la base de donnees ?"))
	{
		verifSemaphore(mon_item);
	}*/
}

function adapterImageFormulaire()
{
	var superTestTop = document.getElementById('formulaire').offsetWidth;
	var variableHauteurImage = superTestTop*0.385;
	//alert(variableHauteurImage);
	//document.getElementById('image_item').style.max-height=variableHauteurImage+"px";
	//alert(document.getElementById('imageModif').width);
	var genialTropTop = 150;
	document.getElementById('image_item').style.maxHeight=variableHauteurImage+"px";

}
