$(document).ready(function(){
    //#id  换成实际的那个个人中心 a标签的ID
    $('#router_personal').click(function(){
        //这里发送消息
        // userInfo 是客户端维护的全局变量  在socket_util.js中维护  当登录成功后userInfo里面有值
        //alert('按钮被点了');
        socket.emit('pesonalCenterRequest', userInfo);
    });
});