import { LightningElement, api, track } from 'lwc';

export default class Game extends LightningElement {
    @api gameObj;
    @api isHost;

    chosenAnswers = [];

    player_id;
    player_name;

    @track players = [];

    answerRevealed = false;

    score = 0;
    @track scorePlayers;

    es;

    connectedCallback() {
        this.player_id = sessionStorage.getItem('player_id');
        this.player_name = sessionStorage.getItem('player_name');
        // eslint-disable-next-line radix
        this.score = parseInt(sessionStorage.getItem('score')) || 0;

        this.es = new EventSource('/api/stream');

        this.es.onmessage = (ev) => {
            let event = JSON.parse(ev.data);
            if (event.type === 'answerselected') {
                this.players = event.value;
            }
            if (event.type === 'answerrevealed') {
                this.answerRevealed = true;
                this.calculateScore();
            }
            if (event.type === 'scoreupdated') {
                this.scorePlayers = undefined;
                const updatedList = event.value.sort((a, b) => b.score - a.score);
                this.scorePlayers = updatedList;
            }
            if (event.type === 'backtowaiting' && !this.isHost) {
                const sce = new CustomEvent('stagechange', {
                    detail: { stage: 'WAITING', host: false }
                });
                this.dispatchEvent(sce);
            }
        };

        this.answerRevealed = false;
    }

    disconnectedCallback(){
        this.es.close();
    }

    selectAnswer(e) {
        if (!this.isHost) {
            const index = this.chosenAnswers.indexOf(
                e.currentTarget.dataset.key
            );
            if (index > -1) {
                this.chosenAnswers.splice(index, 1);
            } else {
                this.chosenAnswers.push(e.currentTarget.dataset.key);
            }

            fetch(
                '/api/saveAnswer?player_name=' +
                    encodeURIComponent(this.player_name) +
                    '&answers=' +
                    JSON.stringify(this.chosenAnswers)
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        }
    }

    get choiceOptions() {
        let options = [];
        if (this.gameObj) {
            this.gameObj.options.forEach((element) => {
                let playersWhoSelected = [];
                this.players.forEach((el) => {
                    if (el.answers.includes(element.id)) {
                        playersWhoSelected.push(el.player_name.substring(0, 2));
                    }
                });

                let classList = 'answer';
                if (this.chosenAnswers.includes(element.id)) {
                    classList += ' selected';
                }
                if (this.answerRevealed) {
                    if (this.gameObj.ans.includes(element.id)) {
                        classList += ' correct';
                    }
                }
                let optionsObj = {
                    ...element,
                    playersWhoSelected,
                    classList
                };
                options.push(optionsObj);
            });
        }
        return options;
    }

    chooseAnotherTheme() {
        fetch('/api/backtowaiting')
            .then((response) => response.json())
            .then(() => {
                const event = new CustomEvent('stagechange', {
                    detail: { stage: 'THEME' }
                });
                this.dispatchEvent(event);
            });
    }

    revealAnswer() {
        fetch('/api/revealanswers')
            .then((response) => response.json())
            .then(() => {
                this.answerRevealed = true;
            });
    }

    calculateScore() {
        let numCorrect = 0;
        if(this.chosenAnswers.length === this.gameObj.ans.length){
            this.chosenAnswers.forEach((element) => {
                if (this.gameObj.ans.includes(element)) {
                    numCorrect++;
                }
            });
        }
        if(numCorrect === this.gameObj.ans.length){
            this.score += (10 * this.gameObj.ans.length);
            sessionStorage.setItem('score', this.score);
        }
        fetch(
            '/api/savescore?player_name=' +
                encodeURIComponent(this.player_name) +
                '&score=' +
                this.score +
                '&player_id=' +
                this.player_id
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }

    get hostOrRevealed() {
        return this.isHost || this.answerRevealed;
    }
}
