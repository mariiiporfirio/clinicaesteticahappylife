
document.getElementById('buscar').addEventListener('click', function() {
    const cep = document.getElementById('cep').value;
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.querySelector('input[name="logradouro"]').value = data.logradouro;
                    document.querySelector('input[name="bairro"]').value = data.bairro;
                    document.querySelector('input[name="cidade"]').value = data.localidade;
                    document.querySelector('input[name="uf"]').value = data.uf;
                } else {
                    alert('CEP não encontrado!');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                alert('Erro ao buscar o CEP!');
            });
    } else {
        alert('Por favor, insira um CEP válido!');
    }
});
