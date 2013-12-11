

function adpaterALaTailleDeLaFenetre(){
  var largeur = document.documentElement.clientWidth,
  hauteur = document.documentElement.clientHeight;
  
  var source = document.getElementById(''); // récupère l'id source 
  
  hauteur=hauteur/2;
  largeur=largeur/2;
  
  source.style.height = hauteur+'px'; // applique la hauteur de la page
  source.style.width = largeur+'px'; // la largeur
  
  //alert(hauteur+'px | '+largeur+'px');
}

// Une fonction de compatibilité pour gérer les évènements
function addEvent(element, type, listener){
  if(element.addEventListener){
    element.addEventListener(type, listener, false);
  }else if(element.attachEvent){
    element.attachEvent("on"+type, listener);
  }
}

// On exécute la fonction une première fois au chargement de la page
addEvent(window, "load", adpaterALaTailleDeLaFenetre);
// Puis à chaque fois que la fenêtre est redimensionnée
addEvent(window, "resize", adpaterALaTailleDeLaFenetre);


function adpaterTailleDeMonHeightFlechesHautEtBas(idElement){
  var largeur = document.documentElement.clientWidth,
  hauteur = document.documentElement.clientHeight;
  
  var source = document.getElementById(idElement); // récupère l'id source 
  
  hauteur=hauteur*0.38;
  
  source.style.height = hauteur+'px'; // applique la hauteur de la page
  
  //alert(hauteur+'px | '+largeur+'px');
}
