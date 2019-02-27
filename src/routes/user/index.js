/*
 * @Author: vk 
 * @Date: 2019-02-26 14:10:24 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-26 16:08:06
 */
var curd = require('mongodb-curd');
var batabaseName = "newlemon";
var collcationName = "user";

function queryUser(req, res, next) {
    console.log(1)

}

function addUser(req, res, next) {
    var nickname = req.query.nickname;
    console.log(nickname);
    if (!nickname) {
        res.send({
            code: 3,
            msg: "姓名不能为空"
        })
    } else {
        curd.insert(batabaseName, collcationName, {
            "nickname": nickname
        }, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            }
        })
    }
}
module.exports = {
    queryUser: queryUser,
    addUser: addUser,
}