
function createDB(tx)
{

	/*tx.executeSql('DROP TABLE IF EXISTS rubrique');
	tx.executeSql('DROP TABLE IF EXISTS item');*/
	
	
  tx.executeSql('CREATE TABLE IF NOT EXISTS rubrique (id integer primary key AUTOINCREMENT, id_rubrique integer, titre text, lien_image text)');
  
  tx.executeSql('CREATE TABLE IF NOT EXISTS item (id integer primary key AUTOINCREMENT, id_rubrique integer, titre text, lien_image text)');

}

function dropDatabase()
{
	db.transaction(function (tx) {
		tx.executeSql('DROP TABLE IF EXISTS rubrique');
		tx.executeSql('DROP TABLE IF EXISTS item');
	});
}
 
function creerBase()
{
  db.transaction(createDB);
}


creerBase();


var affItems="";

//affItems+=" <span style=\"color:red;\">"+tableauElements[i].titre+"/ "+tableauElements[i].position+"</span></br>";

function affiche_elements_position()
{
	getFilArianeRubrique(rubrique_courante);
	tableauElements.sort(comparePosition);
	affItems="";
	//alert(nomPage);
	var nb_rubriques=tableauRubriques.length;
	//alert('taille: '+tableauRubriques.length);
		
	var superTestTop = document.getElementById('lesImages_config').offsetWidth;
	var variableHauteurDossier = superTestTop*0.17;
	var variableHauteurItem = superTestTop*0.219;
	//alert(variableHauteurItem);
	
	/*variableHauteurDossier = 1000;
	variableHauteurItem = 1000;*/
		
	for(var i = 0; i < tableauElements.length; i++)
	{
		//document.write("<a href=\"./pageConfig.html?rubrique="+tableauRubriques[i].id+"\"><img id=\"items\" width=\" 22%\" src=\""+tableauRubriques[i].lien_image+"\"/></a>");
		if(tableauElements[i].type=="rubrique")
			affItems+="<div id=\"cadre_items_config\"><a onClick=\"recupererItemsAndRubriquesByParent("+tableauElements[i].id+")\"><img id=\"item_dossier\" src=\"./img/dossier.jpg\"/><span id=\"span_dossier\" style=\"max-height: "+variableHauteurDossier+"px\"><img id=\"image"+i+"\" class=\"image_rubrique\" src=\""+tableauElements[i].lien_image+"\"/></span></a></div>";
		else
			affItems+="<div id=\"cadre_items_config\"><a onClick=\"location='formModifItem.html?id_item="+tableauElements[i].id+"'\"><img id=\"item_dossier\" src=\"./img/fond_blanc.png\"/><span id=\"span_dossier_item\" style=\"max-height: "+variableHauteurItem+"px\"><img class=\"image_item_phrase\" src=\""+tableauElements[i].lien_image+"\"/></span></a></div>";
			//affItems+="<div id=\"cadre_items_config\"><a onClick=\"location='formModifItem.html?id_item="+tableauElements[i].id+"'\"><img id=\"item_dossier\" src=\"./img/fond_blanc.png\"/><span id=\"span_dossier_item\" style=\"max-height: "+variableHauteurItem+"px\"><img id=\"cadre_items2_config\" style=\"\" src=\""+tableauElements[i].lien_image+"\"/></span></a></div>";
			//affItems+="<div id=\"cadre_items_config\"><a ontouchstart=\"location='formModifItem.html?id_item="+tableauElements[i].id+"'\"><img id=\"cadre_items_config\" src=\"./img/fond_blanc.png\"/><img id=\"image_rubrique\" width=\" 22%\" src=\""+tableauElements[i].lien_image+"\"/></a></div>";
	
	}
	
	affItems+="<a href=\"formAjoutRubrique.html?rubrique="+rubrique_courante+"\"><img id=\"cadre_items_config\" class=\"contour_cadre\" src=\"./img/+rubrique.png\"/></a>";
			
	affItems+="<a href=\"formAjoutItem.html?rubrique="+rubrique_courante+"\"><img id=\"cadre_items_config\" class=\"contour_cadre\" src=\"./img/+item.png\"/></a>";
			
	if(rubrique_courante!="0")
		affItems+="<a href=\"formModifRubrique.html?rubrique="+rubrique_courante+"\"><img id=\"cadre_items_config\" class=\"contour_cadre\" src=\"./img/modif_rubrique.png\"/></a>";
		
			
	document.getElementById("lesImages_config").innerHTML=affItems;
	//setTimeout("verifierHeightPicture()", 100);
}

