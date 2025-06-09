let selectedIndex = null;
let currentMode = 'raster';

// Textos dos seletores para cada modo
const selectorTexts = {
    raster: [
        "Introdução",
        "O mundo 3D",
        "Tudo são Triângulos",
        "Projeção para 2D",
        "Preenchendo os Pixels",
        "Sombreamento",
        "A Imagem Final"
    ],
    rtx: [
        "Câmera e Raios",
        "Interseção com Objetos",
        "Reflexão e Refração",
        "Sombras Realistas",
        "Materiais e Luz",
        "Imagem Final"
    ],
    path: [
        "Raios Aleatórios",
        "Múltiplos Saltos",
        "Iluminação Global",
        "Ruído e Amostragem",
        "Convergência",
        "Imagem Final"
    ]
};

// Conteúdo do contentBox para cada modo e seletor
const contentBoxTexts = {
    raster: [
        "A rasterização é a técnica mais utilizada em gráficos de tempo real, como em videogames. Seu foco principal é a velocidade, convertendo modelos 3D em uma imagem 2D de forma rápida e eficiente. Ela funciona projetando os objetos da cena em uma grade de pixels e depois pintando esses pixels para formar a imagem final.",
        "Tudo começa com uma cena tridimensional construída no computador. Esta cena é um ambiente virtual completo, contendo os modelos dos objetos (personagens, cenários, etc.), as fontes de luz que irão iluminá-los e uma câmera virtual, que define o ponto de vista a partir do qual a cena será vista.",
        "Para que o computador possa processar a geometria dos objetos 3D, eles são decompostos em uma malha de polígonos, quase sempre triângulos. Modelos complexos podem ser formados por milhões desses pequenos triângulos. Quanto mais triângulos, maior o detalhe do objeto.",
        "O computador pega as coordenadas 3D dos vértices (os cantos) de cada triângulo e as converte em coordenadas 2D na tela. É como tirar uma foto: os objetos que estão mais longe parecem menores, e a perspectiva é aplicada para criar a ilusão de profundidade.",
        "Após projetar os triângulos na tela 2D, o processo de rasterização propriamente dito começa. O sistema identifica quais pixels da tela estão dentro dos limites de cada triângulo. Esses pixels são então marcados para serem coloridos, um processo semelhante a uma pintura digital por números.",
        "Nesta etapa, cada pixel marcado recebe sua cor final. Um programa chamado shader calcula essa cor com base em vários fatores: a cor base do objeto (textura), como a luz o atinge, se ele está em uma sombra e outras propriedades do material, como o quão brilhante ou fosco ele é.",
        "Finalmente, todos os pixels coloridos de todos os triângulos da cena são combinados no framebuffer (uma memória de imagem). Esta imagem completa é então enviada para o seu monitor. Para criar a ilusão de movimento, todo esse processo é repetido de 30 a mais de 100 vezes por segundo."
    ],
    rtx: [
        "O Ray Tracing, ou Traçado de Raios, é uma técnica que simula o comportamento físico da luz para criar imagens com um nível de realismo impressionante. Em vez de projetar objetos na tela, ela traça o caminho dos raios de luz da câmera para a cena, calculando interações complexas como reflexos, sombras e refrações com alta fidelidade.",
        "O processo começa na câmera virtual. Para cada pixel da sua tela, um raio de luz primário é disparado em linha reta para dentro da cena 3D. A direção desse raio é determinada pela posição do pixel na tela e pela perspectiva da câmera.",
        "O sistema, então, calcula o caminho de cada raio para determinar qual objeto na cena ele atinge primeiro. Esse cálculo de intersecção é um dos passos mais importantes e computacionalmente intensos do Ray Tracing, pois precisa ser feito para milhões de raios.",
        "Uma vez que um raio atinge um objeto, o trabalho não termina. Para determinar se aquele ponto está iluminado, novos raios, chamados 'raios de sombra', são disparados em direção a cada fonte de luz na cena. Se um desses raios for bloqueado por outro objeto no caminho, o ponto está em sombra.",
        "Se o material do objeto atingido for reflexivo (como um espelho) ou transparente (como vidro ou água), novos raios são gerados a partir do ponto de intersecção. Raios de reflexão ricocheteiam na superfície, e raios de refração passam através dela, mudando de direção. Esse processo pode se repetir várias vezes, criando reflexos de reflexos.",
        "A cor final do pixel é calculada com base em todas as informações coletadas. Isso inclui a cor e a textura do material do objeto, a quantidade de luz direta que ele recebe, e a luz vinda dos reflexos e refrações. A combinação de todos esses elementos resulta em uma iluminação extremamente natural.",
        "Após calcular a cor para cada pixel traçando seus respectivos raios, a imagem final é montada. O resultado é visualmente impressionante, com sombras suaves e precisas, reflexos cristalinos e iluminação que interage de forma convincente com todo o ambiente, algo muito difícil de alcançar com a rasterização."
    ],
    path: [
        "O Path Tracing, ou Traçado de Caminhos, é uma forma avançada e imparcial de Ray Tracing. Seu objetivo é o fotorrealismo total. Para isso, ele simula o caminho completo que a luz percorre pela cena, incluindo a forma como ela ricocheteia em múltiplas superfícies antes de chegar à câmera, resultando na iluminação mais natural possível.",
        "Diferente do Ray Tracing básico, que pode usar apenas um raio por pixel, o Path Tracing dispara centenas ou até milhares de raios para cada pixel individual. Esses raios são enviados em direções ligeiramente diferentes dentro da área daquele pixel para amostrar a cena de forma mais completa.",
        "Cada raio disparado viaja pela cena e, ao atingir uma superfície, ricocheteia em uma direção aleatória, simulando como os fótons de luz se espalham no mundo real. O raio continua seu caminho, ricocheteando várias vezes e coletando informações de cor a cada salto, até atingir uma fonte de luz ou seu limite de 'vida'.",
        "Ao simular esses caminhos complexos, o Path Tracing captura naturalmente a 'iluminação global'. Isso inclui a iluminação indireta, que é a luz que não vem diretamente de uma fonte, mas que foi refletida por outras superfícies (como a luz do sol que ilumina um quarto inteiro ao entrar pela janela e refletir nas paredes).",
        "Um efeito realista capturado pelo Path Tracing é o 'sangramento de cor' (color bleeding). Se uma luz branca atinge uma parede vermelha, a luz refletida por essa parede terá um tom avermelhado, influenciando a cor dos objetos próximos. O Path Tracing simula esse fenômeno de forma precisa e automática.",
        "Como milhares de caminhos de luz são traçados para cada pixel, e cada caminho pode ter um resultado de cor ligeiramente diferente, a cor final do pixel é calculada tirando a média de todos os resultados. No início, a imagem parece 'granulada' ou com ruído, mas conforme mais caminhos são calculados, a imagem converge para um resultado limpo e suave.",
        "Devido à sua imensa exigência computacional, o Path Tracing é usado principalmente em produções onde a qualidade é mais importante que a velocidade, como em efeitos visuais para filmes, animações e renderizações de arquitetura. O resultado são imagens que podem ser praticamente indistinguíveis de fotografias reais."
    ]
};

