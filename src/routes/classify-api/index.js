/*
 * @Author: vk 
 * @Date: 2019-02-26 11:13:41 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-26 21:01:16
 * @[获取分类集合]
 */
var curd = require('mongodb-curd');
var batabaseName = "newlemon";
var collcationName = "classify";
//添加分类
function addCurom(req, res, next) {
    var parmas = req.query;
    var icon = parmas.icon,
        cname = parmas.cname,
        type = parmas.type,
        uid = parmas.uid;

    // 判断参数是否齐全
    if (!icon || !cname || !type || !uid) {
        res.send({
            code: 3,
            msg: "缺少参数"
        })
    } else {
        isExit(parmas, req, res, next);
    }
}
//判断查找该分类是否存在
function isExit(parmas, req, res, next) {
    //查找分类
    curd.find(batabaseName, collcationName, {
        "cname": parmas.cname,
        "uid": {
            "$in": ["all", parmas.cname]
        }
    }, function(result) {
        if (!result) {
            res.send({
                code: 4,
                mes: "该分类已存在"
            })
        } else {
            //添加
            curd.insert(batabaseName, collcationName, parmas, function(result) {
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
    }, {
        skip: 0,
        limit: 0
    })

}



//查找所有分类
function getCurom(req, res, next) {
    curd.find(batabaseName, collcationName, {}, function(result) {
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
    }, {
        skip: 0,
        limit: 0
    })
}
module.exports = {
    getCurom: getCurom,
    addCurom: addCurom
}