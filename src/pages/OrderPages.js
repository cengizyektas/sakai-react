import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import './DataTableDemo.css';
import axios from "axios";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import SiparisFisi from "../components/SiparisFisi";





const OrderPages = () => {

    const customerInfo = {
        orderedId: "",
        customerId: "",
        orderNumber: "",
        orderDate: "",
        shipped: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        billingAddress: "",
        email: ""
    }
    const orderInfo = {
        orderId: "",
        orderNumber: "",
        orderDate: "",
        shipDate: "",
        shipStatus: "",
        shipperId: "",
        freight: "",
        salesTax: "",
        fulFilled: "",
        deleted: "",
        paymentDate: "",
        paid: "",
        transactStatus: "",
        errLoc: "",
        errMsg: "",
        shipNumber: ""

    }
    const [customer, setCustomer] = useState(customerInfo);
    const [order, setOrder] = useState(orderInfo);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const isMounted = useRef(false);
    const [orders, setOrders] = useState(null);
    const [ordersDialog, setOrdersDialog] = useState(false);
    const [customerDialog, setCustomerDialog] = useState(false);
    const [ordersPrintDialog, setOrdersPrintDialog] = useState(false);
    const [seciliSiparis, setSeciliSiparis] = useState(null);
    const [visible, setVisible] = useState(false);
    const [visibleOrder, setVisibleOrder] = useState(false);
    const [listeYenile, setListeYenile] = useState(false);
    const [kargoVrlmsMi, setKargoVrlmsMi] = useState(false);




    console.log("customer4444", customer);


    const sipStat = [
        { name: 'Onaylandı', code: 'Onaylandı' },
        { name: 'Hazırlanıyor', code: 'Hazırlanıyor' },
        { name: 'Kargolandı', code: 'Kargolandı' },
        { name: 'Teslim Edildi', code: 'Teslim Edildi' },
        { name: 'Sipariş İptal', code: 'Sipariş İptal' },
        { name: 'İade', code: 'İade' },
        { name: 'Diğer', code: 'Diğer' }
    ];

    let todayDate = new Date().toISOString().slice(0, 10);

    console.log("orders", orders);

    useEffect(() => {
        console.log("istek atıyor mu ????????????????????????????????????????");
        axios.get(`http://test.cengizyektas.com/Orders/GetOrderList?now=${todayDate}`).then((response) => {
            console.log("response2", response);
            setOrders(response?.data?.data)

        })
    }, [listeYenile])
    console.log("listeyenile", listeYenile);
    console.log("ordersNE ???????????????????????????", orders);





    addLocale('en', {
        firstDayOfWeek: 1,
        dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
        // dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],
        monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        // monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Gün',
        // clear: 'Limpiar'
    });



    const orderDate = (rowData) => {
        return (
            <>
                {new Date(rowData.orderDate).toLocaleString().split(' ')[0]}
                {/* {rowData.orderDate.split("T")[0]} */}

            </>
        );
    }
    const shipDate = (rowData) => {
        return (
            <>
                {/* {rowData.shipDate == null ? "Kargoya Verilmedi." : rowData.shipDate.split("T")[0]} */}
                {rowData.shipDate == null ? "Kargoya Verilmedi." : new Date(rowData.shipDate).toLocaleString().split(' ')[0]}            </>
        );
    }
    const paidBody = (rowData) => {
        return (
            <>
                {rowData.paid + " TL"}
            </>
        );
    }
    const transactStatusBody = (rowData) => {
        return (
            <>
                {rowData.transactStatus == null ? "Veri Yok" : rowData.transactStatus}
            </>
        );
    }
    const errmsgBody = (rowData) => {
        return (
            <>
                {rowData.errMsg == null ? "Banka Mesajı Yok" : rowData.errMsg}
            </>
        );
    }
    const priceBody = (rowData) => {
        return (
            <>
                {rowData.price + " TL"}
            </>
        );
    }
    const shipStatus = (rowData) => {
        return (
            <>
                {rowData.shipStatus == 1 ? " Onaylandı" :
                    rowData.shipStatus == 2 ? "Hazırlanıyor" :
                        rowData.shipStatus == 3 ? "Kargolandı" :
                            rowData.shipStatus == 4 ? "Teslim Edildi" :
                                rowData.shipStatus == 5 ? "Sipariş İptal" :
                                    rowData.shipStatus == 6 ? "İade" :
                                        "Diğer"
                }
            </>
        );
    }
    const editCustomer = (rowData) => {
        console.log("customer Ne 231311", rowData.listOrderDetail[0].ordered);
        setCustomer(rowData?.listOrderDetail[0]?.ordered)
        console.log("asd");
        setCustomerDialog(true)
    }
    const editOrder = (rowData) => {
        console.log("rowData.shipDate", rowData.shipDate);
        if (rowData.shipDate !== null) {
            setKargoVrlmsMi(true)
        }
        console.log("123 Customer ", rowData);
        setOrder(rowData)
        setOrdersDialog(true)
    }
    const siparisFisiFunc = (rowData) => {
        console.log("rowDatarowData", rowData);
        setSeciliSiparis(rowData)
        setOrdersPrintDialog(true)
    }
    console.log("order12", order);

    const onHide = () => {
        console.log("kapat dialog");
        setCustomerDialog(false);
    }
    const onHideOrdered = () => {
        setOrdersDialog(false);
        setKargoVrlmsMi(false)
    }
    const onHideSipFis = () => {
        setOrdersPrintDialog(false);
    }
    const onShipStats = (e) => {
        console.log("e seçim", e);
        let durum = e.target.value;
        let code = durum == "Onaylandı" ? 1 : durum == "Hazırlanıyor" ? 2
            : durum == "Kargolandı" ? 3 : durum == "Teslim Edildi" ? 4
                : durum == "Sipariş İptal" ? 5 : durum == "İade" ? 6 : 7;
        console.log("code1", code);
        let orderss = { ...order };
        orderss.shipStatus = code;
        setOrder(orderss)

    }
    console.log("seçim noldu", order);
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-user"
                    className="p-button-rounded p-button-primary mr-2"
                    onClick={() => editCustomer(rowData)}
                    tooltip="Müşteri Bilgileri" tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
                />
                <Button
                    icon="pi pi-shopping-bag"
                    className="p-button-rounded p-button-warning mr-2"
                    onClick={() => editOrder(rowData)}
                    tooltip="Sipariş Bilgileri" tooltipOptions={{ className: 'blue-tooltip', position: 'top' }} />
                <Button
                    icon="pi pi-print"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => siparisFisiFunc(rowData)}
                    tooltip="Sipariş Fişi" tooltipOptions={{ className: 'blue-tooltip', position: 'top' }} />
            </React.Fragment>
        );
    }

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }


    const allowExpansion = (rowData) => {
        return rowData.orders.length > 0;
    };
    const imageBodyTemplate = (rowData) => {
        return (
            <>
                {/* <span className="p-column-title">Image</span> */}
                <img src={rowData.product.picture} className="shadow-2" width="75" />
            </>
        )
    }

    const rowExpansionTemplate = (data) => {
        console.log("data", data);
        return (
            <div className="orders-subtable">
                {/* <h5>Orders for {data.name}</h5> */}
                <DataTable value={data.listOrderDetail} responsiveLayout="scroll">
                    <Column field="productId" header="Ürün Id" body={(e) => e.productId} sortable></Column>
                    <Column field="productName" header="Ürün Adı" body={(e) => e.product.productName} ></Column>
                    <Column field="picture" header="Resim" body={imageBodyTemplate} ></Column>
                    <Column field="quantity" header="Adet" body={(e) => e.quantity} ></Column>
                    <Column field="quantity" header="Fiyat" body={priceBody} ></Column>

                </DataTable>
            </div>
        );
    }

    const header = (
        <div className="table-header-container">
            <h5>SİPARİŞ İŞLEMLERİ</h5>
        </div>
    );

    const customerInputChange = (e, name) => {
        console.log("name", name);
        console.log("e", e);
        const val = (e.target && e.target.value) || '';
        console.log("val", val);

        let _customer = { ...customer };
        _customer[`${name}`] = val;

        setCustomer(_customer);
    }
    const orderInputChange = (e, name) => {
        console.log("name", name);
        console.log("e", e);
        const val = (e.target && e.target.value) || '';
        console.log("val", val);

        let _order = { ...order };
        _order[`${name}`] = val;

        setOrder(_order);
    }
    console.log("order nedir", order);
    const orderFooter = (
        <>
            <Button label="İptal Et" icon="pi pi-times" className="p-button-text" onClick={onHideOrdered} />
            <Button label="Kaydet" icon="pi pi-times" className="p-button-text" onClick={() => setVisibleOrder(true)} />

        </>
    );
    const footerfooter = (
        <>
            <Button label="İptal Et" icon="pi pi-times" className="p-button-text" onClick={onHide} />
            <Button label="Kaydet" icon="pi pi-times" className="p-button-text" onClick={() => setVisible(true)} />

        </>
    );

    const saveCustomer = () => {
        console.log("kapat dialog1");
        console.log("kayit124");
        if (customer.orderedId !== null) {
            axios.put("http://test.cengizyektas.com/Orders/UpdateOrdered", customer).then((res) => {
                console.log("resgt", res);
                if (res?.status === 200) {
                    toast.current.show({ severity: 'success', summary: 'BAŞARILI', detail: 'Kayıt Güncellendi', life: 3000 });

                } else {
                    toast.current.show({ severity: 'warning', summary: 'BAŞARISIZ', detail: 'Bir Hata Oluştu', life: 3000 });

                }
            })
            setListeYenile(!listeYenile)
            setCustomerDialog(false)

        }

        //kaydette Kaldık
    }
    const saveOrder = () => {
        console.log("kapat dialog1");
        console.log("1111111111111111111111111111111111111111111111111");
        if (order.orderId !== null) {
            axios.put("http://test.cengizyektas.com/Orders/UpdateOrder", order).then((res) => {
                console.log("order Response", res);
                if (res?.status === 200) {
                    toast.current.show({ severity: 'success', summary: 'BAŞARILI1', detail: 'Kayıt Güncellendi', life: 3000 });

                } else {
                    toast.current.show({ severity: 'warning', summary: 'BAŞARISIZ1', detail: 'Bir Hata Oluştu', life: 3000 });

                }
            })
            // setListeYenile(!listeYenile)
            // setCustomerDialog(false)

        }

    }

    const onShipDate = (e) => {
        console.log("onShipDate", e);
        e.setHours(e.getHours() + 4)
        let kargoTarihi = e.toISOString();
        let orderss = { ...order }
        orderss.shipDate = kargoTarihi;
        setOrder(orderss)
    }

    return (
        <div className="datatable-rowexpansion-demo">
            <Toast ref={toast} />

            <Dialog
                header="Müşteri1 Bilgileri"
                visible={customerDialog}
                maximizable
                modal
                style={{ width: '50vw' }}
                onHide={onHide}
                footer={footerfooter}
            >
                <div className="card">
                    <div className="p-fluid grid formgrid">

                        <div className="field col-12 md:col-6 ">
                            <span htmlFor="firstName">Müşteri Adı</span>
                            <InputText
                                id="firstName"
                                value={customer.firstName}
                                onChange={(e) => customerInputChange(e, 'firstName')}


                            />
                        </div>
                        <div className="field col-12 md:col-6 ">
                            <span htmlFor="lastName">Müşteri Soyadı</span>
                            <InputText
                                id="lastName"
                                value={customer.lastName}
                                onChange={(e) => customerInputChange(e, 'lastName')}


                            />
                        </div>
                        <div className="field col-12 md:col-12 ">
                            <span htmlFor="address">Müşteri Adresi</span>
                            <InputText
                                id="address"
                                value={customer.address}
                                onChange={(e) => customerInputChange(e, 'address')}
                            />
                        </div>
                        <div className="field col-12 md:col-12 ">
                            <span htmlFor="billingAddress">Fatura Adresi</span>
                            <InputText
                                id="billingAddress"
                                value={customer.billingAddress}
                                onChange={(e) => customerInputChange(e, 'billingAddress')}
                            />
                        </div>
                        <div className="field col-12 md:col-12 ">
                            <span htmlFor="phone">Müşteri Telefonu</span>
                            <InputText
                                id="phone"
                                value={customer.phone}
                                onChange={(e) => customerInputChange(e, 'phone')}
                            />
                        </div>
                        <div className="field col-12 md:col-12 ">
                            <span htmlFor="email">Müşteri E-Mail</span>
                            <InputText
                                id="email"
                                value={customer.email}
                                onChange={(e) => customerInputChange(e, 'email')}

                            />
                        </div>
                        <ConfirmDialog visible={visible} onHide={() => setVisible(false)}
                            message="Güncelleme Yapmak İstediğinize Emin Misiniz ?"
                            header="Dikkat ! " icon="pi pi-exclamation-triangle" rejectLabel="Hayır" acceptLabel="Evet" accept={saveCustomer} reject={onHide} />
                    </div>
                </div>

            </Dialog>
            <Dialog
                header="Sipariş Fişi"
                visible={ordersPrintDialog}
                modal
                style={{ width: '50vw',height:"65vw" }}
                onHide={() => onHideSipFis()}
                
            >
                <SiparisFisi siparis={seciliSiparis} />
            </Dialog>

            <Dialog
                header="Sipariş Bilgileri"
                visible={ordersDialog}
                modal
                style={{ width: '50vw' }}
                onHide={() => onHideOrdered()}
                footer={orderFooter}

            >
                {console.log("kargoVrlmsMi", kargoVrlmsMi)
                }
                <div className="card">
                    <div className="p-fluid grid formgrid">
                        {
                            kargoVrlmsMi ?
                                (
                                    <>
                                        <div className="field col-12 md:col-12 ">
                                            <span htmlFor="shipStatus">Sipariş Durumu</span>
                                            <Dropdown
                                                id="shipStatus"
                                                value={order?.shipStatus == 1 ? "Onaylandı" :
                                                    order?.shipStatus == 2 ? "Hazırlanıyor" :
                                                        order?.shipStatus == 3 ? "Kargolandı" :
                                                            order?.shipStatus == 4 ? "Teslim Edildi" :
                                                                order?.shipStatus == 5 ? "Sipariş İptal" :
                                                                    order?.shipStatus == 6 ? "İade" : "Diğer"}
                                                options={sipStat}
                                                onChange={(e) => onShipStats(e)}
                                                optionLabel="name"
                                                optionValue="code"
                                                placeholder="Sipariş Durumu Seçiniz"
                                            />

                                        </div>
                                        {
                                            order.shipStatus == 3 ?
                                                (
                                                    <>
                                                        <div className="field col-12 md:col-12 ">
                                                            <span htmlFor="lastName">Kargo Numarası</span>
                                                            <InputText
                                                                id="lastName"
                                                                maxLength={50}
                                                                value={order.shipNumber}
                                                                onChange={(e) => orderInputChange(e, 'shipNumber')}


                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                    </>
                                                )

                                        }
                                    </>
                                ) : (
                                    <>
                                        <div className="field col-12 md:col-12 ">
                                            <span htmlFor="shipDate">Kargo Tarihi</span>
                                            <Calendar
                                                id="shipDate"
                                                value={order?.shipDate}
                                                onChange={(e) => onShipDate(e.target.value)}
                                                dateFormat="dd/mm/yy"

                                            />
                                            {console.log("kargo tarihi", order?.shipDate)}

                                        </div>
                                        <div className="field col-12 md:col-12 ">
                                            <span htmlFor="shipStatus">Sipariş Durumu</span>
                                            <Dropdown
                                                id="shipStatus"
                                                value={order?.shipStatus == 1 ? "Onaylandı" :
                                                    order?.shipStatus == 2 ? "Hazırlanıyor" :
                                                        order?.shipStatus == 3 ? "Kargolandı" :
                                                            order?.shipStatus == 4 ? "Teslim Edildi" :
                                                                order?.shipStatus == 5 ? "Sipariş İptal" :
                                                                    order?.shipStatus == 6 ? "İade" : "Diğer"}
                                                options={sipStat}
                                                onChange={(e) => onShipStats(e)}
                                                optionLabel="name"
                                                optionValue="code"
                                                placeholder="Sipariş Durumu Seçiniz"
                                            />

                                        </div>
                                        {
                                            order.shipStatus == 3 || order?.shipDate !== null ?
                                                (
                                                    <>
                                                        <div className="field col-12 md:col-12 ">
                                                            <span htmlFor="lastName">Kargo Numarası</span>
                                                            <InputText
                                                                id="lastName"
                                                                maxLength={50}
                                                                value={order.shipNumber}
                                                                onChange={(e) => orderInputChange(e, 'shipNumber')}


                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                    </>
                                                )

                                        }

                                    </>
                                )
                        }
                        {/* <div className="field col-12 md:col-12 ">
                            <span htmlFor="shipDate">Kargo Tarihi</span>
                            <Calendar
                                id="shipDate"
                                value={order?.shipDate}
                                onChange={(e) => onShipDate(e.target.value)}
                                dateFormat="dd/mm/yy"

                            />
                            {console.log("kargo tarihi", order?.shipDate)}

                        </div> */}

                        <ConfirmDialog visible={visibleOrder} onHide={() => setVisibleOrder(false)}
                            message="Güncelleme Yapmak İstediğinize Emin Misiniz ?"
                            header="Dikkat ! " icon="pi pi-exclamation-triangle" rejectLabel="Hayır" acceptLabel="Evet" accept={saveOrder} reject={onHideOrdered} />

                    </div>
                </div>

            </Dialog>

            <div className="card">
                <DataTable value={orders} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    responsiveLayout="scroll"
                    rowExpansionTemplate={rowExpansionTemplate} dataKey="orderNumber" header={header}>
                    <Column expander={allowExpansion} style={{ width: '3em' }} />
                    <Column field="orderNumber" header="Sipariş No" body={(e) => e.orderId} sortable />
                    <Column field="orderDate" header="Sipariş Tarihi" body={orderDate} sortable />
                    <Column field="paid" header="Sipariş Tutarı" sortable body={paidBody} />
                    <Column field="transactStatus" header="İşlem Durumu" body={transactStatusBody} />
                    <Column field="errmsgBody" header="Banka Mesajı" sortable body={errmsgBody} />
                    <Column field="shipDate" header="Kargo Tarihi" sortable body={shipDate} />
                    <Column field="shipStatus" header="Sipariş Durumu" body={shipStatus} />
                    <Column header="İşlem Menüsü" body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(OrderPages, comparisonFn)
