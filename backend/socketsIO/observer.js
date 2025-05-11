// Observado (sujeito)
class Observavel {
  constructor() {
    this.observadores = [];
  }

  // Inscrever novo observador
  inscrever(observador) {
    this.observadores.push(observador);
  }

  // Remover observador
  desinscrever(observador) {
    this.observadores = this.observadores.filter(obs => obs !== observador);
  }

  // Notificar todos os observadores
  notificar(dado) {
    this.observadores.forEach(observador => observador.atualizar(dado));
  }
}

// Observador
class Observador {
  constructor(nome) {
    this.nome = nome;
  }

  atualizar(dado) {
    console.log(`[${this.nome}] recebeu os dados:`, dado);
  }
}

// Uso genérico
const sistema = new Observavel();

const observador1 = new Observador("Observador 1");
const observador2 = new Observador("Observador 2");

sistema.inscrever(observador1);
sistema.inscrever(observador2);

sistema.notificar("Nova informação disponível!");

sistema.desinscrever(observador1);

sistema.notificar("Atualização final enviada.");
