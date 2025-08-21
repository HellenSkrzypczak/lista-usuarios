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

//-------------------------- CRUD ---------------------------------
function criarUsuario(nome, email, cidade){
    let ids = usuariosObj.map(u => u.id);
    let novoId = (ids.length > 0 ? Math.max(...ids) : 0) + 1;

    return { 
        id: novoId, 
        name: nome.value.trim(), 
        email: email.value.trim(), 
        address:{ city: cidade.value.trim() }
    };
}

function adicionarUsuario(usuario){
    usuariosObj.push(usuario);
}

function excluirUsuario(id) {
    usuariosObj = usuariosObj.filter(usuario => usuario.id !== id)
};

function editarUsuario(id, novosDados){
    const index = usuariosObj.findIndex(usuario => usuario.id === id);

    if (index !== -1){
        usuariosObj[index] = { ...usuariosObj[index], ...novosDados };  
    }
    else{
        alert('Usuário não encontrado.'); return;
    }
}

function buscarUsuariosPorValor(valor){
    valor = valor.toLowerCase();
    return usuariosObj.filter(usuario => 
        usuario.name.toLowerCase().includes(valor) || 
        usuario.email.toLowerCase().includes(valor)
        );
}

//-------------------------- FUNÇÕES UI --------------------------
function limparLista() { 
    listaUsuarios.innerHTML = ""
}

function limparCampos() {
    inputNome.value = "";
    inputEmail.value = "";
    inputCidade.value = "";
}

function renderizarListaUsuarios(usuarios){
    limparLista()

    usuarios.forEach((usuario) => {

        const li = document.createElement("li");
        li.innerHTML = `Nome: ${usuario.name} - Email: ${usuario.email} - Cidade: ${usuario.address.city}`;
        li.classList.add('cssLista');
        
        const divBtn = document.createElement("div");
        divBtn.classList.add('cssDivBtn');

        const buttonExcluir = document.createElement("button");
        buttonExcluir.innerText = "Excluir";
        buttonExcluir.classList.add("cssButton");
        buttonExcluir.addEventListener('click', () => {
            excluirUsuario(usuario.id);
            renderizarListaUsuarios(usuariosObj);
        });

        const buttonEditar = document.createElement("button");
        buttonEditar.innerText = "Editar";
        buttonEditar.classList.add("cssButton");
        buttonEditar.addEventListener('click', () => {
            btnSalvarEdicao.dataset.id = usuario.id;
            inputNome.value = usuario.name;
            inputEmail.value = usuario.email;
            inputCidade.value = usuario.address.city;
            btnSalvarEdicao.style.display = "inline-block";
        });

        divBtn.appendChild(buttonExcluir);
        divBtn.appendChild(buttonEditar);
        li.appendChild(divBtn);
        listaUsuarios.appendChild(li);
    })
};

function validacaoCampos(...campos) {
    return campos.every(campos => campos.value.trim() !== "")
};

//-------------------------- CONTROLE -------------------------------
async function carregarUsuarios(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    usuariosObj = await response.json(); //transforma o dados da API em objeto
    renderizarListaUsuarios(usuariosObj);
};

function salvarEdicao(){
    const id = Number(btnSalvarEdicao.dataset.id);
    if (!id){ alert('Selecione um usuario para editar!'); return; }

    if(!validacaoCampos(inputNome, inputEmail, inputCidade )){ 
        alert('Preencha todos os campos!'); return;
    }

    editarUsuario(id, {
        name: inputNome.value.trim(),
        email: inputEmail.value.trim(),
        address: { city: inputCidade.value.trim() }
    });

    renderizarListaUsuarios();
    limparCampos();
    delete btnSalvarEdicao.dataset.id; // limpa o estado
    btnSalvarEdicao.style.display = "none";
};

//-------------------------- EVENTOS --------------------------------
btnCarregarUsuarios.addEventListener('click', async () => {
    if(!usuariosCarregados) carregarUsuarios();
});

btnAdicionarUsuario.addEventListener('click', () => {
    if (validacaoCampos(inputNome, inputEmail, inputCidade)) {
        const novoUsuario = criarUsuario(inputNome.value, inputEmail.value, inputCidade.value);
        adicionarUsuario(novoUsuario);
        renderizarListaUsuarios(usuariosObj);
        limparCampos();
    } else {
        alert("Preencha todos os campos!");
    }
});

btnSalvarEdicao.addEventListener('click', salvarEdicao);

btnBusca.addEventListener('click', () => {
    const valueBusca = inputBusca.value.trim().toLowerCase();

    if(!valueBusca){
        alert('Digite um nome de usuario para buscar!');
        renderizarListaUsuarios(usuariosObj);
        return;
    }
    
    const resultados = buscarUsuariosPorValor(valueBusca);
    if (resultados.length > 0) {
        renderizarListaUsuarios(resultados);
    } else {
        alert("Nenhum usuário encontrado!");
    }
})

/*
function adicionarNovoUsuario(usuariosObj){
    
    
    if(validacaoCampos(inputNome, inputEmail, inputCidade))
    {
        alert("Usuario cadastrado com sucesso!");
        adicionarUsuario(novoUsuarioOBJ);
        renderizarListaUsuarios();
    }
    else {
        alert('Preencha todos os campos!');
    }

    limparCampos()
}

function filtrarUsuario(valueBusca){
    
    const validaValueBusca = usuariosObj.some(usuario =>   
        usuario.name.toLowerCase().includes(valueBusca) || 
        usuario.email.toLowerCase().includes(valueBusca)
          
    );        
    if (validaValueBusca) {
        

        renderizarListaUsuariosFiltro(filtroBusca);
    }        
    else { 
        alert('Nenhum usuário com esse nome ou email encontrado!'); 
    }   
      
}

function renderizarListaUsuariosFiltro(filtroBusca){
    limparLista()
    filtroBusca.forEach((usuario) => {
        const liFiltro = document.createElement("li");
        liFiltro.innerHTML = `Nome: ${usuario.name} - Email: ${usuario.email} - Cidade: ${usuario.address.city}`; 
        liFiltro.classList.add('cssLista');
        listaUsuarios.appendChild(liFiltro);      
    });

}*/















