//AUTEUR : Jean-Luc Leloire
//sous licence Creative Commons by-nc-sa 4.0 International




/*MathPlot est un plugin permettant de tracer des courbes
/*Dessine un repère gradué , ajoute ou retire des courbes
/* ajoute un menu contextuel au clic droit 
/* nécessite un canvas pour l'appeler 
/* APPEL : maVariable=new mathPlot(canvas);
*/

///pour lier le css associé au plugin pour la gestion du menu
var cssId = 'mathplotCss'; 
	if (!document.getElementById(cssId))
	{
		var head  = document.getElementsByTagName('head')[0];
		var link  = document.createElement('link');
		link.id   = cssId;
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href = 'https://physique-chimie.discip.ac-caen.fr/sites/physique-chimie.discip.ac-caen.fr/squelettes/css/mathplot.css';
		link.media = 'all';
		head.appendChild(link);
	};







function regle(ctx,posX,posY,longueur){
	this.ctx=ctx;
	this.posX=posX||0;					//position : x 
	this.posY=posY||0;					//position : y 
	this.longueur=longueur||100;		//longueur
	this.style=0;						//style : 1 verticale  0 horizontale
	this.padOrig=0;						//padOrig: padding du début de régle
	this.padFin=0;						//padFin : padding de fin
	this.mini=0							//mini : valeur mini
	this.maxi=100						//maxi :valeur maxi
	this.grad=10;						//grad: nb graduation
	this.sousgrad=5;					//sousgrad : nb sousgraduation
	this.soussousgrad=2;				//soussousgrad : nb sous sous graduation
	this.etiquette=true;				//etiquette:  true valeur des graduations indiquée 
	this.format=0;						//format : nombre de décimales
	this.hauteur=0;						//hauteur du quadrillage
	this.quadrillage=false;				//quadrillage: true quadrillage false pas de quadrillage
	this.texte="";						//legende de l'axe
	
	this.dessineRegle=function(){
		with (ctx){	
			beginPath();
			strokeStyle="black";
			fillStyle="black";
			lineWidth=1;
			globalAlpha=1;
			var pas=(this.maxi-this.mini)/this.grad;
			var pasgrad=(this.longueur-this.padOrig-this.padFin)/this.grad;
			var passousgrad=pasgrad/this.sousgrad;
			var passousousgrad=passousgrad/this.soussousgrad;
			var nbgraduation=this.grad*this.sousgrad*this.soussousgrad;
			//sous-sous-graduations
			if (!this.style){
				//régle horizontale
				for (var ipos=0;ipos<this.grad;ipos=ipos+1){
					for (var iposs=0;iposs<this.sousgrad;iposs=iposs+1){
							for (var iposss=0;iposss<this.soussousgrad+1;iposss=iposss+1){
								moveTo(Math.round(iposss*passousousgrad+iposs*passousgrad+ipos*pasgrad+this.posX),this.posY-5);
								lineTo(Math.round(iposss*passousousgrad+iposs*passousgrad+ipos*pasgrad+this.posX),this.posY+5);
							}
					}
				}
			}	
			else{
				//règle verticale
				for (var ipos=0;ipos<this.grad;ipos=ipos+1){
						for (var iposs=0;iposs<this.sousgrad;iposs=iposs+1){
								for (var iposss=0;iposss<this.soussousgrad+1;iposss=iposss+1){
									moveTo(this.posX-5,Math.round(iposss*passousousgrad+iposs*passousgrad+ipos*pasgrad+this.posY));
									lineTo(this.posX+5,Math.round(iposss*passousousgrad+iposs*passousgrad+ipos*pasgrad+this.posY));
								}
						}
					}
			};	
			stroke();
			closePath();
			beginPath();
			lineWidth=2;
			
			//sous-graduations	
			if (!this.style){
				//régle horizontale
				for (var ipos=0;ipos<this.grad;ipos=ipos+1){
					for (var iposs=0;iposs<this.sousgrad+1;iposs=iposs+1){
						moveTo(Math.round(iposs*passousgrad+ipos*pasgrad+this.posX),this.posY-10);
						lineTo(Math.round(iposs*passousgrad+ipos*pasgrad+this.posX),this.posY+10);
					}
				}
			}	
			else{
				//règle verticale	
				for (var ipos=0;ipos<this.grad;ipos=ipos+1){
					for (var iposs=0;iposs<this.sousgrad+1;iposs=iposs+1){
						moveTo(this.posX-10,Math.round(iposs*passousgrad+ipos*pasgrad+this.posY));
						lineTo(this.posX+10,Math.round(iposs*passousgrad+ipos*pasgrad+this.posY));
					}
				}
			}	
			stroke();
			closePath();
			
			//graduations avec valeur
			beginPath();
			strokeStyle="black";
			fillStyle="black";
			globalAplha=1;
			lineWidth=2;
			font = " 14px Arial";
			textAlign="center";
			if (!this.style){
				//régle horizontale
				for (var ipos=0;ipos<this.grad+1;ipos=ipos+1){
					moveTo(ipos*pasgrad+this.posX,this.posY-15);
					lineTo(ipos*pasgrad+this.posX,this.posY+15);
					if (this.etiquette) fillText((this.mini+ipos*pas).toFixed(this.format),ipos*pasgrad+this.posX,this.posY+26);
					//if (this.etiquette||ipos==0||ipos==this.grad) fillText((this.mini+ipos*pas).toFixed(this.format),ipos*pasgrad+this.posX,this.posY+26);
				}
				//axe
				moveTo(this.posX,this.posY);
				lineTo(this.longueur+this.posX,this.posY);
			}	
			else{
				//règle verticale
				for (var ipos=0;ipos<this.grad+1;ipos=ipos+1){
					moveTo(this.posX-15,ipos*pasgrad+this.posY);
					lineTo(this.posX+15,ipos*pasgrad+this.posY);
					//if (this.etiquette||ipos==0||ipos==this.grad) fillText((this.mini+ipos*pas).toFixed(this.format),this.posX-35,(this.grad-ipos)*pasgrad+this.posY);
					if (this.etiquette) fillText((this.mini+ipos*pas).toFixed(this.format),this.posX-35,(this.grad-ipos)*pasgrad+this.posY);
				}
				//axe
				moveTo(this.posX,this.posY);
				lineTo(this.posX,this.longueur+this.posY);
			}	
			stroke();
			closePath();
			//legende			
			beginPath();
			strokeStyle="black";
			fillStyle="black";
			globalAplha=1;
			lineWidth=2;
			font = "bold 18px Arial";
			if (!this.style){
				//régle horizontale
				textAlign="left";
				fillText(this.texte,this.longueur+this.posX+2,this.posY);
			}
			else{
				//règle verticale
				textAlign="center";
				fillText(this.texte,this.posX,this.posY-15);
			}
			stroke();
			closePath();
			//quadrillage
			if (this.quadrillage){
				beginPath();
				strokeStyle="black";
				globalAlpha=0.5;
				if (!this.style){
					//règle verticale
					for (var ipos=0;ipos<this.grad+1;ipos=ipos+1){
						moveTo(ipos*pasgrad+this.posX,this.posY);
						lineTo(ipos*pasgrad+this.posX,this.posY-this.hauteur);
					}
				}
				else{
				//règle verticale
					for (var ipos=0;ipos<this.grad+1;ipos=ipos+1){
						moveTo(this.posX,ipos*pasgrad+this.posY);
						lineTo(this.posX+this.hauteur,ipos*pasgrad+this.posY);
					}
				}
			stroke();
			closePath();
			globalAlpha=1;
			}
					
		}
	}
}

