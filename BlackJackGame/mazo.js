class Mazo {
    constructor() {
        this.cartas = [];
        this.crearMazo();
    }

    crearMazo() {
        const palos = ['♠', '♣', '♦', '♥'];
        const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        this.cartas = [];

        for (let valor of valores) {
        for (let palo of palos) {
            this.cartas.push({ valor, palo });
        }
        }
    /* }
    getCartasMix() {
        return this.cartas = _.shuffle(this.cartas); */

        this.cartas.sort(() => Math.random() - 0.5);
        return this.cartas;
    }

    robarCarta() {
        return this.cartas.pop();
    }
}
