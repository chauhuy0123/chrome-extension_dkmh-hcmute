// lay danh sach cac mon da dang ki
function DanhSachHocPhanDaDangKi() {
  try{
    $.ajax({
      type: 'GET',
      url: mypath + '/dangkithanhcong' + "?t=" + Math.random(),
      async: true,
      dataType: 'html',
      success: function (html) {
        console.log(html);
        // duoc 1 bang cac mon da dng ki
        // kem cac btn PopupDanhSachLop(StudyUnitID, CurriculumID)
      },
    })
    .fail(
      function (jqXHR, textStatus, err) {
        $('#DanhSachHocPhanDaDangKi').text('Thời gian chờ quá lâu vui lòng đăng nhập lại ! ');
        DialogAlert("Thông báo", "Thời gian chờ quá lâu vui lòng đăng nhập lại ! ", "error");
      });
    }
    catch (err_) {
      $('#DanhSachHocPhanDaDangKi').text('Lỗi xảy ra : ' + err_);
    }
  };
