

document.getElementById('buscar-btn').addEventListener('click', () => {
  
  const cidade = document.getElementById('cidade-input').value;

  
  if (!cidade) {
    alert('Por favor, digite o nome de uma cidade.');
    return; 
  }
  
  
  const containerTempo = document.getElementById('info-tempo');
  containerTempo.innerHTML = 'Carregando informações...';
  
  
  fetch(`/tempo?cidade=${encodeURIComponent(cidade)}`)
    .then(response => response.json())
    .then(data => {
      
      if (data.cod === 200) {
        const temperatura = data.main.temp;
        const descricao = data.weather[0].description;
        const icone = data.weather[0].icon;
        const nomeCidade = data.name;

        containerTempo.innerHTML = `
          <h3>Tempo em ${nomeCidade}</h3>
          <img src="https://openweathermap.org/img/wn/${icone}@2x.png" alt="Ícone do tempo">
          <p><strong>Temperatura:</strong> ${temperatura.toFixed(1)} °C</p>
          <p><strong>Clima:</strong> ${descricao}</p>
        `;
      } else {
        
        containerTempo.innerHTML = `<p>Não foi possível encontrar dados para "${cidade}". Tente novamente.</p>`;
      }
    })
    .catch(error => {
      console.error("Erro:", error);
      containerTempo.innerHTML = `<p>Houve um erro na comunicação com nosso servidor.</p>`;
    });
})