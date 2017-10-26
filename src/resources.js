const debug = process.env.NODE_ENV === 'development' ? true : false;
// 测试环境地址
if (debug) {
    var host = 'https://api.guangyangyundong.com/api';
} else {
    //正式环境地址
    var host = 'https://api.guangyangyundong.com/api';
}
console.warn('当前resource: ', host);

let resources = {
    host: host,
    users(id) {
        return `${host}\/users\/${id}`
    }
};

export default resources;
