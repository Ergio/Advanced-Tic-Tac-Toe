import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function calculateWinner(squares, index) {
  let winNumber = 5;
  let rows = 16;
  const lines = [];
  let line = [];
  let rowIndex = Math.floor(index / rows);
  let colIndex = index % rows;
  // horizontal combinations
  for (let j = 0; j < rows; j++) {
    line = []
    if ((j + winNumber) <= rows) {
      for (let k = 0; k < winNumber; k++) {
        line.push(k + j + rowIndex * rows)
      }
      lines.push(line);
    }
  }
  // vertical combinations
  for (let j = 0; j < rows; j++) {
    line = []
    if ((j + winNumber) <= rows) {
      for (let k = 0; k < winNumber; k++) {
        line.push(j * rows + k * rows + colIndex)
      }
      lines.push(line);
    }
  }
  // left diagonal  combinations
  let sdl = colIndex - rowIndex;
  if (sdl < 0) {
    sdl = (-sdl) * rows;
  }
  for (let j = 0; j < rows; j++) {
    line = []
    if ((j + winNumber) <= rows) {
      for (let k = 0; k < winNumber; k++) {
        line.push(sdl + k * rows + k + j * rows + j);
      }
      lines.push(line);
    }
  }
  // right diagonal combinations
  let sdr = rowIndex + colIndex;
  if (sdr >= rows) {
    sdr = (rowIndex + colIndex - (rows - 1)) * rows + (rows - 1);
  }
  for (let j = 0; j < rows; j++) {
    line = []
    if ((j + winNumber) <= rows) {
      for (let k = 0; k < winNumber; k++) {
        line.push(sdr + k * rows - k + j * rows - j);
      }
      lines.push(line);
    }
  }
  // checking
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
      return squares[a];
    }
  }
  return null;
}


class Square extends React.Component {
  render() {
    let className = 'square';
    if (this.props.isNewLine) {
      className += ' newline';
    }
    return (
      <button
        className={className}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 16,
      squares: Array(16 * 16).fill(null),
      xIsNext: true,
      winner: null
    };
  }


  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i]) {
      return;
    }
    if (!this.state.winner) {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
    }
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    if (calculateWinner(squares, i)) {
      this.setState({ winner: calculateWinner(squares, i) });
      return;
    }

  }

  renderSquare(i) {
    let isNewline = false;
    if ((i % this.state.rows) === 0) isNewline = true;
    return <Square key={i} value={this.state.squares[i]} isNewLine={isNewline} onClick={() => this.handleClick(i)} />;
  }

  render() {

    const winner = this.state.winner;
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    var squareList = this.state.squares.map(function (value, index) {

      return (this.renderSquare(index));

    }.bind(this))



    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {squareList}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