function repere(context,postX,postY,longueur,hauteur){
	this.posX=postX;
	this.posY=postY;
	this.longueur=longueur;
	this.hauteur=hauteur;
	this.paramX=[0,100,10,0,0,false,0,false,""];
	this.paramY=[0,100,10,0,0,false,0,false,""];
	this.AxeH=new regle(context,this.longueur);
	this.AxeV=new regle(context,this.hauteur);
	this.parZero=true;
	this.dessineRepere=function(){
		with (this.AxeH){
			longueur=this.longueur;
			hauteur=this.hauteur;
			var posX=this.posX;
			var posY=this.posY;
			//il faut vérifier si il y a une partie négative
			if (this.paramY[0]*this.paramY[1]<0 && this.parZero){
				//et dans ce cas déplacer l'axe au zéro
				posY=this.posY+this.paramY[0]/(this.paramY[1]-this.paramY[0])*this.hauteur;
			}	
			mini=this.paramX[0];
			maxi=this.paramX[1];
			grad=this.paramX[2];
			sousgrad=this.paramX[3];
			soussousgrad=this.paramX[4];;
			etiquette=this.paramX[5];
			format=this.paramX[6];
			quadrillage=this.paramX[7];
			texte=this.paramX[8];;
			dessineRegle();
		}	
		with (this.AxeV){
			style=1;
			longueur=this.hauteur;
			hauteur=this.longueur;
			var posX=this.posX;
			var posY=this.posY-this.hauteur;
			//il faut vérifier si il y a une partie négative
			if (this.paramX[0]*this.paramX[1]<0 && this.parZero){
				//et dans ce cas déplacer l'axe au zéro
				posX=this.posX-this.paramX[0]/(this.paramX[1]-this.paramX[0])*this.longueur;
			}	
			mini=this.paramY[0];
			maxi=this.paramY[1];
			grad=this.paramY[2];
			sousgrad=this.paramY[3];
			soussousgrad=this.paramY[4];;
			etiquette=this.paramY[5];
			format=this.paramY[6];
			quadrillage=this.paramY[7];
			texte=this.paramY[8];;
			dessineRegle();
		}
	}
	this.coordonnees=function(x,y){
		if (this.paramY[0]*this.paramY[1]<0 && this.parZero){
			var posY=this.posY+this.paramY[0]/(this.paramY[1]-this.paramY[0])*this.hauteur;
			var valY =(((y-posY)*(this.paramY[0]-this.paramY[1])/this.hauteur)).toFixed(this.paramY[6]+1);
		}else{
			var posY=this.posY;
			var valY =(((y-posY)*(this.paramY[0]-this.paramY[1])/this.hauteur)+this.paramY[0]).toFixed(this.paramY[6]+1);}
		if (this.paramX[0]*this.paramX[1]<0 && this.parZero){	
			var posX=this.posX-this.paramX[0]/(this.paramX[1]-this.paramX[0])*this.longueur;
			var valX=(((x-posX)*(this.paramX[1]-this.paramX[0])/this.longueur)).toFixed(this.paramX[6]+1);
			
			}else{
			var posX=this.posX
			var valX=(((x-posX)*(this.paramX[1]-this.paramX[0])/this.longueur)+this.paramX[0]).toFixed(this.paramX[6]+1);}
		with (context){
			beginPath();
			font = "14px Arial";
			textAlign="center"
			fillStyle="#999999";
			strokeStyle="black";
			var deltaX=(measureText(valY).width)/2+37;
			var deltaXt=32;
			var deltaY=(measureText(valX).width)/2;
			var deltaYt=24;
			if (valX<0){deltaX=-15;deltaXt=-deltaXt;}
			if (valY<0){deltaYt=-deltaYt-24;}
			rect(posX-deltaX,y-14,measureText(valY).width+10,18);//y
			rect(x-deltaY-5,posY+deltaYt,measureText(valX).width+10,18);//x
			fill();
			fillStyle="#ffffff";
			moveTo(this.posX,this.posY);
			lineTo(this.longueur+this.posX,this.posY);
			moveTo(x,this.posY);
			lineTo(x,-hauteur+this.posY);
			moveTo(this.posX,y);
			lineTo(this.posX+longueur,y);
			stroke();
			fillText(valY,posX-deltaXt,y);//y
			fillText(valX,x,posY+deltaYt+14);//x
			
			closePath();
		}
	}
		
}

