exports.testLogin = function (socket, loginInfo) {
    socket.emit('login', loginInfo);
}

exports.testRegister = function (socket, registerInfo) {
    socket.emit('register', registerInfo);
}

exports.testEstablishTeam = function (socket, userInfo) {
    socket.emit('teamEstablish', {
        name: userInfo.name + (new Date).valueOf(),
        captian: {
            name: userInfo                                                                                                                                                                       .name,
            userId: userInfo.userId,
        },
        participants: [
            {
                name: userInfo.name,
                userId: userInfo.userId,
                avatarId: userInfo.avatarId,
                strength: userInfo.strength
            }
        ],
        status: 'ESTABLISHING',
        type: 'BATTLE',
        bet: 100,
        mapId: 1,
        rule: '基地爆炸'
    })
}

exports.testInviteFriend = function (socket, userInfo, friendName, teamInfo) {
    var friend = userInfo.friendList[friendName];

    socket.emit('inviteFriend', {
        name: friend.name,
        userId: friend.userId,
        host: {
            name: userInfo.name,
            userId: userInfo.userId,
        },
        team: {
            name: teamInfo.name,
            bet: teamInfo.bet, // 赌注
            mapId: teamInfo.mapId,
            rule: teamInfo.rule
        }
    });
}

exports.testRecvInvitation = function (socket, userInfo, inviteInfo) {
    socket.emit('inviteResult', {
        errorCode: 0,
        type: 'INVITERESULT',
        text: userInfo.name + '加入游戏',
        extension: {
            hostName: inviteInfo.host.name,
            hostId: inviteInfo.host.userId,
            teamName: inviteInfo.team.name,
            userInfo: {
                name: userInfo.name,
                userId: userInfo.userId,
                avatarId: userInfo.avatarId,
                strength: userInfo.strength
            }
        }
    });
}

exports.testRefuseInvitation = function (socket, userInfo, inviteInfo) {
    socket.emit('inviteResult', {
        errorCode: 1,
        type: 'INVITERESULT',
        text: userInfo.name + '拒绝了邀请',
        extension: {
            hostName: inviteInfo.host.name,
            hostId: inviteInfo.host.userId
        }
    })
}