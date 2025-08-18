const btnCarregarUsuarios = document.getElementById('btnCarregarUsuarios');
const btnAdicionarUsuario = document.getElementById('btnAdicionarUsuario');
const listaUsuarios = document.getElementById('listaUsuarios');

let usuariosObj = []; // array global
let usuariosCarregados = false;

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

    const novoUsuarioOBJ = { 
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

function renderizarListaUsuarios(usuariosObj){
    limparLista()
    usuariosObj.forEach((usuario) => {
        const li = document.createElement("li");
        li.innerHTML = `Nome: ${usuario.name} - Email: ${usuario.email} - Cidade: ${usuario.address.city}`;
        li.classList.add('cssLista');
        listaUsuarios.appendChild(li);
    })
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
