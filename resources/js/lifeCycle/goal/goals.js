

class Goals {
    constructor(goals = []) {
        this.goals = [];

        // Create goals
        for (let i = 0; i < goals.length; i++) {
            const goal = goals[i];
            this.goals.push(new Goal(goal, i));
        }
    }

    getGoals() {
        return this.goals;
    }
    getGoalsText() {
        var txt = '';
        for (const goal of this.getGoals()) {
            txt += goal.getGoal() + '\n';
        }
        return txt.slice(0, txt.length - 1);
    }

    validator() {
        var allDone = true;
        for (const goal of this.getGoals()) {
            if (goal.state == 0) {
                allDone = false;
            }
        }
        return allDone;
    }

    accomplishAllGoals() {
        var newGoals = [];
        for (const goal of this.getGoals()) {
            goal.state = 1;
            newGoals.push(goal);
        }

        this.goals = newGoals;
    }
    accomplishGoal(id) {
        var newGoals = [];
        for (const goal of this.getGoals()) {
            if(goal.getId() == id) {
                goal.state = 1;
            }
            newGoals.push(goal);
        }

        this.goals = newGoals;
    }


    addGoal(desc) {
        this.goals.push(new Goal(desc, this.goals.length));
    }

}

window.Goals = Goals;