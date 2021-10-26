import { LightningElement } from 'lwc';

export default class App extends LightningElement {
    currentStage = 'SPLASH';
    gameObj;
    isHost = false;

    get isSplash() {
        return this.currentStage === 'SPLASH';
    }

    get isWaiting() {
        return this.currentStage === 'WAITING';
    }

    get isTheme() {
        return this.currentStage === 'THEME';
    }

    get isGame() {
        return this.currentStage === 'GAME';
    }

    handleStageChange(event) {
        this.currentStage = event.detail.stage;
        if (event.detail.gameObj) {
            this.gameObj = event.detail.gameObj;
        }
        if (event.detail.host) {
            this.isHost = true;
        }
    }
}
