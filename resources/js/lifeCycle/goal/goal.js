
class Goal {

    constructor(goal, id, state = 0) {
        this.id    = id;
        this.goal  = goal;
        this.state = state;
    }

    getId() {
        return this.id;
    }
    getGoal() {
        return this.goal;
    }
    getState() {
        return this.state;
    }

    getStateText() {
        return (this.state == 0) ? 'Unacomplished' : 'Acomplished';
    }

    getGoalText() {
        return this.getGoal() + ' (id:' + this.getId() + ',status:' + this.getState() + ')';
    }


}

window.Goal = Goal;