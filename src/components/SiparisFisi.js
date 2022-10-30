import React from "react";
import "./styles.css";
import Pdf from "react-to-pdf";
import { pdfFromReact } from "generate-pdf-from-react-html";


const SiparisFisi = (props) => {

    const { siparis } = props;

    const egcTeknik = {
        name : "EGÇ Teknik",
        address : "İnönü, 1754 sk. No:7  Ostim OSB/Yenimahalle ANKARA",
        phone : "0551 975 73 93",
        shipmentType: "Gönderici Ödemeli"

    }

    const ref = React.createRef();
    let thisThing = "la";
    console.log("sipariş ne ", siparis);

    return (
        <div className="invoice-box" ref={ref}>

            <table cellPadding="0" cellSpacing="0">
                <tbody>
                    <tr className="top">
                        <td colSpan={2}>
                            <table>
                                <tr>
                                    <td className="title">
                                        <img src="assets/layout/images/logo-4.png" height={"90px"} alt="logo" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="siparis-no">
                                        Sipariş No : {siparis.orderId}<br />
                                        Tarihi: {new Date(siparis.orderDate).toLocaleString().split(' ')[0]}<br />
                                        Gönderi Tipi: {egcTeknik.shipmentType}<br />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr className="information">
                        <td colSpan={2}>
                            <table>
                                <tr >
                                    <td className="gonderen">
                                        Gönderici:
                                    </td>
                                    <tr>
                                        <td className="gonderen-bilgi">
                                            {egcTeknik.name}<br />
                                            {egcTeknik.address}<br />
                                            {egcTeknik.phone}
                                        </td>
                                    </tr>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td className="gonderen">
                                        Alıcı:
                                    </td>
                                    <tr>
                                        <td className="gonderen-bilgi">
                                            {siparis.listOrderDetail
                                            [0].ordered.firstName + " " + siparis.listOrderDetail
                                            [0].ordered.lastName}<br />
                                            {siparis.listOrderDetail
                                            [0].ordered.address}<br />
                                            {siparis.listOrderDetail
                                            [0].ordered.phone}
                                        </td>
                                    </tr>
                                </tr>


                            </table>
                        </td>
                    </tr>





                    <tr className="heading">
                        <td>Ürünler</td>

                        <td>Fiyat</td>
                    </tr>
                    {
                      siparis.listOrderDetail.map((item)=>
                      <tr className="item">
                        <td>{item.product.productName} </td>

                        <td>{item.product.unitPrice} TL</td>
                    </tr> 
                      )
                    }
                    


                    <tr className="total">
                        <td></td>

                        <td>Toplam : {siparis.paid}TL</td>
                    </tr>
                </tbody>
            </table>





            <div>
                <Pdf targetRef={ref} filename="siparişFişi.pdf">
                    {({ toPdf }) => (
                        <button className="button" onClick={toPdf}>
                            PDF İndir
                        </button>
                    )}
                </Pdf>
            </div>
        </div>

    );
}
export default SiparisFisi;