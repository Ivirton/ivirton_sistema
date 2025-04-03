class CronometroEntity {
    constructor() {
        this.ativo = null,
        this.interval = null
        this.minuto = 0
        this.segundo = 0
        this.duracao = 0
        this.tipo = 0
        this.idTransmissao = undefined
    }
    contagemProgressiva() {

        if (this.transmisao.minuto === this.transmisao.duracao) {
            this.transmisao.minuto = 0
            this.transmisao.segundo = 0
            // enviarMensagemSocket(this.transmisao.id_transmissao, "id_cronometro", this.transmisao.id_cronometro, "minuto", this.transmisao.minuto)
            // enviarMensagemSocket(this.transmisao.id_transmissao, "id_cronometro", this.transmisao.id_cronometro, "segundo", this.transmisao.segundo)
        }
        else {
            if (this.transmisao.segundo === 59) {
                this.transmisao.minuto++;
                this.transmisao.segundo = 0;
                //   enviarMensagemSocket(this.transmisao.id_transmissao, "id_cronometro", this.transmisao.id_cronometro, "minuto", this.transmisao.minuto);
            } else {
                this.transmisao.segundo++
            }
            // enviarMensagemSocket(this.transmisao.id_transmissao, "id_cronometro", this.transmisao.id_cronometro, "segundo", this.transmisao.segundo);
        }
    }
    contagemRegressiva() {
        if (!this.ativo && this.minuto === 0 && this.segundo === 0) {
            this.minuto = this.duracao
            this.segundo = 0
        }
        if (this.minuto === 0 && this.segundo === 0) {
            this.stop();
        } else {
            if (this.ativo) {
                if (this.segundo === 0) {
                    if (this.minuto !== 0) {
                        this.minuto--;
                        this.segundo = 59;
                        // enviarMensagemSocket(this.transmisao.id_transmissao, "id_cronometro", this.transmisao.id_cronometro, "minuto", this.transmisao.minuto);
                    }
                } else {
                    this.segundo--;
                    // enviarMensagemSocket(this.transmisao.id_transmissao, "id_cronometro", this.transmisao.id_cronometro, "segundo", this.transmisao.segundo);
                }
            }
        }
    }
    pause(){
        clearInterval(this.interval);
        this.icone = false
        this.ativo = false;
    }
    play() {
        this.interval = setInterval(() => {
            if (this.tipo === 0) {
                this.contagemProgressiva();
                this.ativo = true;
            } else {
                this.contagemRegressiva();
                this.ativo = true;
            }
        }, 1000);
    }
    stop() {
        clearInterval(this.interval);
        this.minuto = 0
        this.segundo = 0
        this.ativo = false;
        // enviarMensagemSocket(this.transmisao.id_transmissao, "id_cronometro", this.transmisao.id_cronometro, "minuto", this.transmisao.minuto)
        // enviarMensagemSocket(this.transmisao.id_transmissao, "id_cronometro", this.transmisao.id_cronometro, "segundo", this.transmisao.segundo)

    }
}