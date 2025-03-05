// Importações e configuração do Firebase
// const { initializeApp } = require('firebase/app');
// const { getDatabase, ref, set, get, update, remove, child } = require('firebase/database');
// const transmissao = require('../../../model/transmissao');
// const firebaseConfig = require('./firebaseConfig');


// // Inicializa Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);



// Leitura de dados
// async function find(local) {
//     try {
//         const snapshot = await get(child(ref(db), local));
//         if (snapshot.exists()) {
           
//             data = snapshot.val()
//             console.log(data);
//         } else {
//             console.log('Nenhum dado encontrado!');
//         }
//     } catch (error) {
//         console.error('Erro ao buscar placar:', error);
//     }
// }

// Atualização de dados
// async function updated(local,novoValor) {
//     try {
//         await update(ref(db, local), novoValor);
//         console.log('atualizado com sucesso!');
//     } catch (error) {
//         console.error('Erro ao atualizar :', error);
//     }
// }

// Exclusão de dados
// async function delet(local) {
//     try {
//         await remove(ref(db, local));
//         console.log('Placar removido com sucesso!');
//     } catch (error) {
//         console.error('Erro ao remover ', error);
//     }
// }

async function create(key, data) {
    try {
        await set(ref(db, `transmissao/${key}`), data);
        console.log('documeton criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar documetno:', error);
    }
}



(async () => {
    // await createPlacar({ visibilidade: true });
    const t1 = transmissao;
    t1.nome = `equipe1`
    await create(t1.nome,t1)
    
    


//    await buscarDocumento(1);
})();