function updateSelectors() {
    const selectors = document.querySelectorAll('#worksContent [id^="selector"]');
    selectorTexts[currentMode].forEach((text, idx) => {
        const p = selectors[idx].querySelector('p');
        p.textContent = text;
    });
}

function updateContentBox(idx) {
    const box = document.getElementById('contentBox');
    const p = box.querySelector('p');
    if (idx === null) {
        p.textContent = '';
    } else {
        p.textContent = contentBoxTexts[currentMode][idx];
    }
}

function SelectButton(event) {
    const selectors = Array.from(document.querySelectorAll('#worksContent [id^="selector"]'));
    const clicked = event.currentTarget;
    const clickedIndex = selectors.indexOf(clicked);

    // Se clicar no mesmo botão, fecha todos
    if (selectedIndex === clickedIndex) {
        selectors.forEach(el => el.className = '');
        selectedIndex = null;
        updateContentBox(null);
        return;
    }

    selectedIndex = clickedIndex;

    selectors.forEach((el, idx) => {
        el.className = '';
        if (idx === clickedIndex) {
            el.classList.add('large');
        } else {
            const distance = Math.abs(idx - clickedIndex);
            if (distance === 1) el.classList.add('step1');
            else if (distance === 2) el.classList.add('step2');
            else if (distance === 3) el.classList.add('step3');
            else if (distance === 4) el.classList.add('step4');
            else if (distance === 5) el.classList.add('step5');
            else if (distance >= 6) el.classList.add('step6');
        }
    });

    updateContentBox(clickedIndex);
}

function handleModeButton(event) {
    document.querySelectorAll('.modeBtn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    currentMode = event.currentTarget.dataset.mode;
    selectedIndex = null;
    updateSelectors();
    // Limpa seleções e contentBox
    document.querySelectorAll('#worksContent [id^="selector"]').forEach(el => el.className = '');
    updateContentBox(null);
}

document.addEventListener('DOMContentLoaded', () => {
    // Botões de modo
    document.querySelectorAll('.modeBtn').forEach(btn => {
        btn.addEventListener('click', handleModeButton);
    });
    // Seletores
    document.querySelectorAll('#worksContent [id^="selector"]').forEach(el => {
        el.addEventListener('click', SelectButton);
    });
    // Inicializa textos
    updateSelectors();
});