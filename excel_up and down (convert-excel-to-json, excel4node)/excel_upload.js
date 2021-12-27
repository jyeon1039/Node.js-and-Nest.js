const express = require('express');
const api = express.Router();
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');

// disk에 저장하지 않고, 메모리에 저장해서 잠깐 사용하기 -> 용량이 너무 크면 메모리를 초과해서 서버가 멈춰버릴 수도 있음
var upload = multer({
    storage: multer.memoryStorage()
});

api.post("/", upload.single('excel_file'), function (req, res, next) {
    // 엑셀 데이터 json으로 변환
    const result = excelToJson({
        source: req.file.buffer
    });

    const sample = result['Sheet 1'];
    var excelResult = [];

    for(var i = 1; i < sample.length; i++){
        excelResult.push({
            name: sample[i].A,
            cellNum: sample[i].B,
            birth: sample[i].C
        });
    }

    res.status(200).json({excel_result: excelResult});
});

module.exports = api;