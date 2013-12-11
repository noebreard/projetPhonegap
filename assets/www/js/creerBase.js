var db = window.openDatabase("base_de_donnees.db", "1.0", "PhoneGap android", 200000);


function createDB(tx)
{	
  tx.executeSql('CREATE TABLE IF NOT EXISTS rubrique (id integer primary key AUTOINCREMENT, id_rubrique integer, titre text, lien_image text, lien_son text, position integer)');
  
  tx.executeSql('CREATE TABLE IF NOT EXISTS item (id integer primary key AUTOINCREMENT, id_rubrique integer, titre text, lien_image text, lien_son text, position integer)');

}

function dropDatabase()
{
	bool_drop=0;
	db.transaction(function (tx) {
		tx.executeSql('DROP TABLE IF EXISTS rubrique');
		tx.executeSql('DROP TABLE IF EXISTS item', [], function(tx, res) {
		});
	});
}
 
function dropAndLoadDatabase(fichier)
{
	bool_drop=0;
	db.transaction(function (tx) {
		tx.executeSql('DROP TABLE IF EXISTS rubrique');
		tx.executeSql('DROP TABLE IF EXISTS item');
		tx.executeSql('CREATE TABLE IF NOT EXISTS rubrique (id integer primary key AUTOINCREMENT, id_rubrique integer, titre text, lien_image text, lien_son text, position integer)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS item (id integer primary key AUTOINCREMENT, id_rubrique integer, titre text, lien_image text, lien_son text, position integer)', [], function(tx, res) {
			chargerBase(fichier);
		});
	});
}
 
function creerBase()
{
  db.transaction(createDB);
}


creerBase();

function insererItem(titre, cheminImage, cheminSon, rubrique)
{
	titre=titre.replace("'","\'");
	cheminImage=cheminImage.replace("'","\'");
	
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO item(id_rubrique,titre,lien_image, lien_son, position) VALUES ('+rubrique+',"'+titre+'","'+cheminImage+'","'+cheminSon+'", (SELECT (SELECT count(*) FROM item where id_rubrique=\''+rubrique+'\') + (SELECT count(*) FROM rubrique where id_rubrique=\''+rubrique+'\')))', [], function(tx, res) {

			window.location='./pageConfig.html?rubrique=0';
		});
	});
		
	// et dès que c'est fini, on redirige vers le niveau le plus haut dans l'arborescence
		// avec un timer, car le window.location est préemptif (prend la main à l'appel de la fonction)
		
}

function insererRubrique(titre, cheminImage, cheminSon, rubrique)
{
	
	titre=titre.replace("'","\'");
	cheminImage=cheminImage.replace("'","\'");
	
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO rubrique(id_rubrique,titre,lien_image, lien_son, position) VALUES ('+rubrique+',"'+titre+'","'+cheminImage+'","'+cheminSon+'", (SELECT (SELECT count(*) FROM item where id_rubrique=\''+rubrique+'\') + (SELECT count(*) FROM rubrique where id_rubrique=\''+rubrique+'\')))', [], function(tx, res) {
			window.location='./pageConfig.html?rubrique=0';
		});
	});
		

		
}



function TESTinsererRubrique(titre, nom_image, rubrique)
{
	cheminImage = "../images/"+nom_image; 
	
	db.transaction(function (tx) {
		tx.executeSql("INSERT INTO rubrique(id_rubrique,titre,lien_image) VALUES ('"+rubrique+"','"+titre+"','"+cheminImage+"')");
		});
}


function getItemById(id_item)
{
	db.transaction(function (tx) {
		tx.executeSql("SELECT * FROM item where id="+id_item+"", [], function(tx, res) {
			tableauItems= new Array();
			for(var i=0; i<res.rows.length; i++)
			  {
				  monItem=new Item(res.rows.item(i).id, res.rows.item(i).id_rubrique, res.rows.item(i).titre, res.rows.item(i).lien_image, res.rows.item(i).lien_son);
				  monItem.position=res.rows.item(i).position;
				  monItem.type="item";
			  }
			  fin_chargement_infos_items(monItem);
		});
		
	});
	
}

