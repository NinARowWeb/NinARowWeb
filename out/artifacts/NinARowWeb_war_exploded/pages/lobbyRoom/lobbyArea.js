var USER = buildUrlWithContextPath("user");
var LOBBY_CONTENT_URL = buildUrlWithContextPath("lobbyArea");
var ENTER_GAME_URL = buildUrlWithContextPath("EnterGame");
var CLEAR_UPLOAD_ERROR_URL = buildUrlWithContextPath("ClearUploadError");


$(function () {
    $("#lobby-form").submit(function () {
        var file = this[0].files[0];
        var formData = new FormData();
        formData.append("uploadFile", file);

        $.ajax({
            method:'POST',
            data: formData,
            url: LOBBY_CONTENT_URL,
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            timeout: 4000,
            error: function(xhr, status, error){
                $("#error-message").innerHTML = xhr.responseText;
            },
            success: function() {}
        });
        return false;
    });

    $.ajax({
        url:USER,
        success:function(data){
            $("#lobby-player-name").append("Hello " + data);
        }
    });
    setInterval(ajaxGetContent,2000);
});

function ajaxGetContent(){
    $.ajax({
        url: LOBBY_CONTENT_URL,
        dataType: 'json',
        success:function(data){
            var boards = $("#lobby-games");
            var title =$("tr")[0].cloneNode(true);
            $("#lobby-games").empty();
            $("#lobby-games").append(title);
            $.each(data.boards || [], createBoard);
            $("#lobby-userslist").empty();
            $.each(data.users || [], createUser);
            $("#error-message").empty();
            $("#error-message").append(data.errorMessage);
            if(data.errorMessage)
                setTimeout(clearMessage,5000);
        }
    })
}

function clearMessage(){
    $("#error-message").empty();
    $.ajax({
        method: "POST",
        url: CLEAR_UPLOAD_ERROR_URL,
        dataType: 'json',
        success:function(){}
    })
}

function createUser(index,dataJson) {
    $('<li>' + dataJson.m_Name + '</li>').appendTo($("#lobby-userslist"));
}

function enterGame(gameForm){
    var currentGame = $('#lobby-games')[0].children[0].children[gameForm.getAttribute('index')].children[1].innerHTML;
    $.ajax({
        url: ENTER_GAME_URL,
        data: currentGame,
        dataType: 'json',
        success:function(data){
        }
    })
}

function createBoard(index,dataJson){
    if(dataJson !== []){
        var gameForm = $("<tr id='gameForm' action='EnterGame' method='POST' onclick='enterGame(this)'>");
        gameForm[0].setAttribute("index",index + 1);
        var newBoard = $("<tr class = 'lobby-boards-game'>");
        newBoard.append($("<td class='lobby-col-title'>").append(index + 1));
        newBoard.append($("<td class='lobby-col-title'>").append(dataJson.GameName));
        newBoard.append($("<td class='lobby-col-title'>").append(dataJson.CreatedUserName));
        newBoard.append($("<td class='lobby-col-title'>").append(dataJson.RegisteredPlayersToResponse));
        newBoard.append($("<td class='lobby-col-title'>").append(dataJson.BoardSize));
        newBoard.append($("<td class='lobby-col-title'>").append(dataJson.Target));
        newBoard.append($("<td class='lobby-col-title'>").append(dataJson.ActiveGame.toString()));
        var enterGame = $("<td class='lobby-col-title'>");
        var enterGameButton = $("<Button id ='enter-game-button' type='submit'>");
        enterGameButton[0].innerHTML = "Join";
        enterGame.append(enterGameButton);
        gameForm.append(enterGame);
        newBoard.append(gameForm);
        $("#lobby-games").append(newBoard);
    }
}
