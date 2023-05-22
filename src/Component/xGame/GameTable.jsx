import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TablePagination,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import AddGame from "./AddGame";
import Header from "../../CommonComponent/Header";
import { Navigate, useNavigate } from "react-router-dom";
function createData(number, GameUrl, OperatorID, price) {
  return { number, GameUrl, OperatorID, price };
}
const rows = [
  {
    id: 1,
    type: "html",
    category: "action",
    mode: "portrait",
    operator: ["Ic"],
    gameName: "Phineas And Ferb: Backyard Defense",
    ratings: 4,
    gamePlayed: "11284 Played",
    url: "https://xgcloud.bngrenew.com/games/backyard-defense-phineas-and-ferb/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/backyard_defense.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/backyard_defense.jpg",
    gameDescription:
      "Play the Backyard Defense game and help Phineas and Ferb destroy the zombies that threat to attack their backyard!",
  },
  {
    id: 2,
    type: "html",
    category: "action",
    mode: "landscape",
    operator: ["Libyana"],
    gameName: "Ben 10: Wildvine Shoot",
    ratings: 4,
    gamePlayed: "11172 Played",
    url: "https://xgcloud.bngrenew.com/games/ben10-wildvine-shoot/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/wildvine_shoot.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/wildvine_shoot.jpg",
    gameDescription:
      "Billy Billions drones are invading the city! Hold them off with Wildvine and see how many you can blast before time runs out!",
  },
  {
    id: 3,
    type: "html",
    category: "action",
    mode: "landscape",
    operator: ["Congo"],
    gameName: "Ben 10 : Heatblast Fight",
    ratings: 4,
    gamePlayed: "11938 Played",
    url: "https://xgcloud.bngrenew.com/games/ben10-heatblast-fight/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/heatblast_fight.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/heatblast_fight.jpg",
    gameDescription:
      "In this game you will have to fight Heatblast who can set fire and flames even in water. The streams of fire and water are going to be pushing each other, and in order to win, you have to make sure the flame blast is larger than the water one, and Landscapet the other way around.",
  },
  {
    id: 4,
    type: "html",
    category: "action",
    mode: "landscape",
    operator: ["Ic"],
    gameName: "Adventure Time Angry Betty",
    ratings: 4,
    gamePlayed: "10856 Played",
    url: "https://xgcloud.bngrenew.com/games/adventure-time-angry-betty/index.html",
    gameImage:
      "https://xgcloud.bngrenew.com/icons/adventuretime_angrybetty.jpg",
    bannerImage:
      "https://xgcloud.bngrenew.com/banners/adventuretime_angrybetty.jpg",
    gameDescription:
      "Betty has been infected by a computer virus! Travel inside Ice King's crown with Princess Bubblegum and Marceline to blast away the infected Angry Betty",
  },
  {
    id: 5,
    type: "html",
    category: "action",
    mode: "portrait",
    operator: ["Ic"],
    gameName: "Tom and Jerry: Cats Gone Bats",
    ratings: 4,
    gamePlayed: "10208 Played",
    url: "https://xgcloud.bngrenew.com/games/tom-and-jerry-cats-gone-bats/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/cats_gone_bats.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/cats_gone_bats.jpg",
    gameDescription:
      "The witches retire for the night, and it is up to Tom to guard their prized possessions. However, Vampire Mouse and Jerry has other plans...",
  },
  {
    id: 6,
    type: "html",
    category: "action",
    mode: "landscape",
    operator: ["Ic", "Zambia"],
    gameName: "Adventure Time Fionna Fights",
    ratings: 4,
    gamePlayed: "10954 Played",
    url: "https://xgcloud.bngrenew.com/games/adventure-time-fionna-fights/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/adventuretime_fiona.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/adventuretime_fiona.jpg",
    gameDescription:
      "Marshall Lee and Fionna were on their way to Lumpy Space Prince's party when enemies started to attack them! Because of this, they need to take a detour and clear the sky of evil creatures! Your role is to help Fionna lead her attacks on the mischievous minions!",
  },
  {
    id: 7,
    type: "html",
    category: "action",
    mode: "portrait",
    operator: ["Ic"],
    gameName: "Beanotown: Bush Chucker Challenge",
    ratings: 4,
    gamePlayed: "11471 Played",
    url: "https://xgcloud.bngrenew.com/games/beano-bush-chucker-challenge/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/bush_chucker_challenge.jpg",
    bannerImage:
      "https://xgcloud.bngrenew.com/banners/bush_chucker_challenge.jpg",
    gameDescription:
      "There's a rumble in BeaLandscapetown jungle...can you defend the treetops from the celebri-bugs?",
  },
  {
    id: 8,
    type: "html",
    category: "action",
    mode: "portrait",
    operator: ["Camron"],
    gameName: "Ben 10: Tomb of Doom",
    ratings: 4,
    gamePlayed: "12593 Played",
    url: "https://xgcloud.bngrenew.com/games/ben10-tomb-of-doom/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/tomb_of_doom.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/tomb_of_doom.jpg",
    gameDescription:
      "Ben 10: Tomb of Doom is a one-tap beat-em-up game based on the Ben 10 animated cartoon TV series.",
  },
  {
    id: 9,
    type: "html",
    category: "action",
    mode: "portrait",
    operator: ["Ic"],
    gameName: "Blast The Parcel",
    ratings: 4,
    gamePlayed: "12259 Played",
    url: "https://xgcloud.bngrenew.com/games/blast-the-parcel/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/blast_the_parcel.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/blast_the_parcel.jpg",
    gameDescription:
      "Help Dennis bust open boring birthday parcels to make room for the good stuff!",
  },
  {
    id: 10,
    type: "html",
    category: "action",
    mode: "landscape",
    operator: ["Congo"],
    gameName: "Ben 10 Challenge Stinkfly's Showtime",
    ratings: 4,
    gamePlayed: "10827 Played",
    url: "https://xgcloud.bngrenew.com/games/ben10-challenge/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/stinkflys_showtime.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/stinkflys_showtime.jpg",
    gameDescription:
      "The peculiar Stinkfly, one of Ben 10's aliens, wants to be the brand new canLandscapenball. He feels the need to fly and show us how rich he can get with his superpowers. Throw him high as far as you can with the most powerful canLandscapen, so he gets to collect as much money as he wants!",
  },
  {
    id: 11,
    type: "html",
    category: "action",
    mode: "landscape",
    operator: ["Ic"],
    gameName: "Ben 10: Alien Rush",
    ratings: 4,
    gamePlayed: "12820 Played",
    url: "https://xgcloud.bngrenew.com/games/ben10-alien-rush/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/ben10_alienrush.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/ben10_alienrush.jpg",
    gameDescription:
      "When it comes to saving this world from evil aliens, Ben 10 is the right person who can do it. He is strong eLandscapeugh to beat anyone who threatens his family and friends. Fight with him against different monsters in the Alien Rush game, and help our hero to save the world again!",
  },
  {
    id: 12,
    type: "html",
    category: "action",
    operator: [],
    mode: "landscape",
    gameName: "Ben 10: Hero Time",
    ratings: 4,
    gamePlayed: "12837 Played",
    url: "https://xgcloud.bngrenew.com/games/ben10-hero-time-game/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/ben10_herotime.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/ben10_herotime.jpg",
    gameDescription:
      "This is aLandscapether part of the game series in which you play as the animated character called Ben. Your objective is to use the power of Omnitrix to transform into various creatures and jump to the places you would Landscapet be able to otherwise. You need find a way to get as far as possible, collect eLandscapeugh energy and especially to manage to do it within limited time limit",
  },
  {
    id: 13,
    type: "html",
    category: "action",
    operator: ["Ic"],
    mode: "landscape",
    gameName: "Battle Day Brawl",
    ratings: 4,
    gamePlayed: "12027 Played",
    url: "https://xgcloud.bngrenew.com/games/battle-day-brawl/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/battle_day_brawl.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/battle_day_brawl.jpg",
    gameDescription:
      "Battle Day Brawl is a game in which your favourite anime character is going to come up and settle down everything that you need for sure in order to achieve the best things ever.",
  },
  {
    id: 14,
    type: "html",
    category: "action",
    operator: ["Ic"],
    mode: "landscape",
    gameName: "Ben 10 : World Rescue",
    ratings: 4,
    gamePlayed: "11698 Played",
    url: "https://xgcloud.bngrenew.com/games/ben10-world-rescue/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/world_rescue.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/world_rescue.jpg",
    gameDescription:
      "Prepare to join Ben and play as your favourite alien to rescue Gwen and Grandpa Max on a mission around the world, from Paris to Tokyo and other exciting locations.",
  },
  {
    id: 15,
    type: "html",
    category: "action",
    mode: "landscape",
    operator: ["Congo"],
    gameName: "Ben 10 : Alien Rivals 2",
    ratings: 4,
    gamePlayed: "12748 Played",
    url: "https://xgcloud.bngrenew.com/games/ben10-alienrivals-v2/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/ben10_alienrivals.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/ben10_alienrivals.jpg",
    gameDescription:
      "Ben 10: Alien Rivals2 is a fighting game based on the Ben 10 animated cartoon TV series. Pick a character, win fights, and unlock more characters as you progress through the game.",
  },
  {
    id: 16,
    type: "html",
    category: "action",
    operator: ["Zambia"],
    mode: "landscape",
    gameName: "Battle Of The Behemoths",
    ratings: 4,
    gamePlayed: "11715 Played",
    url: "https://xgcloud.bngrenew.com/games/battle-of-the-behemoths/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/battle_ofthe_behemoths.jpg",
    bannerImage:
      "https://xgcloud.bngrenew.com/banners/battle_ofthe_behemoths.jpg",
    gameDescription:
      "The characters from the Regular Show are brave eLandscapeugh to have such a battle and see which one is the best of them all. In the Battle of the Behemoths game, you have the chance to meet them, and see who the best warrior is.",
  },
  {
    id: 17,
    type: "html",
    category: "action",
    operator: ["IC", "Camron"],
    mode: "landscape",
    gameName: "Star Wars: Battle Run",
    ratings: 4,
    gamePlayed: "12481 Played",
    url: "https://xgcloud.bngrenew.com/games/star-wars-battlerungame/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/battle_run.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/battle_run.jpg",
    gameDescription:
      "Follow BB-8 as you roll your way through an intense battle on the planet of Crait. You choose how the story will change and whether to help the Resistance or to join the First Order.",
  },
  {
    id: 18,
    type: "html",
    category: "action",
    operator: ["Zambia"],
    mode: "landscape",
    gameName: "Star Wars: Battle Run",
    ratings: 4,
    gamePlayed: "12481 Played",
    url: "https://xgcloud.bngrenew.com/games/star-wars-battlerungame/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/battle_run.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/battle_run.jpg",
    gameDescription:
      "Follow BB-8 as you roll your way through an intense battle on the planet of Crait. You choose how the story will change and whether to help the Resistance or to join the First Order.",
  },
  {
    id: 19,
    type: "html",
    category: "action",
    operator: ["IC", "Camron"],
    mode: "landscape",
    gameName: "Star Wars: Battle Run",
    ratings: 4,
    gamePlayed: "12481 Played",
    url: "https://xgcloud.bngrenew.com/games/star-wars-battlerungame/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/battle_run.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/battle_run.jpg",
    gameDescription:
      "Follow BB-8 as you roll your way through an intense battle on the planet of Crait. You choose how the story will change and whether to help the Resistance or to join the First Order.",
  },
  {
    id: 20,
    type: "html",
    category: "action",
    mode: "landscape",
    gameName: "Star Wars: Battle Run",
    ratings: 4,
    operator: ["IC", "Congo"],
    gamePlayed: "12481 Played",
    url: "https://xgcloud.bngrenew.com/games/star-wars-battlerungame/index.html",
    gameImage: "https://xgcloud.bngrenew.com/icons/battle_run.jpg",
    bannerImage: "https://xgcloud.bngrenew.com/banners/battle_run.jpg",
    gameDescription:
      "Follow BB-8 as you roll your way through an intense battle on the planet of Crait. You choose how the story will change and whether to help the Resistance or to join the First Order.",
  },
];
const useStyles = makeStyles({
  root: {
    width: 180,
    m: 1,
    padding: 10,
    // add your custom styles here
  },

  inputLabel: {
    fontWeight: "bold",
    paddingLeft: "20px",
    position: "absolute",
    top: "-8px",
  },
  row:{
    padding:"10px"
  }
});