function getRubriqueById(id_rubrique)
{
	var monItem;
	db.transaction(function (tx) {
		tx.executeSql("SELECT * FROM rubrique where id="+id_rubrique+"", [], function(tx, res) {
			for(var i=0; i<res.rows.length; i++)
			  {
				  monItem=new Item(res.rows.item(i).id, res.rows.item(i).id_rubrique, res.rows.item(i).titre, res.rows.item(i).lien_image, res.rows.item(i).lien_son);
				  monItem.position=res.rows.item(i).position;
				  monItem.type="rubrique";
			  }
			  fin_chargement_infos_items(monItem);
		});
		
	});
	
}

function updateItem(id_item, titre, cheminImage, cheminSon)
{
	titre=titre.replace("'","\'");
	cheminImage=cheminImage.replace("'","\'");
	
	db.transaction(function (tx) {
		tx.executeSql('UPDATE item set titre="'+titre+'", lien_image="'+cheminImage+'", lien_son="'+cheminSon+'" where id="'+id_item+'"', [], function(tx, res) {
			
			  // et dès que c'est fini, on redirige vers le niveau le plus haut dans l'arborescence
			  window.location='./pageConfig.html?rubrique=0';
		});
		
	});
}

function updateRubrique(id_item, titre, cheminImage, cheminSon)
{
	titre=titre.replace("'","\'");
	cheminImage=cheminImage.replace("'","\'");
	
	db.transaction(function (tx) {
		tx.executeSql('UPDATE rubrique set titre="'+titre+'", lien_image="'+cheminImage+'", lien_son="'+cheminSon+'" where id="'+id_item+'"', [], function(tx, res) {
			
			  // et dès que c'est fini, on redirige vers le niveau le plus haut dans l'arborescence
			  window.location='./pageConfig.html?rubrique=0';
		});
		
	});
}

function getFilArianeRubrique(id_rubrique)
{
	fil_ariane="";
	boucleFilAriane(id_rubrique)
	
}

function boucleFilAriane(id_rubrique)
{
	var un_item= new Item("0","0","","","");
	db.transaction(function (tx) {
		
		
			tx.executeSql("SELECT * FROM rubrique where id="+id_rubrique+"", [], function(tx, res) {
				for(var i=0; i<res.rows.length; i++)
				  {
					  un_item=new Item(res.rows.item(i).id, res.rows.item(i).id_rubrique, res.rows.item(i).titre, res.rows.item(i).lien_image, res.rows.item(i).lien_son);
	  				  fil_ariane="/"+un_item.titre+fil_ariane;
				  
					
				  }
				  
				if(un_item.rubrique!=0)
					boucleFilAriane(un_item.rubrique);
				else
					updateFilAriane(fil_ariane);
			});
		
		
	});
}

function updateFilAriane(fil_ariane)
{
	if(fil_ariane!="")
		document.getElementById('fil_ariane').innerHTML="rubrique: "+fil_ariane+"";
	else
		document.getElementById('fil_ariane').innerHTML="";
}

function recupererBDD(){
	
	titre_fichier = document.formulaire.titre.value;
	
	if(titre_fichier=="")
	{
		alert('le nom du fichier a exporter doit etre renseigne');
		return;
	}
	
	var fin_rubriques=0;
	var fin_items=0;
	
	db.transaction(function (tx) {
		tx.executeSql("SELECT * FROM rubrique where 1", [], function(tx, res) {
			tableauRubriques= new Array();
			for(var i=0; i<res.rows.length; i++)
			  {
				  variable_BDD+="INSERT INTO rubrique(id, id_rubrique,titre,lien_image, lien_son, 'position') VALUES ('"+res.rows.item(i).id+"','"+res.rows.item(i).id_rubrique+"','"+res.rows.item(i).titre+"','"+res.rows.item(i).lien_image+"','"+res.rows.item(i).lien_son+"','"+res.rows.item(i).position+"')\r\n";	  
			  }
			  
			  
			  fin_rubriques=1;
			  if(fin_items==1)
					fin_recupBDD();
		});
		
	});
	
	db.transaction(function (tx) {
		tx.executeSql("SELECT * FROM item where 1", [], function(tx, res) {
			tableauRubriques= new Array();
			for(var i=0; i<res.rows.length; i++)
			  {
				  variable_BDD+="INSERT INTO item(id, id_rubrique,titre,lien_image, lien_son, 'position') VALUES ('"+res.rows.item(i).id+"','"+res.rows.item(i).id_rubrique+"','"+res.rows.item(i).titre+"','"+res.rows.item(i).lien_image+"','"+res.rows.item(i).lien_son+"','"+res.rows.item(i).position+"')\r\n";	  
			  }
			  
			  fin_items=1;
			  if(fin_rubriques==1)
					fin_recupBDD();
		});
		
	});
}

