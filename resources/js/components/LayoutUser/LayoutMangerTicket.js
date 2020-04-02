import React, { Component } from 'react'

class LayoutMangerTicket extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <div className="">
                    <div className="row mt-4">
                        <div className="col-lg-3 col-md-12">
                            <div className="container border rounded py-4">
                                <h4> NHẬP THÔNG TIN VÉ</h4>
                                <div className="form-group">
                                    <input type="text" name="customerName" id="customerName" className="form-control" placeholder="Tên Khách Hàng" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="phone" placeholder="Số điện thoại" name="phone" />
                                </div>
                                <div className="form-group form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" name="remember" /> Tôi không phải người máy
                                    </label>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary form-control">Kiểm tra vé</button>
                                </div>
                                <h5>Lưu ý:</h5>
                                <a> Trường hợp bạn không thể hủy vé qua mạng hoặc muốn đổi sang vé khác vui lòng liên hệ qua số điện thoại 1900 7070.</a>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <div className="card border-0">
                                <div className="alert alert-success" role="alert">
                                    <h6 className="alert-heading text-center">Vui lòng nhập thông tin và bấm kiểm tra vé</h6>
                                    <p className="mb-0" />
                                </div>
                                <div className="card-body">
                                    <table className="table table-hover table-sm table-responsive ">
                                        <thead>
                                            <tr className="text-center">
                                                <th>Tên khách hàng</th>
                                                <th>Mã vé</th>
                                                <th>Số điện thoại</th>
                                                <th>Nhà xe</th>
                                                <th>Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-center">
                                                <td>Nguyễn Đình Quang</td>
                                                <td>MAVE88523291</td>
                                                <td>0775467906</td>
                                                <td>Phương Trang</td>
                                                <td>
                                                    <div className="d-flex justify-content-around">
                                                        <button type="submit" className="btn btn-primary "><i className="fas fa-edit" /></button>
                                                        <button type="submit" className="btn btn-success info-ticket " id="info"><i className="fas fa-info-circle" /></button>
                                                        <button type="submit" className="btn btn-danger "><i className="far fa-window-close" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table id="dtHorizontalVerticalExample" className="table table-striped table-bordered table-responsive table-sm " cellSpacing={0} width="100%">
                                        <thead>
                                            <tr id="thead-table" className="text-muted">
                                                <th className="alo">Mã vé</th>
                                                <th className="alo">Tên khách hàng</th>
                                                <th>Ngày sinh</th>
                                                <th>Địa chỉ</th>
                                                <th>Số điện thoại</th>
                                                <th>Giớ tính</th>
                                                <th>Ngày đặt</th>
                                                <th>Giá vé</th>
                                                <th>Điểm đi</th>
                                                <th>Điểm đến</th>
                                                <th>Chú thích</th>
                                                <th>Tên xe</th>
                                                <th>Mã xe</th>
                                                <th>Thời gian đi</th>
                                                <th>Thời gian đến</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr> 
                                                <td>MAVE88523291</td>
                                                <td>Bùi Tấn Toán</td>
                                                <td>16/01/1998</td>
                                                <td>Quận thanh khuê Đà Nẵng</td>
                                                <td>0378056827</td>
                                                <td>Nam</td>
                                                <td>01/01/2020</td>
                                                <td>300000đ</td>
                                                <td>Đà Nẵng</td>
                                                <td>Hà Nội</td>
                                                <td>Xe đầy đủ wifi buồn vệ sạch sẽ</td>
                                                <td>Xe khách DCAR cung đình</td>
                                                <td>43A-000.00</td>
                                                <td>08:30h</td>
                                                <td>11:30h</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer">
                                    <h6 className="text-center">Thông tin danh sách vé của <strong>Name</strong></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default LayoutMangerTicket;