function GameTable() {
  const [page, setPage] = useState(0);
  const [rowPerPage, setROwPerPage] = useState(5);
  const [oprId, setOprId] = useState(Array(rows.length).fill([]));
  const [searchText, setSearchText] = useState("");
  const [addGame, setAddGame] = useState(false);
  const navigate=useNavigate()
  const handleChangePage = (e, newpg) => {
    setPage(newpg);
  };

  const handleChangeRowsPerPage = (e) => {
    setROwPerPage(parseInt(e.target.value, 5));
    setPage(0);
  };
  const OperatorIdList = ["Congo", "IC", "Camron", "Zambia", "Libyana"];
  const handleSelectOption = (e, index) => {
    const value = e.target.value;
    setOprId((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[index] = value;
      return newSelectedOptions;
    });
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      }
    },
  };
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  const filteredData = rows.filter((row) => {
    const name = row.url.toLowerCase();
    // const email = row.email.toLowerCase();
    const searchTextLowerCase = searchText.toLowerCase();
    return name.includes(searchTextLowerCase);
  });
  const classes = useStyles();
  const onHandleAdd = () => {
   navigate("/addgame")
  };
  return (
    <div>
      <Header />
      <Paper>
        <TableContainer component={Paper}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <Button variant="contained" onClick={onHandleAdd}>
              ADD GAME
            </Button>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchText}
              onChange={handleSearchTextChange}
            />
          </div>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" className="font-extrabold">
                    S.No
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" className="font-extrabold">
                    Game Urls
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" className="font-extrabold">
                    Category
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" className="font-extrabold">
                    Operator list
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" className="font-extrabold">
                    Operator ID
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                .map((row, index) => (
                  <TableRow key={row.id}  classes={{
                    root: classes.row,
                  }}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.url}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">
                      {row.operator.length > 0 ? (
                        row.operator.join(", ")
                      ) : (
                        <div>...</div>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <FormControl sx={{ m: 1, width: 500 }}>
                        <InputLabel
                          id="demo-multiple-chip-label"
                          classes={{
                            root: classes.inputLabel,
                          }}
                        >
                          Select
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={oprId[row.id - 1]}
                          onChange={(event) =>
                            handleSelectOption(event, row.id - 1)
                          }
                          input={<OutlinedInput label="Select..." />}
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                          classes={{
                            root: classes.root,
                          }}
                        >
                          {/* {console.log(oprId[row.id])} */}
                          {OperatorIdList?.map((name, idx) => (
                            <MenuItem key={name} value={name}>
                              {/* { console.log(idx)} */}
                              <Checkbox
                                checked={
                                  oprId?.[row.id - 1]?.length > 0 &&
                                  oprId[row.id - 1].indexOf(name) > -1
                                }
                              />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default GameTable;