function recupererItemsAndRubriquesByParent(id_parent){
	
	
	var fin_rubriques=0;
	var fin_items=0;
	
	rubrique_courante=id_parent;
	
	tableauElements=new Array();

	db.transaction(function (tx) {
		tx.executeSql("SELECT * FROM rubrique where id_rubrique='"+id_parent+"'", [], function(tx, res) {
			tableauRubriques= new Array();
			for(var i=0; i<res.rows.length; i++)
			{
				tableauElements[tableauElements.length]=new Item(res.rows.item(i).id, res.rows.item(i).id_rubrique, res.rows.item(i).titre, res.rows.item(i).lien_image, res.rows.item(i).lien_son);
				tableauElements[(tableauElements.length)-1].type="rubrique";
				tableauElements[(tableauElements.length)-1].position=res.rows.item(i).position;
			}
			  fin_rubriques=1;
			  if(fin_items==1)
					affiche_elements_position();
		});
		
	});
	
	db.transaction(function (tx) {
		tx.executeSql("SELECT * FROM item where id_rubrique='"+id_parent+"'", [], function(tx, res) {
			tableauRubriques= new Array();
			for(var i=0; i<res.rows.length; i++)
			{
				tableauElements[tableauElements.length]=new Item(res.rows.item(i).id, res.rows.item(i).id_rubrique, res.rows.item(i).titre, res.rows.item(i).lien_image, res.rows.item(i).lien_son);
				tableauElements[(tableauElements.length)-1].type="item";
				tableauElements[(tableauElements.length)-1].position=res.rows.item(i).position;
			}
			  
			  fin_items=1;
			  if(fin_rubriques==1)
					affiche_elements_position();
		});
		
	});
}

function comparePosition(a,b) {
  if (a.position < b.position)
     return -1;
  if (a.position > b.position)
    return 1;
  return 0;
}

function chargerBase(fichier)
{
	var semaphore=1;

	// si le jeton du sémaphore n'a pas été utilisé pendant un certain temps, alors on considère que toutes les opérations sont terminées et on redirige
	var recInterval = setInterval(function() {
	if(semaphore==0)
	{
		clearInterval(recInterval);
		window.location='./index.html';
	}
	else
		semaphore=0;
	}, 100);
	
	
	var requetes = fichier.split("\r\n");
	
	
	db.transaction(function (tx) {
			for(var i=0; i<(requetes.length-1); i++)
			{
					tx.executeSql(requetes[i], [], function(tx, res) {
					});	
			}
			alert('Chargement de la base termine, cliquez sur le bouton home pour revenir a l\'accueil');
	});		
		
	
}

function changePosition(valueOfChange)
{	
	monItem=mon_item;
	if( ((monItem.position==0) &&(valueOfChange==-1)) || ((monItem.position==(tableauElements.length-1)) &&(valueOfChange==1)) )
		return;
	
	var depart = (positionDansRubrique+valueOfChange);
	var arrivee = positionDansRubrique;
		
		if(tableauElements[depart].type=="rubrique")
		{
			db.transaction(function (tx) {
				tx.executeSql('UPDATE rubrique set position="'+tableauElements[arrivee].position+'" where id="'+tableauElements[depart].id+'"', [], function(tx, res) {
					changePosition2(valueOfChange);
				});
				
			});
		}
		else
		{
			db.transaction(function (tx) {
				tx.executeSql('UPDATE item set position="'+tableauElements[arrivee].position+'" where id="'+tableauElements[depart].id+'"', [], function(tx, res) {
					changePosition2(valueOfChange);
				});
				
			});
		}
	
}
function changePosition2(valueOfChange)
{
	
	
	if( ((monItem.position==0) &&(valueOfChange==-1)) || ((monItem.position==(tableauElements.length-1)) &&(valueOfChange==1)) )
		return;
		
		
		// et ensuite on inverse, pour déplacer l'autre
		depart =  positionDansRubrique;
		arrivee = (positionDansRubrique+valueOfChange);
		if(tableauElements[depart].type=="item")
		{
			db.transaction(function (tx) {
				tx.executeSql('UPDATE item set position="'+(tableauElements[depart].position+valueOfChange)+'" where id="'+tableauElements[depart].id+'"', [], function(tx, res) {
					getItemById(monItem.id);
				});
				
			});
		}
		else
		{
			db.transaction(function (tx) {
				tx.executeSql('UPDATE rubrique set position="'+(tableauElements[depart].position+valueOfChange)+'" where id="'+tableauElements[depart].id+'"', [], function(tx, res) {
					  getRubriqueById(monItem.id);
				});
				
			});
		}
	
}

