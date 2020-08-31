var fs = require('fs')
var xlsx = require('node-xlsx');


var txtBase = __dirname.split('/core')[0] + '/txt'

var readlineSync = require('readline-sync');
// Wait for user's response.
var dirName = readlineSync.question('输入文件的名称:');

dirName =  dirName || '1'

fs.readdir(txtBase + '/' + dirName, (err, files) => {

    var sheetData = []
    files.forEach(fileName => {
        let data = fs.readFileSync(txtBase + '/1/' + fileName)
        let id = fileName.split('_')[0]
        let content = data.toString()
        sheetData.push([id, content])
    });

    var buffer = xlsx.build([{
            name: 'sheet1',
            data: sheetData
        }
    ]);

    // 写入文件
    fs.writeFile( txtBase + '/' + generateFileNameByDate(dirName), buffer, function (err) {
        if (err) {
            console.log("Write failed: " + err);
            return;
        }

        console.log("Write completed.");
    });
})


function generateFileNameByDate(dirName) {

    if(dirName){
        return dirName + '-导入.xlsx'
    }else{
        var date = new Date();
        var y = date.getFullYear()
        var m = date.getMonth() + 1;
        var d = date.getDate()
        var h = date.getHours()
        var min = date.getMinutes()
        var s = date.getSeconds()
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        min = min < 10 ? '0' + min : min;
        s = s < 10 ? '0' + s : s;
    
        return '' + y + m + d + "-" + h + min + s + '.xlsx';
    }
   
}