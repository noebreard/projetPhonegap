// faire la classe
// mettre un systeme pour que quand on clique sur l'image de la rubrique ça amene sur les infos de la sous rubriques avec son id, 
// et quand l'arbo + le systeme de phrase est ok, c'est tout bon.

// --> ensuite améliorer le VISU DE L'APPLI, puis contacter ingrid pour qu'elle nous donne les images (JUSTE INGRID !!!)

// !!! en dernier recours, sauvegarder dans un fichier les mots de la phrase, et actualiser la page principale !!!

// ... faire controles des infos recus quand ajout d'un item ou d'une rubrique, --> puis redirection vers la page config?rubrique=0

// également afficher un fil d'ariane à chaque menu pour savoir où on est

function Phrase(value) {
	
	this.value=value;
	this.notifier = function(){
		alert('la Phrase: je notifie: '+this.value);
	}
	
}

var hauteur_carre = document.documentElement.clientWidth*0.22;


/*
function Item() {
}


var Item = Class.create();

Item.prototype = {
	this.id;
	this.rubrique;
	this.titre;
	this.lien_image;
	
	
	initialize : function(rubrique, titre, lien_image) {
		this.rubrique=rubrique;
		this.titre=titre;
		this.lien_image=lien_image;
	}
}*/
