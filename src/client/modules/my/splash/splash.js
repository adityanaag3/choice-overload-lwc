import { LightningElement } from 'lwc';

export default class Splash extends LightningElement {
    disabled = false;
    buttonLabel = 'Join Game';
    buttonEle;

    renderedCallback() {
        if (!this.buttonEle) {
            this.buttonEle = this.template.querySelector('.button');
        }
    }

    handleClick(e) {
        const event = new CustomEvent('stagechange', {
            detail: { name: e.currentTarget.dataset.theme }
        });
        this.dispatchEvent(event);
    }

    startNewGame() {
        // eslint-disable-next-line no-alert
        let secretPin = prompt("Enter host secret pin");
        if(secretPin === 'iamhost'){
            fetch('/api/createsession')
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        sessionStorage.setItem('session_id', data.sessionId);
                        sessionStorage.removeItem('oldpick');
                        const event = new CustomEvent('stagechange', {
                            detail: { stage: 'WAITING', host: true }
                        });
                        this.dispatchEvent(event);
                    }
                });
        }
    }

    validateGameKey() {
        const gamekey = this.template.querySelector('.gamecode').value;
        const playername = this.template.querySelector('.playername').value;
        if (
            gamekey &&
            gamekey.trim().length > 0 &&
            playername &&
            playername.trim().length > 0
        ) {
            this.disabled = true;
            this.buttonLabel = 'Please wait...';
            sessionStorage.setItem('player_name', playername);
            fetch(
                '/api/joinsession?id=' +
                    encodeURIComponent(gamekey) +
                    '&player_name=' +
                    encodeURIComponent(playername)
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.player_id) {
                        sessionStorage.setItem('player_id', data.player_id);
                    }
                    if (data.success) {
                        sessionStorage.removeItem('score');
                        const event = new CustomEvent('stagechange', {
                            detail: { stage: 'WAITING', host: false }
                        });
                        this.dispatchEvent(event);
                    } else {
                        this.buttonEle.classList.add('animate');
                        this.disabled = false;
                        this.buttonLabel = 'Start Game';
                        setTimeout(() => {
                            this.buttonEle.classList.remove('animate');
                        }, 1000);
                    }
                });
        } else {
            this.buttonEle.classList.add('animate');
            this.disabled = false;
            this.buttonLabel = 'Join Game';
            setTimeout(() => {
                this.buttonEle.classList.remove('animate');
            }, 1000);
        }
    }
}
