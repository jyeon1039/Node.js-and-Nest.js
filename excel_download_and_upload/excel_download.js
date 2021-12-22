const express = require('express');
const api = express.Router();
const xl = require('excel4node');

//엑셀 다운로드
api.get('/', async function (req, res) {
    var wb = new xl.Workbook({
        defaultFont: { // default font
            color: '#000000',
            size: 12
        }
    });
    var ws = wb.addWorksheet('Sheet 1');

    // 재사용할 수 있는 스타일
    var style = wb.createStyle({
        font: {
            bold: true
        },
        alignment: {
            horizontal: 'center'
        }
    });

    ws.column(1).setWidth(20);
    ws.column(2).setWidth(12);
    ws.row(1).setHeight(15);

    ws.cell(1, 1).string('이름').style(style);
    ws.cell(1, 2).string('전화번호').style(style);
    ws.cell(1, 3).string('생년월일').style(style);

    var result = [
        {
            name: '이름1',
            cellNum: '010-1111-1111',
            birth: '1988-12-12'
        },
        {
            name: '이름2',
            cellNum: '010-2222-2222',
            birth: '2000-11-11'
        }
    ];

    for(var i in result){
        var row = Number(i)+2; //1행은 칼럼명이 들어가므로 2행부터 시작
        ws.cell(row, 1).string(result[i].name);
        ws.cell(row, 2).string(result[i].cellNum);
        ws.cell(row, 3).string(result[i].birth);
    }

    wb.write('sample.xlsx', res);
});

module.exports = api;