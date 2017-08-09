function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'thành công' : 'thất bại';
        alert('Lấy dữ liệu ' + msg + "\nQuay lại trang script generator để tiếp tục !");
    } catch (err) {
        console.log("Copy output bên dưới:");
        console.log(text);
        alert('Oops, không copy được. Tắt thông báo và copy output từ console.');
    }
    document.body.removeChild(textArea);
}

function getCTDaoTaoId() {
    var option = document.getElementById('chuongtrinhdaotao').firstChild;
    var id = option.getAttribute('value');
    return id;
}

function getCTDaoTaoName() {
    var option = document.getElementById('chuongtrinhdaotao').firstChild;
    var name = option.textContent;
    return name;
}

function GetDanhSachMon(CTDaoTao_ID, userData) {
    console.log("---- Đang lấy danh sách môn học ...");
    console.log("     Sending request...");
    $.ajax({
        type: 'GET',
        url: '/dangkingoaikehoach?StudyProgramID=' + CTDaoTao_ID,
        dataType: 'html',
        async: false,
        success: function (html) {
            console.log("    Received data, processing data...");
            var dsm = $(html).find('#DanhSachLop table table tbody tr');
            var dsm_obj = {};
            for (i = 0; i < dsm.length; i++) {
                console.log('process dsm' + i + '/' + dsm.length);
                dsm_obj[i] = {};
                dsm_obj[i]['tenLop'] = dsm[i].querySelector('td:nth-of-type(3)').textContent;
                dsm_obj[i]['stc'] = dsm[i].querySelector('td:nth-of-type(4)').textContent;
                var scriptTextParts = dsm[i].querySelector('td:last-child a').getAttribute('href').split("'");
                dsm_obj[i]['StudyUnitID'] = scriptTextParts[1];
                dsm_obj[i]['CurriculumID'] = scriptTextParts[3];
                GetDanhSachBuoi(dsm_obj, i);
            }
            userData['DSMon'] = dsm_obj;
            console.log("[OK] Lấy danh sách môn thành công !");
        }
    });
};

function GetDanhSachBuoi(DSMon, j) {
    console.log("    Đang lấy danh sách buổi...");
    console.log("    Sending request...");
    $.ajax({
        type: 'GET',
        url: '/DangKiNgoaiKeHoach/DanhSachLopHocPhan/' + DSMon[j]['StudyUnitID'] + '?CurriculumID=' + DSMon[j]['CurriculumID'],
        async: false,
        dataType: 'html',
        success: function (data) {
            console.log("    Received data, processing data...");
            var dsb = $(data).find('tr.trhover');
            var dsb_arr = {};
            for (i = 0; i < dsb.length; i++) {
                dsb_arr[i] = {};
                dsb_arr[i]['BuoiID'] = dsb[i].querySelector('td:nth-of-type(2)').textContent;
                dsb_arr[i]['HideID'] = dsb[i].querySelector('td:nth-of-type(4) input').getAttribute('id');
                dsb_arr[i]['SiSo'] = dsb[i].querySelector('td:nth-of-type(6)').textContent;
                //dsb_arr[i]['DaDangKi'] = dsb[i].querySelector('td:nth-of-type(7)').textContent;
                dsb_arr[i]['GiaoVien'] = dsb[i].querySelector('td:nth-of-type(8)').textContent;
                var buoiStrParts = dsb[i].querySelector('td:nth-of-type(9) div').textContent.split(',');
                var regex = /(\d+)/g;
                if (buoiStrParts == null || buoiStrParts.length < 2) {
                    dsb_arr[i]['BuoiThu'] = 0;
                    dsb_arr[i]['TietBatDau'] = 0;
                    dsb_arr[i]['TietKetThuc'] = 0;
                } else {
                    dsb_arr[i]['BuoiThu'] = buoiStrParts[0].match(regex)[0];
                    dsb_arr[i]['TietBatDau'] = buoiStrParts[1].match(regex)[0];
                    dsb_arr[i]['TietKetThuc'] = buoiStrParts[1].match(regex)[1];
                }
            }
            console.log("     Lấy danh sách buổi thành công !");
            DSMon[j]['DSBuoi'] = dsb_arr;
            console.log("     Cập nhật môn học thành công, số môn: " + j);
        }
    });
};


var result = {};
result['CTDaoTao_ID'] = getCTDaoTaoId();
result['CTDaoTao_Name'] = getCTDaoTaoName();
GetDanhSachMon(result.CTDaoTao_ID, result);
var currentdate = new Date();
result['lastUpdate'] =
    currentdate.getDate() + "/" +
    (currentdate.getMonth() + 1) + "/" +
    currentdate.getFullYear() + " @ " +
    currentdate.getHours() + ":" +
    currentdate.getMinutes() + ":" +
    currentdate.getSeconds();
copyTextToClipboard(JSON.stringify(result));



//==================================================================================================