var semaphore=1;

function verifSemaphore(monItem)
{
	var recInterval = setInterval(function() {
            if(semaphore==0)
            {
				clearInterval(recInterval);
				window.location='./pageConfig.html?rubrique=0';
			}
			else
				semaphore=0;
        }, 100);
   suppressionItemOuRubrique(monItem);
}

function suppressionItemOuRubrique(monItem)
{
	// d'abord on supprime l'élément concerné
		
	db.transaction(function (tx)
	{
		semaphore=1;
		tx.executeSql('DELETE FROM '+monItem.type+' WHERE id="'+monItem.id+'"', [], function(tx,res)
		{
			
		});
	});
	
	// ensuite on décale les autres éléments (leur position), pour qu'il n'y ai pas de trou
	
		// donc on récupère tous les items et rubriques qui doivent êtres décalés
	
	
	db.transaction(function (tx) {
		semaphore=1;
		tx.executeSql("SELECT * FROM item where id_rubrique='"+monItem.rubrique+"' and position>'"+monItem.position+"'", [], function(tx, res) {
			
			for(var i=0; i<res.rows.length; i++)
			  {
				  semaphore=1;
				  
				  // et on les décale
				  tx.executeSql("UPDATE item set position='"+(res.rows.item(i).position-1)+"' where id='"+res.rows.item(i).id+"'", [], function(tx, res) {
				  });
			  }
		});
	});
	
	
	db.transaction(function (tx) {
		semaphore=1;
		tx.executeSql("SELECT * FROM rubrique where id_rubrique='"+monItem.rubrique+"' and position>'"+monItem.position+"'", [], function(tx, res) {
			
			for(var i=0; i<res.rows.length; i++)
			  {
				  semaphore=1;
				  // et on les décale
				  tx.executeSql("UPDATE rubrique set position='"+(res.rows.item(i).position-1)+"' where id='"+res.rows.item(i).id+"'", [], function(tx, res) {
						});
				  
			  }
		});
		
	});
	
	if(monItem.type=="item")
	{
		return;
	}
	
	// maintenant on va sortir tous les fils de la rubrique courante, et on va appliquer la même opération
	
	var id_parent = monItem.id;
	var sous_rubrique;
	var sous_item;
	
	db.transaction(function (tx) {
		semaphore=1;
		tx.executeSql("SELECT * FROM rubrique where id_rubrique='"+id_parent+"'", [], function(tx, res) {
			for(var i=0; i<res.rows.length; i++)
			{
				semaphore=1;
				sous_rubrique=new Item(res.rows.item(i).id, res.rows.item(i).id_rubrique, res.rows.item(i).titre, res.rows.item(i).lien_image, res.rows.item(i).lien_son);
				sous_rubrique.type="rubrique";
				sous_rubrique.position=res.rows.item(i).position;
				suppressionItemOuRubrique(sous_rubrique);
			}
			 
		});
		
	});
	
	db.transaction(function (tx) {
		semaphore=1;
		tx.executeSql("SELECT * FROM item where id_rubrique='"+id_parent+"'", [], function(tx, res) {
			tableauRubriques= new Array();
			for(var i=0; i<res.rows.length; i++)
			{
				semaphore=1;
				sous_item=new Item(res.rows.item(i).id, res.rows.item(i).id_rubrique, res.rows.item(i).titre, res.rows.item(i).lien_image, res.rows.item(i).lien_son);
				sous_item.type="item";
				sous_item.position=res.rows.item(i).position;
				
				suppressionItemOuRubrique(sous_item);
			}
			  
		});
		
	});
	
	
	
	
	
}
