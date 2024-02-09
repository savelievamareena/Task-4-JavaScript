export default class Memento {
    state = 0;

    getState() {
        return this.state;
    }

    addToState(value) {
        this.state +=  value;
    }

    subFromState(value) {
        this.state -= value;
    }

    clearState() {
        this.state = 0;
    }
}