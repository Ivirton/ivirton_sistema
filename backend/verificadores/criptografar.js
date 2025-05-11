const cifra = {
  criptografar: (texto, deslocamento = 3) => {
    return texto
      .split('')
      .map(char => {
        const codigo = char.charCodeAt(0);

        // Letras maiúsculas
        if (codigo >= 65 && codigo <= 90) {
          return String.fromCharCode(((codigo - 65 + deslocamento) % 26) + 65);
        }

        // Letras minúsculas
        if (codigo >= 97 && codigo <= 122) {
          return String.fromCharCode(((codigo - 97 + deslocamento) % 26) + 97);
        }

        // Outros caracteres (espaço, número, pontuação) permanecem iguais
        return char;
      })
      .join('');
  },

  descriptografar: (texto, deslocamento = 3) => {
    return cifra.criptografar(texto, 26 - (deslocamento % 26));
  }
};

// Teste
const original = "Ivirton Nayron 123!";
const codificado = cifra.criptografar(original);
const decodificado = cifra.descriptografar(codificado);

console.log("Original:      ", original);
console.log("Criptografado: ", codificado);
console.log("Descriptografado:", decodificado);
