class Calculadora {

    constructor() {
        this.nrVisor = '0';
        this.ptDecimal = false;
        this.iniciouSegundo = false;
        this.memTemp = '';
        this.estadoErro = false;
        this.memoria = 0;
        this.op = {
            NOP: 0,
            DIV: 1,
            MULT: 2,
            SUB: 3,
            SUM: 4
        };
        this.opAtual = this.op.NOP;
        this.simboloOperacao = ''; 
    }

    mostrarVisor() {
        if (this.estadoErro) {
            this.nrVisor = '0';
            return 'ERRO!';
        }
        if (this.nrVisor.length == 0) {
            this.nrVisor = '0';
        }
        let visor = '';
        visor += this.nrVisor;
        if (this.simboloOperacao !== '' && this.memTemp !== '') {
            visor = this.memTemp + ' ' + this.simboloOperacao + ' ' + this.nrVisor;
        }
        return visor;
    }

    digito(dig) {
        if (this.estadoErro) return;
        if (dig.length != 1) return;
        if ((dig < '0' || dig > '9') && dig != '.') return;
        if (!this.iniciouSegundo && this.opAtual != this.op.NOP) {
            this.iniciouSegundo = true;
            this.ptDecimal = false;
            this.nrVisor = '0';
        }
        if (this.nrVisor.length == 10) return;
        if (dig == '.') {
            if (this.ptDecimal) return;
            this.ptDecimal = true;
        }
        if (this.nrVisor == '0') {
            this.nrVisor = dig == '.' ?  '0.' : dig;
        } else {
            this.nrVisor += dig;
        }
    }
    defineOperacao(op) {
        if (this.estadoErro) return;
        switch (op) {
            case '+':
                this.opAtual = this.op.SUM;
                this.simboloOperacao = "+";
                break;
            case '-':
                this.opAtual = this.op.SUB;
                this.simboloOperacao = "-"; 
                break;
            case '*':
                this.opAtual = this.op.MULT;
                this.simboloOperacao = "x"; 
                break;
            case '/':
                this.opAtual = this.op.DIV;
                this.simboloOperacao = "/"; 
                break;
        }
        this.memTemp = this.nrVisor;
    }

    igual() {
        if (this.estadoErro) return;
        if (this.opAtual == this.op.NOP) return;
        let num1 = parseFloat(this.memTemp);
        let num2 = parseFloat(this.nrVisor);
        let resultado = 0;
        switch (this.opAtual) {
            case this.op.DIV:
                if (num2 == 0) {
                    this.estadoErro = true;
                    return;
                }
                resultado = num1/num2;
                break;
            case this.op.MULT:
                resultado = num1*num2;
                break;
            case this.op.SUB:
                resultado = num1 - num2;
                break;
            case this.op.SUM:
                resultado = num1 + num2;
                break;
        }
        this.opAtual = this.op.NOP;
        this.iniciouSegundo = false;
        this.ptDecimal = false;
        this.memTemp = '';
        this.nrVisor = String(resultado).slice(0, 10);
    }

    teclaC() {
        this.nrVisor = '0';
        this.ptDecimal = false;
        this.iniciouSegundo = false;
        this.opAtual = this.op.NOP;
        this.memTemp = '';
        this.estadoErro = false;
        this.simboloOperacao = '';

        if (this.nrVisor === '-0') {
            this.nrVisor = '0';
            }
    }

    teclaMmais() {
        if (this.estadoErro) return;
        this.memoria += parseFloat(this.nrVisor);
    }

    teclaMmenos() {
        if (this.estadoErro) return;
        this.memoria -= parseFloat(this.nrVisor);
    }

    teclaRM() {
        if (this.estadoErro) return;
        this.nrVisor = String(this.memoria);
    }

    teclaCLM() {
        if (this.estadoErro) return;
        this.memoria = 0;
    }
    teclaRaiz() {
        if (this.estadoErro) return; 
        let numVisor = parseFloat(this.nrVisor); 
        if (numVisor < 0) { 
            this.estadoErro = true;
            return;
        }
        this.nrVisor = Math.sqrt(numVisor).toString().slice(0, 10); 
    }

    teclaPorcentagem() {
        if (this.estadoErro) return; 
        let numVisor = parseFloat(this.nrVisor); 
        if (isNaN(numVisor)) { 
            this.estadoErro = true;
            return;
        }
        let porcentagem = (parseFloat(this.memTemp) * numVisor) / 100; 
        this.nrVisor = porcentagem.toString().slice(0, 10); 
        atualizaVisor(); 
    }
    teclaQuadrado() {
        if (this.estadoErro) return; 
        let numVisor = parseFloat(this.nrVisor); 
        this.nrVisor = (numVisor * numVisor).toString().slice(0, 10); 
        atualizaVisor(); 
    }

    teclaInverso() {
        if (this.estadoErro) return; 
         let numVisor = parseFloat(this.nrVisor); 
         if (numVisor == 0) { 
         this.estadoErro = true;
         return;
     }
         this.nrVisor = (1 / numVisor).toString().slice(0, 10);
  
     }

     teclaInversaoDeSinal(){
        if (this.estadoErro) return; 
    	let numVisor = parseFloat(this.nrVisor); 
    	this.nrVisor = (-numVisor).toString().slice(0, 10); 
    }

    teclaOFF() {
        this.nrVisor = ' ';
        this.ptDecimal = false;
        this.iniciouSegundo = false;
        this.memTemp = '';
        this.estadoErro = false;
        this.memoria = 0;
        this.opAtual = this.op.NOP;
        this.simboloOperacao = ''; 
    }

    teclaON() {
        this.nrVisor = '0';
        this.ptDecimal = false;
        this.iniciouSegundo = false;
        this.memTemp = '';
        this.estadoErro = false;
        this.memoria = 0;
        this.opAtual = this.op.NOP;
        this.simboloOperacao = ''; 
    }
}

let atualizaVisor = () => {
    document.getElementById('visor-id').innerHTML = calculadora.mostrarVisor();
}

let digito = (dig) => {
    calculadora.digito(dig);
    atualizaVisor();
}

let defOp = (op) => {
    if (calculadora.opAtual != calculadora.op.NOP) {
        defIgual();
        atualizaVisor();
    }
    calculadora.defineOperacao(op);
}

let defIgual = () => {
    calculadora.igual();
    atualizaVisor();
}

let teclaC = () => {
    calculadora.teclaC();
    atualizaVisor();
}

let teclaMmais = () => {
    calculadora.teclaMmais();
}

let teclaMmenos = () => {
    calculadora.teclaMmenos();
}

let teclaRM = () => {
    calculadora.teclaRM();
    atualizaVisor();
}

let teclaCLM = () => {
    calculadora.teclaCLM();
}

let teclaRaiz = () => {
    calculadora.teclaRaiz();
    atualizaVisor();
}

let teclaPorcentagem = () => {
    calculadora.teclaPorcentagem();
    atualizaVisor();
}

let teclaQuadrado = () => {
    calculadora.teclaQuadrado();
    atualizaVisor();
}

let teclaInverso= () => {
    calculadora.teclaInverso();
    atualizaVisor();
}
    
let teclaInversaoDeSinal = () => {
    calculadora.teclaInversaoDeSinal();
    atualizaVisor();
}

let teclaOFF = () => {
    calculadora.teclaOFF();
    atualizaVisor();
}

let teclaON = () => {
    calculadora.teclaON();
    atualizaVisor();
}
let calculadora = new Calculadora();