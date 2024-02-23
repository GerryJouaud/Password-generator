//////////////////////////// INITIALISATION VALEURS //////////////////////

var minuscule=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
];
var majuscule=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];
var speciaux=["!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/"];

var minSelec=false; // On initialise chaque 
var majSelec=false;
var speSelec=false;
var numSelec=false;

var caracGeneres=[]; // tableau avant le tri aléatoire
var caracGeneresFinal=[] // tableau avec les caractères finaux

var securiteMDP=0;
var nombreCaraPossible=0;

//////////////////////////// FONCTIONS //////////////////////////
function genereMinuscule(){
    let nombreAleatoire=Math.floor(Math.random()*minuscule.length);
    let minusculeAleatoire=minuscule[nombreAleatoire];
    // console.log(minusculeAleatoire);
    return minusculeAleatoire;
    
}
function genereMajuscule(){
    let nombreAleatoire=Math.floor(Math.random()*majuscule.length);
    let majusculeAleatoire=majuscule[nombreAleatoire];
    // console.log(majusculeAleatoire);
    return majusculeAleatoire;
    
}
function genereNumerique(){

   let nombreAleatoire=Math.floor(Math.random()*10);
//    console.log(nombreAleatoire);
   return nombreAleatoire;
   
}
function genereSpecial(){
    let nombreAleatoire=Math.floor(Math.random()*speciaux.length);
    let specialAleatoire=speciaux[nombreAleatoire];
    // console.log(specialAleatoire);
    return specialAleatoire;
    
}


function genere(nbCaracteres){
    
    securiteMDP=nombreCaraPossible**nbCaracteres;

    if(!minSelec && !majSelec && !numSelec && !speSelec){
        caracGeneresFinal.push("Vous n'avez sélectionné aucun critère !");
    }

    for(let i=0; i<nbCaracteres;i++){

        if(minSelec){
           caracGeneres.push(genereMinuscule());
        }
        if(majSelec){
            caracGeneres.push(genereMajuscule());
        }
        if(numSelec){
            caracGeneres.push(genereNumerique());
        }
        if(speSelec){
            caracGeneres.push(genereSpecial())
        }

        carAleatoire=Math.floor(Math.random()*caracGeneres.length);
        caracGeneresFinal.push(caracGeneres[carAleatoire]);
    }
console.log(caracGeneresFinal);
return caracGeneresFinal;

}

function verificationCriteres(){
  
    $("#min").change(function(event){
        if($(this).prop("checked")){
            minSelec=true;
            nombreCaraPossible+=minuscule.length;
        } else {
            minSelec=false;
            nombreCaraPossible-=minuscule.length;
        }
    })
    $("#maj").change(function(event){
        if($(this).prop("checked")){
            majSelec=true;
            nombreCaraPossible+=majuscule.length;
        }else {
            majSelec=false;
            nombreCaraPossible-=majuscule.length;
        }
    })
    $("#num").change(function(event){
        if($(this).prop("checked")){
            numSelec=true;
            nombreCaraPossible+=10;
        }else {
            numSelec=false;
            nombreCaraPossible-=10;
        }
    })
    $("#car").change(function(event){
        if($(this).prop("checked")){
            speSelec=true;
            nombreCaraPossible+=speciaux.length;
        }else {
            speSelec=false;
            nombreCaraPossible-=speciaux.length;
        }

        })
    
}

function calculSecurite(securiteMDP){
    step0();
    if(securiteMDP<=8503056){
        step1();
    }
    if(securiteMDP>8503056 && securiteMDP<62523502209){
        step2();
    }
    if(securiteMDP>62523502209 && securiteMDP<1235736291547681){
        step3();
    }
    if(securiteMDP>1235736291547681 && securiteMDP<7326680472586201000){
        step4();
    }
    if(securiteMDP>7326680472586201000){
        step5();
    }

}
   
function copier(){
    let mdpCopie= $("#mdp").text();
    navigator.clipboard.writeText(mdpCopie);
    
}



//////////////////////////// MAIN ///////////////////////////////
$(function(){
    $('input[type="checkbox"]').prop("checked", false);
   
    
    verificationCriteres();
    $("#generation").click(function (event){ // on écoute le click du btn et on génére le mdp

        verificationCriteres(); // On vérifie les critères sélectionnés
        var nbCaracteres=$("#nb").val();
        genere(nbCaracteres);
        var mdp=caracGeneresFinal.join("");
        $("#mdp").text(mdp);
        caracGeneres=[];  // on vide les tableaux
        caracGeneresFinal=[];
        console.log(mdp);
        calculSecurite(securiteMDP)

      


    })

    $("#copy").click(function(event){ // on copie le mdp
    copier();
    })


})
