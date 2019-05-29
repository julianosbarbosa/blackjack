arrOne = ["preguiçoso", "estúpido", "inseguro", "idiota", "podre", "sacana", "comunista", "corno", "babaca", "troxa", "sem noção"];
arrTwo = ["filho de", "bunda de", "bosta de", "lixo de", "puta de", "pau de", "cabeça de", "boca de", "mulher de", "pe de", "para de beijar", " para de lamber"];
arrThree=["gordo","jumento","martelo","bandido","bandido","camioneiro","boiola","ogro","monstro","baleia","sapo","cachorro","porco","mendigo","palhaço"];
praiseArrOne = ['surpreendente o(a)', 'tentador o(a)', 'habilidoso o(a)', 'encantador o(a)', 'lindo o(a)', 'encantador o(a)', 'interessante o(a)', 'adorável o(a)', 'brilhante o(a)', 'inspirador o(a)', 'sério o(a)', 'fenomenal o(a)', 'sonhador o(a)', 'inteligente o(a)', 'forte o(a)', 'bonito o(a)', 'sexy o(a)'];
praiseArrTwo = ['habilidade', 'sagacidade', 'domínio', 'conhecimento', 'consciência', 'conhecimento', 'compreensão', 'supremacia', 'habilidade'];
insultArrOne = ['decepcionante', 'deprimente', 'medíocre', 'desagradável', 'insatisfatório', 'desanimador', 'desolador'];
insultArrTwo = ['consciência', 'consciência', 'compreensão', 'vivacidade', 'atenção', 'percepção', 'compreensão', 'inteligência', 'julgamento', 'habilidade de pressionar botões'];
cardType = ["A","K","Q","J","10","9","8","7","6","5","4","3","2"];
cardImgs = ['♣','♦','♥','♠'];
var total = 0;
var score = {"jogador":0,"pc":0};

generateCard("#score");
generateCard(".card:last"); 
$(document).on("click","#hit", function(){
    generateCard(".card:last");   

});

function generateCard(elem){
    var $el = $(elem);
    var numb = cardType[Math.floor((Math.random() * cardType.length) + 1) - 1];
    total = 0;
    $el.after("<div class='card'><p class='cardType1'></p><span class='cardImg'>"+cardImgs[Math.floor((Math.random() * cardImgs.length) + 1) - 1]+"</span><p class='cardType2'></p></div>");
    
    $(".card:last").find("p").each(function(){
        $(this).html(numb);
    });
    $(".card").each(function(){
        var thisType = $.trim($(this).find("p").html());
        if(thisType == "A"){
            total += 11;
        }else if(thisType == "K"||thisType == "Q"||thisType == "J"){
            total += 10;
        }else{
            total += parseInt(thisType);
        }
    });
    result(total);
}

$(document).on("click","#stay", function(){
    var opp = 21 - Math.floor((Math.random()*6)+1);
    if(total > opp){
        $("#result").html("Voce ganhou !!!  "+addPraise()+"<br\><br\>Pontuaçao do computador: "+ opp);
        score["jogador"]++;
    }else{
        $("#result").html("Voce perdeu!!! Seu "+addInsult()+"! <br\><br\> Pontuaçao do computador: "+ opp);
        score["pc"]++;
    }
    $("#hit").attr("disabled","true");
    $("#stay").attr("disabled","true");
    $("#score").html(score["jogador"]+" / "+score["pc"]);
});

$(document).on("click","#restart", function(){
    $("#hit").removeAttr("disabled");
    $("#stay").removeAttr("disabled");
    $("#result").html("");
    $(".card:not(.card:first)").each(function(){$(this).remove();});
    total = 0;
    setFirstCard();
    generateCard(".card:last");   
    
});

function result(total){
    var opp = 21 - Math.floor((Math.random()*8)+1);
    if(total == 21){
        $("#result").html("21! Acertou na mosca "+addPraise()+"<br\><br\>Pontuaçao do jogador: "+ opp);
        $("#hit").attr("disabled","true");
        $("#stay").attr("disabled","true");
        score["jogador"]++;
    }else if(total > 21){
        $("#result").html("Voce estorou!!! Sua "+insultArrTwo[Math.floor((Math.random() * insultArrTwo.length-1) + 1)]+" durante essa rodada voce foi "+insultArrOne[Math.floor((Math.random() * insultArrOne.length-1) + 1)]+".");
        $("#hit").attr("disabled","true");
        $("#stay").attr("disabled","true");
        score["pc"]++;
    }
    $("#score").html(score["jogador"]+" / "+score["pc"]);
}

function setFirstCard(){
    var firstType = cardType[Math.floor((Math.random() * cardType.length) + 1) - 1];
    
$(".card:first").find("p").each(function(){
    $(this).html(firstType);
    
});
    if(firstType == "A"){
            total += 11;
        }else if(firstType == "K"||firstType == "Q"||firstType == "J"){
            total += 10;
        }else{
            total += parseInt(firstType);
        }
        
}

function addPraise(){
    return praiseArrOne[Math.floor((Math.random() * praiseArrOne.length-1) + 1)]+" "+
        praiseArrTwo[Math.floor((Math.random() * praiseArrTwo.length-1) + 1)]+"!";
}

function addInsult(){
    return arrOne[Math.floor((Math.random() * arrOne.length-1) + 1)]+" "
    +arrTwo[Math.floor((Math.random() * arrTwo.length-1) + 1)]+" "
    +arrThree[Math.floor((Math.random() * arrThree.length-1) + 1)];
}