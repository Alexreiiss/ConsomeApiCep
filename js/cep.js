// Função para buscar o endereço com base no CEP
document.getElementById('cep').addEventListener('blur', function() {
    let cep = this.value.replace(/\D/g, '');

    if (cep !== "") {
        // Expressão regular para validar o formato do CEP
        let validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {
            // Fazendo a requisição para a API ViaCEP
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na consulta do CEP');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.erro) {
                        alert('CEP não encontrado.');
                        limparFormulario();
                        return;
                    }

                    // Preenchendo os campos do formulário automaticamente
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('uf').value = data.uf;

                    // Bloquear os campos preenchidos automaticamente
                    bloquearCampos(true);
                })
                .catch(error => {
                    console.error('Erro ao buscar o CEP:', error);
                    limparFormulario();
                });
        } else {
            alert('Formato de CEP inválido.');
            limparFormulario();
        }
    } else {
        limparFormulario();
    }
});

// Função para limpar os campos do formulário
function limparFormulario() {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';

    // Desbloquear os campos, caso tenham sido bloqueados anteriormente
    bloquearCampos(false);
}

// Função para bloquear ou desbloquear os campos
function bloquearCampos(status) {
    document.getElementById('logradouro').disabled = status;
    document.getElementById('bairro').disabled = status;
    document.getElementById('cidade').disabled = status;
    document.getElementById('uf').disabled = status;
}
