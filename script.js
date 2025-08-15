const btnCarregarUsuarios = document.getElementById('btnCarregarUsuarios');
const btnAdicionarUsuario = document.getElementById('btnAdicionarUsuario');
const listaUsuarios = document.getElementById('listaUsuarios');
const url = 'https://jsonplaceholder.typicode.com/users';

let usuariosObj = []; // array global

btnCarregarUsuarios.addEventListener('click', async () => {
    const response = await fetch(url);
    const usuariosObj = await response.json(); //transforma o dados da API em objeto
    renderizarListaUsuarios(usuariosObj);
});

btnAdicionarUsuario.addEventListener('click', () => {
    adicionarNovoUsuario(usuariosObj);
});


function limparLista() { listaUsuarios.innerHTML = ''}

function adicionarNovoUsuario(usuariosObj){
    const inputNome = document.getElementById('inputNome').value.trim();
    const inputEmail = document.getElementById('inputEmail').value.trim();
    const inputCidade = document.getElementById('inputCidade').value.trim();

    const novoUsuarioOBJ = { 
        name: inputNome, 
        email: inputEmail, 
        address:{ city: inputCidade}
    }
    
    console.log(novoUsuarioOBJ);
    alert("Usuario cadastrado com sucesso!");
    usuariosObj.push(novoUsuarioOBJ); //adiciona o objeto ba array de usuarios
}

function renderizarListaUsuarios(usuariosObj){
    limparLista();
    usuariosObj.map((usuario) => {
        const li = document.createElement("li");
        li.innerHTML = `Nome: ${usuario.name} - Email: ${usuario.email} - Cidade: ${usuario.address.city}`;
        li.classList.add('cssLista');
        listaUsuarios.appendChild(li);
    })
    adicionarNovoUsuario();
}




    /*const usuariosComC = usuariosObj.filter(usuarios => usuarios.name.charAt(0) === 'C');
    
    usuariosComC.forEach((usuario) => {
        const li = document.createElement("li")
        li.innerText = `Nome: ${usuario.name} - Email: ${usuario.email} - Cidade: ${usuario.address.city}`;
        listaUsuariosC.appendChild(li);
    })*/