function mathPlot(canvas){
	this.canvas=canvas;
	this.canvas.style.cursor="none";
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.context=this.canvas.getContext('2d');
	this.courbes=new Array;//tableau courbe qui pouuront être des tebleaux de données ou des function renvyant un tableau
	this.titres=new Array;//titre des courbes
	this.couleurs=new Array;//couleur des courbes
	//zone de dessin
	this.paddingLeft=60;
	this.paddingRight=70;
	this.paddingTop=70;
	this.paddingBottom=50;
	this.coordVisible=false;
	//mise en place du gestionnaire souris
	this.canvas.addEventListener("mousemove", this.xy.bind(this), false);
	this.canvas.addEventListener("mouseout", this.nettoie.bind(this), false);
	this.canvas.addEventListener("contextmenu", this.menu.bind(this), false);
	
	//rajouter ici les sousmenus désirés et les fonctions associées sont à définr dans le prototype menu (en bas)
	this.listMenu1=["Efface tout","Réticule","Courbe"];
	
	//axes et quadrillage
	//repere(context,posX,posY,longueur,hauteur)
	this.repere=new repere(this.context,this.paddingLeft,this.height-this.paddingBottom,this.width-this.paddingLeft-this.paddingRight,this.height-this.paddingBottom-this.paddingTop);
	
	//this.param_=[mini,maxi,grad,sousgrad,soussousgrad,etiquette,format,quadrillage,texte];
	this.repere.paramX=[-100,100,12,5,2,true,0,false,"x"];
	this.repere.paramY=[-100,100,10,5,0,true,0,false,"Y"];
	this.repere.parZero=true;
		
	//efface dessin
	this.clear=function(){
		with (this.context){
			beginPath();
			clearRect(0,0,this.width,this.height);
			closePath();
		}
	}	
	
	//rafraichi le dessin
	this.refresh=function(){
		//efface
		this.clear();
		//dessine le repère
		this.repere.dessineRepere();
		//calcul la nouvelle echelle
		this.echelleX=(this.width-this.paddingLeft-this.paddingRight)/(this.repere.paramX[1]-this.repere.paramX[0]);
		this.echelleY=(this.height-this.paddingTop-this.paddingBottom)/(this.repere.paramY[1]-this.repere.paramY[0]);
		//recalcule les courbes si fonction (inutile pour data)
		//TODO
		
	
	
		//dessine les courbe et écrit la légende
		var X=0;var Y=0;var decalageX=30;var decalageY=20;
		with (this.context){
			lineWidth=1;
			globalAlpha=1;
			for (var i=0;i<this.courbes.length;i++){
				beginPath();
				strokeStyle=this.couleurs[i];
				//font = "12px Arial";
				textAlign="left";
				X=(this.courbes[i][0][0]-this.repere.paramX[0])*this.echelleX+this.paddingLeft;
				Y=this.height-this.paddingBottom-(this.courbes[i][0][1]-this.repere.paramY[0])*this.echelleY
				moveTo(X,Y);
				for (var j=1;j<this.courbes[i].length;j++){
					X=(this.courbes[i][j][0]-this.repere.paramX[0])*this.echelleX+this.paddingLeft;
					Y=this.height-this.paddingBottom-(this.courbes[i][j][1]-this.repere.paramY[0])*this.echelleY
					if (X>this.paddingLeft-10 && X<this.width-this.paddingRight+10&&Y>this.paddingTop&&Y<this.height-this.paddingBottom+10){
					//if (X>0 && X<this.width&&Y>0&&Y<this.height){
					lineTo(X,Y);
					}
					else{
					moveTo(X,Y);
					}
				}
				if (decalageX+measureText(this.titres[i]).width>this.width-this.paddingRight-20){
					decalageX=30;decalageY=decalageY+20;
				}	
				moveTo(this.paddingLeft+decalageX+20,decalageY);lineTo(this.paddingLeft+decalageX+30,decalageY);
				fillText(this.titres[i],this.paddingLeft+decalageX+35,decalageY);
				decalageX=decalageX+measureText(this.titres[i]).width+35
				stroke();	
				closePath();
			}
		}

	}
	
	//efface toutes les données
	this.efface=function(){
		this.courbes.splice(0);//rechercher la fonction permettant de retirer lélément i d'un tableau
		this.titres.splice(0);
		this.couleurs.splice(0);
		this.refresh();
	}	
	
	
	//retire une courbe
	this.dataMoins=function(i){
		if (i<this.courbes.length){
			this.courbes.splice(i,1);//rechercher la fonction permettant de retirer lélément i d'un tableau
			this.titres.splice(i,1);
			this.couleurs.splice(i,1);
		}	
	}
	
	//ajoute une courbe de données
	this.dataPlus=function(valeur,titre,couleur){
		//animation
		//puis mémorisation des données
		this.courbes.push(valeur);
		this.titres.push(titre);
		this.couleurs.push(couleur);
	}
	
	//ajoute une fonction 
	this.fonctionPlus=function(valeur,titre,couleur){
		//animation
		//puis mémorisation des données
		var temp=new Array;
		var lepas=eval((this.repere.paramX[1]-this.repere.paramX[0])/(this.width-this.paddingLeft-this.paddingRight));
		for (var x=this.repere.paramX[0];x<=this.repere.paramX[1];(x=x+lepas)){
			temp.push([x,eval(valeur)]);
		}	
		this.courbes.push(temp);
		this.titres.push(titre);
		this.couleurs.push(couleur);
	}
}	
mathPlot.prototype.xy=function(evt){
		if (this.coordVisible){
			this.canvas.style.cursor="none";
			var XYrect = this.canvas.getBoundingClientRect();
			var valX=evt.clientX-XYrect.left;
			var valY=evt.clientY-XYrect.top;
			this.refresh();
			this.repere.coordonnees(valX,valY);
		}
		else{
			this.canvas.style.cursor="url(http://physique-chimie.discip.ac-caen.fr/sites/physique-chimie.discip.ac-caen.fr/squelettes/images/contextmenu.png),auto";
		}
	}
	
