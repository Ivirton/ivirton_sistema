const verificar = {
  removerCaracteres: (texto) => {
    // Substitui espaços por hífens (opcional)
    let limpo = texto.replace(/\s+/g, '-');

    // Remove caracteres inválidos para nomes de arquivos (Windows, Linux, Mac)
    limpo = limpo.replace(/[\\/:*?"<>|]/g, '');

    // Remove qualquer caractere que não seja letra, número ou hífen (remove underline também)
    limpo = limpo.replace(/[_]/g, '');

    return limpo;
  }
};

export default verificar;

// console.log(verificar.removerCaracteres("Ivirton_NAYRON: teste*arquivo?.txt"));
