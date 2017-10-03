
const playersVar = [
    {
      name: "Kely Vargaya",
      score: 50,
    },
    {
      name: "Yoselin Vargaya",
      score: 20,
    },
    {
      name: "Fernanda Vargaya",
      score: 31,
    },
];

class Model {
  constructor(players) {
    this.players = players;
    this.callback = null;
    this.addPlayer = null;
  }

  subscribe(render) {
    this.callback = render;
  }

  notify() {
    this.callback();
  }

  agregarPlayer(names) {
    this.players.push({
      name: names.value,
      score: 0,
      id: this.players.length + 1
    })
    this.notify();
  }

  CounterDis(player) {
    player.score--;
    this.notify();
  }

  CounterMas(player) {
    player.score++;
    this.notify();
  }

  totalPoints() {
    return this.players.map(item => item.score).reduce((total, item) => total + item);
  }
 
}

 const Header = ({model}) => {
  return (
    <div className="header">
      <Stats players={model.players} />
      <h1>Scoreboard</h1>
      <Stopwatch />
    </div>
  );
}

function Stats(model) {
  const playerCount = model.players.length;
  const totalPoints = model.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{playerCount}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>

    </table>
  )
}

 const Stopwatch = () =>  {
    return (
      <div className="stopwatch" >
        <h2>Stopwatch</h2>
        <div className="stopwatch-time"> 0 </div>
          <button>Start</button>
        <button>Reset</button>
      </div>
    )
  };

/*
function Counter(props) {
  return (
    <div className="counter" >
      <button className="counter-action decrement" onClick={() => props.onChange(-1)}>
        -
      </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={() => props.onChange(1)}>
        +
      </button>
    </div>
  );
}
*/

const Counter = ({ player }) => {
  return (
    <div className='player' key={player.id}>
      <div className='player-name'>{player.name}</div>
      <div className='player-score counter'>
        <button className='counter-action decrement' onClick={player.score ? () => model.CounterDis(player) : ''}>
          -
        </button>
        <span className='counter-score'>{player.score}</span>
        <button className='counter-action increment' onClick={() => model.CounterMas(player)}>
          +
        </button>
      </div>
    </div>
  );
}


const PlayerList = ({ model }) => {
  return (
    <div>
      {
        model.players.map(player => {
          return <Counter player={player} />
        })
      }
    </div>
  );
}

const AddPlayerForm = ({ model }) => {
  return (
    <div className='add-player-form'>
      <form onSubmit={e => {
        e.preventDefault();
        model.agregarPlayer(model.addPlayer);
      }}
      >
        <input type="text"  
               onChange = {e => (model.addPlayer = e.target)} 
               placeholder="Player Name"
        />
        <input type="submit" 
               value='add player' 
               
        />
      </form>
    </div>
  );
}

const Scoreboard = ({ model }) => {
  return (
    <div className='scoreboard'>
      <Header model={model} />
      <PlayerList model={model} />
      <AddPlayerForm model={model} />
    </div>
  );
}


  let model = new Model(playersVar);
  let render = () => {
      ReactDOM.render(
        <Scoreboard title="ScoreBoard" model={model} />,
         document.getElementById('container')
     );
   };

  model.subscribe(render);

     render(); 