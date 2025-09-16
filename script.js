class Counter {
    constructor() {
        this.value = 0;
        this.counterElement = document.getElementById('counter-value');
        this.counterDisplay = document.querySelector('.counter-display');
        
        this.initializeEventListeners();
        this.updateDisplay();
    }
    
    initializeEventListeners() {
        // Botões principais
        document.getElementById('decrease-btn').addEventListener('click', () => {
            this.decrease();
        });
        
        document.getElementById('increase-btn').addEventListener('click', () => {
            this.increase();
        });
        
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.reset();
        });
        
        // Botões de incremento rápido
        document.getElementById('step-5').addEventListener('click', () => {
            this.add(5);
        });
        
        document.getElementById('step-10').addEventListener('click', () => {
            this.add(10);
        });
        
        document.getElementById('step-100').addEventListener('click', () => {
            this.add(100);
        });
        
        // Suporte a teclado
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                case '+':
                case '=':
                    e.preventDefault();
                    this.increase();
                    break;
                case 'ArrowDown':
                case '-':
                    e.preventDefault();
                    this.decrease();
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    this.reset();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.reset();
                    break;
            }
        });
    }
    
    increase() {
        this.value++;
        this.updateDisplay();
        this.animate();
    }
    
    decrease() {
        this.value--;
        this.updateDisplay();
        this.animate();
    }
    
    add(amount) {
        this.value += amount;
        this.updateDisplay();
        this.animate();
    }
    
    reset() {
        this.value = 0;
        this.updateDisplay();
        this.animate();
    }
    
    updateDisplay() {
        this.counterElement.textContent = this.value;
        
        // Adiciona formatação para números grandes
        if (Math.abs(this.value) >= 1000) {
            this.counterElement.textContent = this.value.toLocaleString('pt-BR');
        }
    }
    
    animate() {
        this.counterDisplay.classList.add('animate');
        setTimeout(() => {
            this.counterDisplay.classList.remove('animate');
        }, 300);
    }
    
    // Método para salvar o valor no localStorage
    save() {
        localStorage.setItem('counterValue', this.value.toString());
    }
    
    // Método para carregar o valor do localStorage
    load() {
        const savedValue = localStorage.getItem('counterValue');
        if (savedValue !== null) {
            this.value = parseInt(savedValue, 10);
            this.updateDisplay();
        }
    }
}

// Inicializar o contador quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const counter = new Counter();
    
    // Carregar valor salvo
    counter.load();
    
    // Salvar valor quando a página for fechada
    window.addEventListener('beforeunload', () => {
        counter.save();
    });
    
    // Salvar valor periodicamente (a cada 5 segundos)
    setInterval(() => {
        counter.save();
    }, 5000);
    
    // Adicionar informações de teclado
    const info = document.createElement('div');
    info.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(139, 69, 19, 0.9);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-size: 0.9rem;
            max-width: 200px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
        ">
            <strong>Atalhos de Teclado:</strong><br>
            ↑ / + : Incrementar<br>
            ↓ / - : Decrementar<br>
            R / Esc : Reset
        </div>
    `;
    document.body.appendChild(info);
    
    // Esconder informações após 5 segundos
    setTimeout(() => {
        info.style.opacity = '0';
        info.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            info.remove();
        }, 500);
    }, 5000);
});