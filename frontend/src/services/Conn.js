export default class Conn {
    static server = {
        name: 'http://localhost:'
    };

    static port = {
        val: '8096/'
    }
    static basicPath = {
        val: 'proc_tender/api'
    }
    static wholePath={
        name: Conn.server.name+Conn.port.val+ Conn.basicPath.val  /*  http://localhost:8089/guru/api  */
    }
    static ReqContentType = 'application/json'
    static LoginToken = {
        'Content-Type': Conn.ReqContentType,
        'Authorization': 'Bearer '
    }
    static GetToken = {
        'Content-Type': Conn.ReqContentType,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

}
