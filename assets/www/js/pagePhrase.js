var item_select;


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

var hauteur_carre = document.documentElement.clientWidth*0.3;


// trouver un moyen pour récupérer les images sur tous les navigateurs:
// IDEE: toujours mettre les images dans le meme dossier, puis quand on charge le fichier on ne recupere par son chemin complet mais juste le nom (on connait le dossier puisqu'on l'a fixé)


// ... TROUVER ... un moyen d'appeler les fonction de sqlite sans appeler 2 fonctions à chaque fois
	// --> faire une imbriquation

var affItems="";
var numPage=0;
	function affiche_elements_position()
	{
		tableauElements.sort(comparePosition);
		affItems="";
		var nb_rubriques=tableauRubriques.length;
		if(rubrique_courante ==0)
			document.getElementById('bt_retour').style.visibility='hidden';
		else
			document.getElementById('bt_retour').style.visibility='visible';
		
		var valDep = numPage*6;
		if(numPage<=0)
			document.getElementById('images_fleches_haut').style.visibility='hidden';
		else
			document.getElementById('images_fleches_haut').style.visibility='visible';
		
		
		if((valDep+6)>=tableauElements.length)
			document.getElementById('images_fleches_bas').style.visibility='hidden';
		else
			document.getElementById('images_fleches_bas').style.visibility='visible';
		
		var superTestTop = document.getElementById('lesImages').offsetWidth;
		var variableHauteurDossier = superTestTop*0.213;
		var variableHauteurItem = superTestTop*0.28;
		for(var i = (valDep); i < (valDep+6); i++)
		{
			if(i>=tableauElements.length)
				break;
			if(tableauElements[i].type=="rubrique")
				affItems+="<div id=\"cadre_items\"><a onclick=\"playAudioRubrique('"+tableauElements[i].lien_son+"','"+tableauElements[i].id+"')\"><img id=\"item_dossier\" src=\"./img/dossier.jpg\"/><span id=\"span_dossier\" style=\"max-height: "+variableHauteurDossier+"px;\"><img id=\"image"+i+"\" class=\"image_rubrique\" src=\""+tableauElements[i].lien_image+"\"/></span></a></div>";
			else
				affItems+="<div id=\"cadre_items\"><a onclick=\"ajoutMot('"+tableauElements[i].id+"', '"+tableauElements[i].id_rubrique+"', '"+tableauElements[i].protectedTitle()+"', '"+tableauElements[i].protectedImageOriginal()+"', '"+tableauElements[i].protectedSonOriginal()+"')\"><img id=\"item_dossier\" src=\"./img/fond_blanc.png\"/><span id=\"span_dossier_item\" style=\"max-height: "+variableHauteurItem+"px\">  <div id=\"item"+tableauElements[i].id+"\"><img id=\"image"+i+"\" class=\"image_item_phrase\" src=\""+tableauElements[i].lien_image+"\"/><img id=\"croix_grisee"+tableauElements[i].id+"\" class=\"croix_grisee\" width=\"\" src=\"\"/ style=\"max-height: "+variableHauteurItem+"px\"></div>  <span id=\"span_dossier\"></span></a></div>";
		}			
				
		//~ <img id=\"croix_grisee\" width=\"\" src=\"./img/croix_grisee.png\"/>
		document.getElementById("lesImages").innerHTML=affItems;
		
		//setTimeout("verifierHeightPicture()", 100);	
		griserDernierElementAjoute();
		
	}
	
	function verifierHeightPicture()
	{
		for(var index = 0; index < tableauElements.length; index++)
		{		
			var balise = document.getElementById("image"+index);
			var largeur = balise.width;
			var hauteur = balise.height;
			
			
			
			if(hauteur>largeur)
			{
				largeur*=0.8;
				document.getElementById("image"+index).height=largeur;
			}
		}
		griserDernierElementAjoute();
	}
	
	function griserDernierElementAjoute()
	{
		if(item_select!="")
		{
			//alert(item_select);
			var balise = document.getElementById("item"+item_select);
			var hauteur = balise.offsetHeight;
			var largeur = balise.offsetWidth;
			var image_croix = document.getElementById('croix_grisee'+item_select);
			
			image_croix.src="./img/croix_grisee.png";
			image_croix.height=hauteur;
			image_croix.width=largeur;
		}
	}
	
	function actionFlecheBas()
	{
		if(( (numPage+1)*6)>tableauElements.length)
			return;
		++numPage;
		affiche_elements_position();
	}
	
	function actionFlecheHaut()
	{
		if(numPage<=0)
			return;
		--numPage;
		affiche_elements_position();
	}
	
	function supprimerUnMot()
	{	
		tabPhrase.pop();
		
		if(tabPhrase.length>0)
			item_select=tabPhrase[(tabPhrase.length-1)].id;
		else
			item_select="";
		
		recupererItemsAndRubriquesByParent(0);
		actualiserPhrase();
		
	}
	
	function ajoutMot(id, id_parent, titre, lien_image, lien_son, position_id)
	{
		item_select=id;	// on enregistre sur l'id de l'item
		//alert(document.getElementById("item0").offsetHeight);
	
		
		
		if(tabPhrase.length!=0)
			if(tabPhrase[(tabPhrase.length-1)].id == id)
				return;
		
		var item = new Item(id, id_parent, titre, lien_image, lien_son);
		
		// on lit le son de l'item sur lequel on vient de cliquer
		playAudioItem(item.lien_son, id)
		
		tabPhrase[tabPhrase.length] = item;
		
		actualiserPhrase();
		
		// et on revient au niveau le plus haut:
		recupererItemsAndRubriquesByParent(0);	// 0 => aucun parent
		
	}
	
	
	function playAudio(url, m) {
		// Play the audio file at url
		var my_media = new Media(url,
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
		
		
		// .....
		
		var duree=0;
		
			var counter = 0;
			
			
		var timerDur = setInterval(function() {
			duree = my_media.getDuration(); 
			
			setTimeout("lire_phrase("+m+")",(duree*1000));	// *1000 car le setTimeout prend un nombre de millisecc
			clearInterval(timerDur);
		}, 100);
		
		
	
		
	}
	
	function playAudioItem(url, id_parent) {
		
		// Play the audio file at url
		var my_media = new Media(url,
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
	
	// appelé une seule fois lorsque l'on clique sur la rubrique
	function playAudioRubrique(url, id_parent) {
		
		numPage=0;
		// Play the audio file at url
		var my_media = new Media(url,
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
		
		var timerDur = setInterval(function() {
			duree = my_media.getDuration(); 
			
			setTimeout("recupererItemsAndRubriquesByParent("+id_parent+")",(duree*1000));	// *1000 car le setTimeout prend un nombre de millisecc
			clearInterval(timerDur);
		}, 100);
		
	}
	
	
	
	function lire_phrase(m){
		//m=parseInt(m);
		if(m==0)
		{
				// on désactive l'action au début de la phrase
			document.getElementById('valid').removeAttribute("ontouchstart");
		}
		
		if(m>=tabPhrase.length)
		{
			// on réactive l'action à la fin de la phrase
			document.getElementById('valid').setAttribute("ontouchstart","lire_phrase(0)");
			//~ item_select="";
			//~ recupererItemsAndRubriquesByParent(0);
			return;
		}
		
		playAudio(tabPhrase[m].lien_son, ++m);
	}
	
	function actualiserPhrase()
	{
		
		var phrase="";
		for(var i = 0; i < tabPhrase.length; i++)
		{
			phrase+="<span><img id=\"mots_phrase\" style=\"max-height:36px\" src=\""+tabPhrase[i].lien_image+"\"></span>";
		}
		document.getElementById('phrase').innerHTML=phrase;
		var balise = document.getElementById("mots_phrase");
			var hauteur = balise.offsetHeight;
	}
