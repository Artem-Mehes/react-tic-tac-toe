import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cells: Array(9).fill(null),
            count: 0,
            isGameFinished: false,
            isGameStarted: false,
            isDraw: false,
            winner: null,
            winsScore: {X: 0, O: 0},
            firstPlayer: 'X',
            currentPlayer: 'X'
        };

        this.winLines = [
            [0, 1, 2], 
            [3, 4, 5],  
            [6, 7, 8],  
            [0, 3, 6],  
            [1, 4, 7],  
            [2, 5, 8], 
            [0, 4, 8], 
            [2, 4, 6]  
        ]
    }

    chooseFirstPlayer = event => {
        this.setState({ 
            firstPlayer: event.target.textContent,
            currentPlayer: event.target.textContent,
            isGameStarted: true 
        });
    }

    handleClick = event => {
        if (this.state.isGameFinished) return;

        const data = event.target.getAttribute('data'),
              currentCells = this.state.cells,
              currentSymbol = this.state.currentPlayer;
    
        if ( !currentCells[data] ) {
            currentCells[data] = currentSymbol;
            this.setState({ 
                cells: currentCells,
                count: this.state.count + 1,
                currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X',
                isGameStarted: true
            }); 
        }

        if (this.state.count > 3) {
            this.isGameOver(currentSymbol);
        }
    }

    isGameOver = symbol => {
        this.winLines.forEach(line => {
            if ( line.every(cell => this.state.cells[cell] === symbol) ) {
                    this.setState(prevState => ({ 
                        isGameFinished: true,
                        winner: symbol,
                        winsScore: {
                            ...prevState.winsScore,
                            [symbol]: this.state.winsScore[symbol] + 1
                        }
                    }));
                } else if (this.state.count === 9) {
                    this.setState({
                        isGameFinished: true,
                        isDraw: true
                    });
                }
        });
    }

    startNewGame = () => {
        this.setState({
            isGameFinished: false,
            count: 0,
            cells: Array(9).fill(null),
            isDraw: false,
            winner: null,
            firstPlayer: 'X',
            currentPlayer: 'X',
            isGameStarted: false
        });
    }

    render() {
        let notification;
        let firstPlayer;

        if (this.state.isDraw) {
            notification = 'Draw!'
        } else {
            notification = <> Player <span className="player">{this.state.winner}</span> Wins! </>;
        }
            
        if (this.state.isGameStarted) {
            firstPlayer = <> <h2>Player <span className="player">{this.state.firstPlayer}</span> Goes First!</h2> </> 
        } else {
            firstPlayer = 
                <>
                <h2>Choose Who Goes First</h2>
                    <div className="choose-buttons">
                        <button className="btn choose-btn" onClick={this.chooseFirstPlayer}><span className="player">X</span></button>
                        <button className="btn choose-btn" onClick={this.chooseFirstPlayer}><span className="player">O</span></button>
                    </div>
                </>
        } 
        
        return (
            <>
                <header className="header">
                    <h1 className="heading">Tic-Tac-Toe</h1>
                    {this.state.isGameFinished && 
                    <span className="notification">
                        {notification}
                    </span>}
                </header>

                <main className="main">
                    <div className="choose-first">
                        {firstPlayer}
                    </div>

                    <div className="tic-tac-toe">
                        <span className="cell" onClick={this.handleClick} data="0">{this.state.cells[0]}</span>
                        <span className="cell" onClick={this.handleClick} data="1">{this.state.cells[1]}</span>
                        <span className="cell" onClick={this.handleClick} data="2">{this.state.cells[2]}</span>
                        <span className="cell" onClick={this.handleClick} data="3">{this.state.cells[3]}</span>
                        <span className="cell" onClick={this.handleClick} data="4">{this.state.cells[4]}</span>
                        <span className="cell" onClick={this.handleClick} data="5">{this.state.cells[5]}</span>
                        <span className="cell" onClick={this.handleClick} data="6">{this.state.cells[6]}</span>
                        <span className="cell" onClick={this.handleClick} data="7">{this.state.cells[7]}</span>
                        <span className="cell" onClick={this.handleClick} data="8">{this.state.cells[8]}</span>
                    </div>

                    <div className="score">
                        <h2>Score</h2>
                        <p>Player <span className="player">X</span>: {this.state.winsScore.X}</p>
                        <p>Player <span className="player">O</span>: {this.state.winsScore.O}</p>
                    </div>
                </main>
                
                <footer className="footer">
                    <button className="btn newgame-btn" onClick={this.startNewGame}>Start New Game</button>
                </footer>
            </>
        );
    };
}

export default App;
