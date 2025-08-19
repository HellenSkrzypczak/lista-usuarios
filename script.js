const btnCarregarUsuarios = document.getElementById('btnCarregarUsuarios');
const btnAdicionarUsuario = document.getElementById('btnAdicionarUsuario');
const listaUsuarios = document.getElementById('listaUsuarios');

let usuariosObj = []; // array global
let usuariosCarregados = false;
let idUsuarioExcluido = null;

async function buscarUsuarios(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    usuariosObj = await response.json(); //transforma o dados da API em objeto
    renderizarListaUsuarios(usuariosObj);
}

function limparLista() { 
    listaUsuarios.innerHTML = ""
}

function validacaoCampos(...campos) {
    return campos.every(campos => campos.value.trim() !== "")
}

function adicionarNovoUsuario(usuariosObj){
    const inputNome = document.getElementById('inputNome');
    const inputEmail = document.getElementById('inputEmail');
    const inputCidade = document.getElementById('inputCidade');

    let ids = usuariosObj.map(u => u.id);
    let novoId = (ids.length > 0 ? Math.max(...ids) : 0) + 1;

    const novoUsuarioOBJ = { 
        id: novoId, 
        name: inputNome.value.trim(), 
        email: inputEmail.value.trim(), 
        address:{ city: inputCidade.value.trim() }
    }
    
    if(validacaoCampos(inputNome, inputEmail, inputCidade))
    {
        alert("Usuario cadastrado com sucesso!");
        usuariosObj.push(novoUsuarioOBJ); //adiciona o objeto ba array de usuarios
        renderizarListaUsuarios(usuariosObj);

    }
    else {
        alert('Preencha todos os campos!');
    }
}

function renderizarListaUsuarios(){
    limparLista()
    usuariosObj.forEach((usuario) => {
        const li = document.createElement("li");
        li.innerHTML = `Nome: ${usuario.name} - Email: ${usuario.email} - Cidade: ${usuario.address.city}`;
        li.classList.add('cssLista');
        listaUsuarios.appendChild(li);

        const buttonExcluir = document.createElement("button");
        buttonExcluir.innerText = "Excluir";
        buttonExcluir.classList.add("cssButton");
        li.appendChild(buttonExcluir);

        buttonExcluir.addEventListener('click', () => {
            idUsuarioExcluido = (usuario.id);
            console.log(idUsuarioExcluido);
            excluirUsuario();
        });
    })
}

function excluirUsuario() {

    let indice = usuariosObj.findIndex(usuario => usuario.id === idUsuarioExcluido)
    const removidos = usuariosObj.splice(indice, 1);
    //console.log(usuariosObj);
    renderizarListaUsuarios();
}

btnCarregarUsuarios.addEventListener('click', async () => {
    if(usuariosCarregados)
    {
        return;
    }
    else{
        buscarUsuarios() 
        usuariosCarregados = true;
    }
});

btnAdicionarUsuario.addEventListener('click', () => {
    adicionarNovoUsuario(usuariosObj);
});