function verifierHeightPicture()
{
	for(var index = 0; index < tableauElements.length; index++)
	{		
		var balise = document.getElementById("image"+index);
		var largeur = balise.width;
		var hauteur = balise.height;
		
		//document.getElementById("item"+index);
		
		//alert(balise.width);
		
		
		if(hauteur>largeur)
		{
			largeur*=0.8;
			//alert(largeur);
			document.getElementById("image"+index).height=largeur;
		}
	}
}

/*
function affiche_elements_position()
{
		
	tableauElements.sort(comparePosition);
	var bool_ok=1;
	var aff="";
	for(var i=0; i<(tableauElements.length); i++)
	{
		bool_ok=1;
		
		aff+=" <span style=\"color:red;\">"+tableauElements[i].titre+"</span></br>";
		positionDansRubrique=i;
	
	}
		
	document.getElementById('lesImages').innerHTML=aff;
	//alert(aff);
}*/


/*
function fin_chargement_rubriques()
	{
		affItems="";
		//alert(nomPage);
		var nb_rubriques=tableauRubriques.length;
		//alert('taille: '+tableauRubriques.length);
		
		for(var i = 0; i < tableauRubriques.length; i++)
		{
			//document.write("<a href=\"./pageConfig.html?rubrique="+tableauRubriques[i].id+"\"><img id=\"items\" width=\" 22%\" src=\""+tableauRubriques[i].lien_image+"\"/></a>");
			affItems+="<div id=\"cadre_items\"><a onclick=\"recupererSousRubriques("+tableauRubriques[i].id+")\"><img id=\"item_dossier\" src=\"dossier.jpg\"/><span id=\"span_dossier\"><img id=\"image_rubrique\" src=\""+tableauRubriques[i].lien_image+"\"/></span></a></div>";
		}
			
		
		//document.getElementById("lesImages").innerHTML=affRubriques;
		// si notre rubrique courante n'a pas de sous rubriques, alors on affiche les items

		
		recupererItems();
		
		
		// on ne peut modifier la rubrique source, bien sûr
		
		
	}
	
	
	function fin_chargement_items()
	{
		
			
			
			var nb_items=tableauItems.length;	
			for(var i = 0; i < tableauItems.length; i++)
			{
				affItems+="<a href=\"formModifItem.html?id_item="+tableauItems[i].id+"\"><img id=\"items\" width=\" 22%\" src=\""+tableauItems[i].lien_image+"\"/></a>";
				
			}
			
			// les lignes suivantes sont appelées uniquement quand il s'agit de la page de configuration. Peut etre faire 2 .js different
			
			affItems+="<a href=\"formAjoutRubrique.html?rubrique="+rubrique_courante+"\"><img id=\"items\" src=\"+rubrique.png\"/></a>";
			
			affItems+="<a href=\"formAjoutItem.html?rubrique="+rubrique_courante+"\"><img id=\"items\" src=\"+item.png\"/></a>";
			
			if(rubrique_courante!="0")
				affItems+="<a href=\"formModifRubrique.html?rubrique="+rubrique_courante+"\"><img id=\"items\" src=\"modif_rubrique.png\"/></a>";
		
			
			document.getElementById("lesImages").innerHTML=affItems;
			
			
			
	}*/