mathPlot.prototype.nettoie=function(){
	if (this.coordVisible){
		this.canvas.style.cursor="none";
		this.refresh();
	}else{
		this.canvas.style.cursor="url(http://physique-chimie.discip.ac-caen.fr/sites/physique-chimie.discip.ac-caen.fr/squelettes/images/contextmenu.png),auto";
	}
}	








mathPlot.prototype.menu=function(evt){
	this.canvas.style.cursor="default";
	var coloris=["blue","red","green","purple","maroon","fuchsia","navy","olive","black"];
	var colorisFrench=["bleu","rouge","vert","violet","marron","fuchsia","marine","olive","noir"];
	var objet=this;
	var element=this.canvas;
	var XYrect = this.canvas.getBoundingClientRect();
	//fonction permettant de créer dynamiquement un menu reposant sur le nom du parent
	
	function creemenu(parent,titre,lien,classe){
		var x = document.getElementById("menu");
		if(x) x.parentNode.removeChild(x);
		
		element.parentNode.appendChild(parent);
		with(parent){
			setAttribute('class', 'ctxmenu');
			setAttribute('id',"menu");
			style.left =XYrect.right+ "px";
			style.top = window.scrollY+XYrect.top+ "px";
			onmouseover = function(e) { this.style.cursor = 'pointer'; } 
		}	
		var itemMenu=[];	
		for (var i=0;i<titre.length;i++){
			var p = document.createElement('p');
			itemMenu.push(p);
			parent.appendChild(itemMenu[i]);
			itemMenu[i].innerHTML = titre[i];
			itemMenu[i].onclick=lien[i];
			itemMenu[i].setAttribute('class', classe);
			itemMenu[i].setAttribute('id', i);
		}
	}
	
	
	
	var fonctionMenu1=	[	function() { objet.efface();element.parentNode.removeChild(menuDeroul1) },
								function(){
									objet.coordVisible=!objet.coordVisible;
									if (objet.coordVisible)
									{
									objet.listMenu1[1]="Réticule &#10004";	
									}
									else{
									objet.listMenu1[1]="Réticule";}
									
									element.parentNode.removeChild(menuDeroul1);	
									},
								
								function() {	
												
												element.parentNode.removeChild(menuDeroul1);
												var listMenu2=[];
												var fonctionMenu2=[];												
												for (var i=0;i<objet.courbes.length;i++){
													listMenu2.push(objet.titres[i]);
													fonctionMenu2.push(function() {
															var o=this.id;
															var listMenu3=["Couleur","Effacer"];
															var fonctionMenu3=[function(){
																				var fonctionMenu4=[];
																				for (var k=0;k<coloris.length;k++){
																					fonctionMenu4.push(function() {objet.couleurs[o]=coloris[this.id];element.parentNode.removeChild(menuDeroul4);objet.refresh();})
																				};																		
																				var menuDeroul4= document.createElement('div');
																				monmenu3=creemenu(menuDeroul4,colorisFrench,fonctionMenu4,'ctxline');
																				element.parentNode.removeChild(menuDeroul3) ;
																				}
																				,
																				function(){objet.dataMoins(o);element.parentNode.removeChild(menuDeroul3);objet.refresh();}];
															element.parentNode.removeChild(menuDeroul2) ;	
															var menuDeroul3 = document.createElement('div');
															monmenu2=creemenu(menuDeroul3,listMenu3,fonctionMenu3,'ctxline');
														});			
												}	
												var menuDeroul2 = document.createElement('div');
												monmenu1=creemenu(menuDeroul2,listMenu2,fonctionMenu2,'ctxline');	
											}
							];	
							
   								
	//création du sous-menu
	var menuDeroul1 = document.createElement('div');
	monmenu=creemenu(menuDeroul1,objet.listMenu1,fonctionMenu1,'ctxline')
	

		
	return false;

	
}