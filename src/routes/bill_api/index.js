/*
 * @Author: vk 
 * @Date: 2019-02-26 19:33:43 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-27 14:10:29
 */
var curd = require('mongodb-curd');
var batabaseName = "newlemon";
var collcationName = "bill";
//添加账单
function addbill(req, res, next) {
    //获取前端传来的参数
    var money = req.query.money,
        uid = req.query.uid,
        type = req.query.type,
        cname = req.query.cname,
        icon = req.query.icon,
        time = req.query.time;
    console.log(money, uid, type, cname, icon, time);
    if (!money || !uid || !type || !cname || !icon || !time) {
        res.send({
            code: 3,
            msg: "缺少参数"
        })
    } else {
        curd.insert(batabaseName, collcationName, {
            "money": money,
            "uid": uid,
            "type": type,
            "cname": cname,
            "icon": icon,
            "time": time
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
//获得账单/查看账单
function getbill(req, res, next) {
    var uid = req.query.uid,
        time = req.query.time,
        query = null,
        reg = time && new RegExp("^" + time)
    cname = req.query.cname;
    if (!uid || !time) {
        res.send({
            code: 3,
            msg: "缺少参数"
        })
        return;
    }
    if (!cname) {
        query = {
            "uid": uid,
            "time": reg
        }
    } else {
        query = {
            "uid": uid,
            "time": reg,
            "cname": {
                "$in": cname.split(',')
            }
        }
    }
    curd.find(batabaseName, collcationName, query, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            if (result.length) {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            } else {
                res.send({
                    code: 2,
                    mes: "没查询到相关信息"
                })
            }
        }
    }, {
        skip: 0,
        limit: 0
    })
}
//删除账单
function delbill(req, res, next) {
    var id = req.query.id;
    console.log(id);
    if (!id) {
        res.send({
            code: 3,
            msg: "缺少参数"
        })
    } else {
        curd.remove(batabaseName, collcationName, { "_id": id }, function(result) {
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
    addbill: addbill,
    getbill: getbill,
    delbill: delbill
}