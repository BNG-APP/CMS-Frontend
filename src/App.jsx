import { Button } from "@material-ui/core";
import { useState } from "react";
import "./App.css";
import AddGame from "./Component/AddGame";
import GameTable from "./Component/GameTable";

function App() {
  const [addGame, setAddGame] = useState(false);

  const onHandleAdd = () => {
    setAddGame(true);
  };
  return (
    <div className="m-4 p-4 ">
      <div className="flex justify-between my-2">
        <div onClick={() => setAddGame(false)}>XGames</div>
        <Button variant="contained" onClick={onHandleAdd}>
          ADD GAME
        </Button>
      </div>
      {addGame ? <AddGame /> : <GameTable />}
    </div>
  );
}

export default App;
