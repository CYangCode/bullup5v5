var io = require('socket.io')();
var logger = require('./util/logutil');

// 代理
var userProxy = require('./proxy/userproxy.js');
var teamProxy = require('./proxy/teamProxy.js');
var socketProxy = require('./proxy/socketproxy.js');
var battleProxy = require('./proxy/battleProxy.js');

// 初始化Proxy, 所有需要保存数据结构的对象都需要初始化, 只能初始化一次
userProxy.init();
teamProxy.init();
socketProxy.init();
battleProxy.init();


io.on('connection', function (socket) {
    logger.levelMsgLog(0, 'User ' + socket.id + ' connected!');

    userProxy.handleLogin(socket);

    userProxy.handleRegister(socket);

    userProxy.handleInviteFriend(socket);

    userProxy.handleUserInviteResult(io, socket);

    teamProxy.handleTeamEstablish(socket);

    teamProxy.handleTeamForm(io, socket);

    teamProxy.handleVersusLobbyRefresh(socket);

    teamProxy.handleTeamDetails(socket);

    battleProxy.handleBattleInvite(socket);

});

io.on('disconnect', function (socket) {
    logger.levelMsgLog(0, 'User ' + socket.id + ' disconnected!');
    socketProxy.remove(socket);

});

io.listen(3000);
