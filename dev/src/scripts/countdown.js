// Configuração do Cronômetro de Lançamento
document.addEventListener('DOMContentLoaded', () => {
    // Define a data de lançamento (30 dias a partir de agora para demonstração)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    launchDate.setHours(0, 0, 0, 0);

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;

        // Cálculos de tempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Atualização do DOM
        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        // Se o tempo acabar
        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown').innerHTML = "<p class='badge'>LANÇADO!</p>";
        }
    };

    // Atualiza a cada segundo
    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Chamada inicial
});
