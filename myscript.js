class User {
  constructor(nome,idade) {
    this.name = nome;
    this.age = idade;
  }
}

let usuarios = JSON.parse(localStorage.getItem('lista_de_usuarios')) || [];// array de novos usuários

function atualiza(){
	document.querySelector('.ListaDeUsuarios').innerHTML = "";
	for(let i = 0; i < usuarios.length; i++){

		var LabelNome = document.createElement('label');
		LabelNome.setAttribute('for','nome');
		LabelNome.setAttribute('id',`LabelNome${i}`);
		LabelNome.innerHTML = "<b>Nome:</b> " + usuarios[i].name;

		var InputNome = document.createElement('input');
		InputNome.setAttribute('id',`name${i}`); 
		InputNome.setAttribute('class','nome');
		InputNome.setAttribute('placeholder','Novo nome');
		InputNome.value = usuarios[i].name;

		var Nome_Atual = document.createElement('div');
		Nome_Atual.setAttribute('class','linhaInputs');
		Nome_Atual.setAttribute('id',`nomeAtual${i}`);
		Nome_Atual.appendChild(LabelNome);
		Nome_Atual.appendChild(InputNome);

		var LabelIdade = document.createElement('label');
		LabelIdade.setAttribute('for','idade');
		LabelIdade.setAttribute('id',`LabelIdade${i}`);
		LabelIdade.innerHTML = "<b>Idade:</b> " + usuarios[i].age;

		var InputIdade = document.createElement('input');
		InputIdade.setAttribute('id',`age${i}`);
		InputIdade.setAttribute('class','idade');
		InputIdade.setAttribute('placeholder','Nova idade');
		InputIdade.value = usuarios[i].age;

		var Idade_Atual = document.createElement('div');
		Idade_Atual.setAttribute('class','linhaInputs');
		Idade_Atual.setAttribute('id',`idadeAtual${i}`);
		Idade_Atual.appendChild(LabelIdade);
		Idade_Atual.appendChild(InputIdade);

		var divDeCaixasDeTexto = document.createElement('div');
		divDeCaixasDeTexto.setAttribute('class','containerCaixasDeTexto');
		divDeCaixasDeTexto.appendChild(Nome_Atual);
		divDeCaixasDeTexto.appendChild(Idade_Atual);

		var btns = "<button class = 'BtnEdit' id = 'edit"+ i +"' onclick = 'edit(" + i + ")'>Editar</button> <button class = 'BtnDel' id = 'del" + i + "' onclick = 'del(" + i + ")'>Deletar</button>";
		var botoes = document.createElement('div');
		botoes.setAttribute('class','botoes');
		botoes.innerHTML = btns;

		var Linha_atual = document.createElement('div');
		Linha_atual.setAttribute('class','currentCell');
		Linha_atual.appendChild(divDeCaixasDeTexto);
		Linha_atual.appendChild(botoes);
	
		document.querySelector('.ListaDeUsuarios').appendChild(Linha_atual);
	}
}


function edit(indice){

	if(document.querySelector(`#name${indice}`).value=="" ||  document.querySelector(`#age${indice}`).value==""){
		alert("Por favor, preencha os campos!");
	}
	else if(isNaN(document.querySelector(`#age${indice}`).value)){
		alert("Por favor, preencher o campo de idade com um número válido!!");
	}
	else{
		let novaIdade = document.querySelector(`#age${indice}`).value;
		let novoNome = document.querySelector(`#name${indice}`).value;
		usuarios[indice].idade = novaIdade;
		usuarios[indice].nome = novoNome;
		alert("Usuário de índice " + indice + " foi editado com sucesso!!"); 

		//mudar labels
		document.getElementById(`LabelIdade${indice}`).innerHTML = `<b>Idade: </b>${novaIdade}`;
		document.getElementById(`LabelNome${indice}`).innerHTML = `<b>Nome: </b>${novoNome}`;
		
		document.querySelector(`#age${indice}`).value = '';
		document.querySelector(`#name${indice}`).value = '';
	}
	saveToStorage();
}

function del(indice){
	usuarios.splice(indice,1);
	alert("O usuário de índice "+indice+" foi removido com sucesso!!");
	atualiza();
	saveToStorage();
}

function add(){
	if(document.querySelector('#name').value=="" || document.querySelector('#age').value==""){
		alert("Por favor, preencha os campos!");
	}
	else if(isNaN(document.querySelector('#age').value)){
		alert("Por favor, preencher o campo de idade com um número válido!!");
	}
	else{
		//Pegando os valores digitados nos inputs
		let idade = document.querySelector('#age').value;
		let nome = document.querySelector('#name').value;

		//Criando novo usuário e passando paara o vetor
		usuarios.push(new User(nome,idade));	
		atualiza();

		document.querySelector('#age').value = '';
		document.querySelector('#name').value = '';
	}
	saveToStorage();	
}

function togglePopup(){
	//alert("heloWorld");
	document.getElementById("popup-1").classList.toggle("active");
}

function saveToStorage(){
	localStorage.setItem('lista_de_usuarios',JSON.stringify(usuarios));
}