// v2


function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'thành công' : 'thất bại';
        alert('Lấy dữ liệu ' + msg + "\nQuay lại trang script generator để tiếp tục !");
    } catch (err) {
        console.log("Copy output bên dưới:");
        console.log(text);
        alert('Oops, không copy được. Tắt thông báo và copy output từ console.');
    }
    document.body.removeChild(textArea);
}

function getCTDaoTaoId() {
    var option = document.getElementById('chuongtrinhdaotao').firstChild;
    var id = option.getAttribute('value');
    return id;
}

function getCTDaoTaoName() {
    var option = document.getElementById('chuongtrinhdaotao').firstChild;
    var name = option.textContent;
    return name;
}

function GetDanhSachMon(userData) {
    console.log("---- Đang lấy danh sách môn học ...");
    console.log("     Sending request...");
    $.ajax({
        type: 'GET',
        url: '/dangkingoaikehoach?StudyProgramID=' + userData['CTDaoTao_ID'],
        dataType: 'html',
        async: false,
        success: function (html) {
            var dsm = $(html).find('#DanhSachLop table table tbody tr');
            console.log("     Received DSM data - length:"+dsm.length);
            var dsm_arr = [];
            for (i = 0; i < dsm.length; i++) {
                console.log('     Processing DSM data - ' + i + '/' + dsm.length);
                dsm_arr[i] = {};
                var scriptTextParts = dsm[i].querySelector('td:last-child a').getAttribute('href').split("'");
                dsm_arr[i]['CurriculumID'] = scriptTextParts[3];;
                dsm_arr[i]['StudyUnitID'] = scriptTextParts[1];
                dsm_arr[i]['tenLop'] = dsm[i].querySelector('td:nth-of-type(3)').textContent;
                dsm_arr[i]['stc'] = dsm[i].querySelector('td:nth-of-type(4)').textContent;
            }
            userData['DSMon'] = dsm_arr;
            console.log("[OK] DSM finished !");
        }
    });
};

function GetDanhSachBuoi(userData) {
    console.log("---- Đang lấy danh sách buổi...");
    userData['DSBuoi'] = [];
    for (j=0; j<userData['DSMon'].length; j++) {
        console.log("     Sending request "+j+'/'+userData['DSMon'].length);
        var dsbpm = [];
        $.ajax({
            type: 'GET',
            url: '/DangKiNgoaiKeHoach/DanhSachLopHocPhan/' + userData['DSMon'][j]['StudyUnitID'] + '?CurriculumID=' + userData['DSMon'][j]['CurriculumID'],
            async: false,
            dataType: 'html',
            success: function (data) {
                var dsb = $(data).find('tr.trhover');
                console.log("    Received DSB data - length:"+dsb.length);
                var dsb_arr = [];
                for (i=0; i<dsb.length; i++) {
                    console.log('     Processing DSB data - ' + i + '/' + dsb.length);
                    dsb_arr[i] = {};
                    dsb_arr[i]['BuoiID'] = dsb[i].querySelector('td:nth-of-type(2)').textContent;
                    dsb_arr[i]['HideID'] = dsb[i].querySelector('td:nth-of-type(4) input').getAttribute('id');
                    dsb_arr[i]['SiSo'] = dsb[i].querySelector('td:nth-of-type(6)').textContent;
                    dsb_arr[i]['GiaoVien'] = dsb[i].querySelector('td:nth-of-type(8)').textContent;
                    var buoiStrParts = dsb[i].querySelector('td:nth-of-type(9) div').textContent.split(',');
                    var regex = /(\d+)/g;
                    if (buoiStrParts == null || buoiStrParts.length < 2) {
                        dsb_arr[i]['BuoiThu'] = 0;
                        dsb_arr[i]['TietBatDau'] = 0;
                        dsb_arr[i]['TietKetThuc'] = 0;
                    } else {
                        dsb_arr[i]['BuoiThu'] = buoiStrParts[0].match(regex)[0];
                        dsb_arr[i]['TietBatDau'] = buoiStrParts[1].match(regex)[0];
                        dsb_arr[i]['TietKetThuc'] = buoiStrParts[1].match(regex)[1];
                    }
                }
                userData['DSBuoi'][j] = dsb_arr;
            }
        });
    }
    console.log("[OK] DSB finished !");
};

var result = {};
result['CTDaoTao_ID'] = getCTDaoTaoId();
result['CTDaoTao_Name'] = getCTDaoTaoName();
GetDanhSachMon(result);
GetDanhSachBuoi(result);
var currentdate = new Date();
result['lastUpdate'] =
    currentdate.getDate() + "/" +
    (currentdate.getMonth() + 1) + "/" +
    currentdate.getFullYear() + " @ " +
    currentdate.getHours() + ":" +
    currentdate.getMinutes() + ":" +
    currentdate.getSeconds();
copyTextToClipboard(JSON.stringify(result));