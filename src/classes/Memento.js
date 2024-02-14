export default class Memento {
    state = 0;

    getState() {
        return this.state;
    }

    addToState(value) {
        this.state += parseFloat(value);
    }

    subFromState(value) {
        this.state -= parseFloat(value);
    }

    clearState() {
        this.state = 0;
    }
}
