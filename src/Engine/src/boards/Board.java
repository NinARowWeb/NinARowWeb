package boards;

import Engine.EngineGame;

public class Board {
    private final String GameName;
    private final String CreatedUserName;
    private int RegisteredPlayers;
    private String RegisteredPlayersToResponse;
    private final int CapacityOfPlayers;
    private final EngineGame Engine;
    private String ActiveGame;
    private int Target;
    private String BoardSize;

    public Board(String i_GameName, String i_CreatedUserName, int i_CapacityOfPlayers, EngineGame i_Engine){
        GameName = i_GameName;
        CreatedUserName = i_CreatedUserName;
        CapacityOfPlayers = i_CapacityOfPlayers;
        RegisteredPlayers = 0;
        RegisteredPlayersToResponse = RegisteredPlayers + "/" + CapacityOfPlayers;
        Engine = i_Engine;
        ActiveGame = "No";
        Target = Engine.getSequence();
        BoardSize = Engine.getRows() + "X" + Engine.getMaxCol();
    }

/*
    public int getAmountOfRegistersPlayers() {
        return RegistersPlayers;
    }
*/

    public void setAmountOfRegistersPlayers(int i_AmountOfRegistersPlayers) {
        RegisteredPlayers = i_AmountOfRegistersPlayers;
        RegisteredPlayersToResponse = RegisteredPlayers + "/" + CapacityOfPlayers;
    }

    public boolean isActiveGame() {
        return ActiveGame == "Yes";
    }

    public void setActiveGame(boolean i_ActiveGame) {
        this.ActiveGame = i_ActiveGame == true? "Yes" : "No";
    }

/*    public String getGameName() {
        return GameName;
    }

    public String getCreatedUserName() {
        return CreatedUserName;
    }

    public int getCapacityOfPlayers() {
        return CapacityOfPlayers;
    }

    public int getRows(){
        return Engine.getRows();
    }

    public int getCols(){
        return Engine.getMaxCol();
    }

    public int getSequence(){
        return Engine.getSequence();
    }
*/
    public String getVarient(){
        return Engine.getVarient().name();
    }

}