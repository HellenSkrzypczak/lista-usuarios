const inputNome = document.getElementById('inputNome');
const inputEmail = document.getElementById('inputEmail');
const inputCidade = document.getElementById('inputCidade');
const inputBusca = document.getElementById('inputBusca');
const btnBusca = document.getElementById('btnBusca');
const btnCarregarUsuarios = document.getElementById('btnCarregarUsuarios');
const btnAdicionarUsuario = document.getElementById('btnAdicionarUsuario');
const btnSalvarEdicao = document.getElementById('btnSalvarEdicao');
const listaUsuarios = document.getElementById('listaUsuarios');

let usuariosObj = [];
let usuariosCarregados = false;

async function buscarUsuarios(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    usuariosObj = await response.json(); //transforma o dados da API em objeto
    renderizarListaUsuarios(usuariosObj);
}

function limparLista() { 
    listaUsuarios.innerHTML = ""
}

function limparCampos() {
    inputNome.value = "";
    inputEmail.value = "";
    inputCidade.value = "";
}

function validacaoCampos(...campos) {
    return campos.every(campos => campos.value.trim() !== "")
}

function adicionarNovoUsuario(usuariosObj){
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
        usuariosObj.push(novoUsuarioOBJ); //adiciona o objeto na array de usuarios
        renderizarListaUsuarios(usuariosObj);
    }
    else {
        alert('Preencha todos os campos!');
    }

    limparCampos()
}

function filtrarUsuario(){
    if(inputBusca){
        const valueBusca = inputBusca.value.trim();
        const filtroBusca = usuariosObj.filter(usuario =>  
            usuario.name.includes(valueBusca) || usuario.email.includes(valueBusca)
        );
        
        usuariosObj.forEach(usuario => {
            if(usuario.name === filtroBusca.name)
                
        });

        //renderizarListaUsuarios();
    }
    else{
        renderizarListaUsuarios();
    }
    

}

function renderizarListaUsuarios(){
    limparLista()
    usuariosObj.forEach((usuario) => {
        const li = document.createElement("li");
        li.innerHTML = `Nome: ${usuario.name} - Email: ${usuario.email} - Cidade: ${usuario.address.city}`;
        li.classList.add('cssLista');
        listaUsuarios.appendChild(li);

        const divBtn = document.createElement("div");
        divBtn.classList.add('cssDivBtn');
        //divBtn.appendChild(li);

        const buttonExcluir = document.createElement("button");
        buttonExcluir.innerText = "Excluir";
        buttonExcluir.classList.add("cssButton");
        divBtn.appendChild(buttonExcluir);

        buttonExcluir.addEventListener('click', () => {
            buttonExcluir.dataset.id = usuario.id;
            const id = Number(buttonExcluir.dataset.id);
            excluirUsuario(id);
        });

        const buttonEditar = document.createElement("button");
        buttonEditar.innerText = "Editar";
        buttonEditar.classList.add("cssButton");
        divBtn.appendChild(buttonEditar);

        buttonEditar.addEventListener('click', () => {
            //idUsuarioEditar = usuario.id;
            btnSalvarEdicao.dataset.id = usuario.id;

            inputNome.value = usuario.name;
            inputEmail.value = usuario.email;
            inputCidade.value = usuario.address.city;
             btnSalvarEdicao.style.display = "inline-block";
        })

        li.appendChild(divBtn);
    })
}

function editarUsuario(){
    const id = Number(btnSalvarEdicao.dataset.id);
    if (!id){
        alert('Selecione um usuario para editar!')
        return;
    }

    const index = usuariosObj.findIndex(usuario => usuario.id === id);
    if (index === -1){alert('Usuário não encontrado.'); return;}

    //usuariosObj[index].id = idUsuarioEditar;
    usuariosObj[index].name = inputNome.value.trim();
    usuariosObj[index].email = inputEmail.value.trim();
    usuariosObj[index].address.city = inputCidade.value.trim();

    renderizarListaUsuarios();
    delete btnSalvarEdicao.dataset.id; // limpa o estado
    limparCampos();
    btnSalvarEdicao.style.display = "none";
};

function excluirUsuario(id) {
    let indice = usuariosObj.findIndex(usuario => usuario.id === id)
    const removidos = usuariosObj.splice(indice, 1);
    renderizarListaUsuarios();
};

btnSalvarEdicao.addEventListener('click', () => {
    if(validacaoCampos(inputNome, inputEmail, inputCidade ))
    {
        editarUsuario()
    }
    else { alert('Preencha todos os campos!'); return;}
})

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

btnBusca.addEventListener('click', () => {
    filtrarUsuario();
})
