// Espera o conteúdo da página carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Faz a requisição para a API
    fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
        .then(resposta => {
            // Verifica se a resposta da rede foi bem-sucedida
            if (!resposta.ok) {
                throw new Error('Erro de rede: ' + resposta.status);
            }
            // Converte a resposta em JSON
            return resposta.json();
        })
        .then(economia => {
            // Pega o objeto USDBRL de dentro da resposta
            const cotacao = economia.USDBRL;

            // Seleciona os elementos no HTML
            const elValorAtual = document.getElementById('valorAtual');
            const elValorAlto = document.getElementById('valorAlto');
            const elValorBaixo = document.getElementById('valorBaixo');

            // Formata os valores para ter duas casas decimais
            const valorAtual = parseFloat(cotacao.bid).toFixed(2);
            const valorAlto = parseFloat(cotacao.high).toFixed(2);
            const valorBaixo = parseFloat(cotacao.low).toFixed(2);

            // Atualiza o texto no HTML com os valores formatados
            elValorAtual.textContent = `R$ ${valorAtual}`;
            elValorAlto.textContent = `R$ ${valorAlto}`;
            elValorBaixo.textContent = `R$ ${valorBaixo}`;

            // Remove o estilo itálico de "Aguardando..."
            elValorAtual.style.fontStyle = 'normal';
            elValorAlto.style.fontStyle = 'normal';
            elValorBaixo.style.fontStyle = 'normal';
            
        })
        .catch(error => {
            // Trata qualquer erro que ocorra durante o fetch
            console.error('Falha ao buscar cotação:', error);
            document.querySelector('.cotacao-card').innerHTML = 
                "<p style='color: red;'>Não foi possível carregar os dados. Tente novamente.</p>";
        });
});