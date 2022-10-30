import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { DataScroller } from 'primereact/datascroller';
import axios from 'axios';
import './DataScrollerDemo.css';

const lineData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    datasets: [
        {
            label: 'Satışı Gerçekleşen',
            data: [65, 59, 80, 81, 56, 90, 125, 163, 185, 166, 198, 129],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: .4
        },
        {
            label: 'İade Olan',
            data: [4, 2, 7, 10, 15, 3, 8, 15, 21, 15, 2, 34, 16],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: .4
        }
    ]
};

const Dashboard = (props) => {
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null)
    const [azalanStok, setAzalanStok] = useState(null)
    const [sonSatilanlar, setSonSatilanlar] = useState(null)
    const [enCokSatan, setEnCokSatan] = useState(null)
    const [order, setOrder] = useState(null)



    const applyLightTheme = () => {

        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    useEffect(() => {
        const productService = new ProductService();
        productService.getProductsSmall().then(data => setProducts(data));
    }, []);

    useEffect(() => {
        axios.get(`http://test.cengizyektas.com/Dashboard/GetAlarmStok?alarmsiniri=${5}`).then((response) => {
            setAzalanStok(response?.data?.data)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://test.cengizyektas.com/Dashboard/GetLastProdut?adet=${15}`).then((response) => {
            // http://test.cengizyektas.com/Dashboard/GetLastProdut?adet=15'
            console.log("response2", response);
            setSonSatilanlar(response?.data?.data)
        })
    }, [])
    useEffect(() => {
        axios.get("http://test.cengizyektas.com/Dashboard/GetOrder").then((response) => {
            // http://test.cengizyektas.com/Dashboard/GetLastProdut?adet=15'
            console.log("setOrder", response);
            setOrder(response?.data?.data)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://test.cengizyektas.com/Dashboard/GetEnCokSatanUrunler?sayi=${10}`).then((response) => {
            // http://test.cengizyektas.com/Dashboard/GetLastProdut?adet=15'
            console.log("response2", response);
            setEnCokSatan(response?.data?.data)
        })
    }, [])

    console.log("setAzalanStok1", azalanStok);
    console.log("setSonSatilanlar", sonSatilanlar);
    console.log("setEnCokSatan", enCokSatan);
    console.log("ORDER", order);


    useEffect(() => {
        if (props.colorMode === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);

    const formatCurrency = (value) => {
        return value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 2, });
    };

    const productDayTemplate = (rowData) => {
        return (
            <>
                {rowData.productDay == true ? "EVET" : "HAYIR"}
            </>
        )
    }


    const stokTemplate = (data) => {
        return (
            <div className="product-item">
                <img src={data.picture} alt={data.picture} width="50" />
                <div className="product-detail">
                    <div className="product-name">{data.productName}</div>
                    <div className="product-description">Stok Sayısı : {data.quantityPerUnit}</div>
                    <i className="product-category-icon"> Stok Kodu : </i><span className="product-category">{data.stock_code}</span>
                    {/* <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span> */}
                </div>

            </div>
        );
    }
    const enCokSatanTemplate = (data) => {
        return (
            <div className="product-item">
                {/* <img src={data.picture} alt={data.picture} width="50" /> */}
                <i className="pi pi-shopping-bag satis-icon " style={{ 'fontSize': '2em' }}></i>

                <div className="product-detail">
                    <div className="product-name-satis">{data.productName}</div>
                    <div className="product-description-satis"> Satış Adeti :  {data.adet}</div>
                    {/* <i className="product-category-icon"> Stok Kodu : </i><span className="product-category">{data.stock_code}</span> */}
                    {/* <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span> */}
                </div>

            </div>
        );
    }

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Günlük Sipariş Sayısı</span>
                            <div className="text-900 font-medium text-xl">{order?.gunlukSatisAdet}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">{order?.gunlukKargoAdet} </span>
                    <span className="text-500">Sipariş kargoya verildi</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Günlük Kazanç</span>
                            <div className="text-900 font-medium text-xl">{order?.gunlukSatisTutar}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-dollar text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">{order?.gunlukSatisTutar} TL  </span>
                    <span className="text-500">Kesinleşen kazanç</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Toplam Müşteri</span>
                            <div className="text-900 font-medium text-xl">{order?.toplamMusteri}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-user text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium"> 0 </span>
                    <span className="text-500">Yeni müşteri</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Aylık Toplam Satış Adeti</span>
                            <div className="text-900 font-medium text-xl">{order?.buAyToplamSatisAdet}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-dollar text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">{order?.buAyToplamSatisTutar} </span>
                    <span className="text-500"> TL / Aylık Toplam Kazanç</span>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>En Son Satılan Ürünler</h5>
                    <DataTable value={sonSatilanlar} rows={5} paginator responsiveLayout="scroll" size="normal" emptyMessage="Kayıt Bulunamamıştır. ">
                        <Column header="Resim" body={(data) => <img className="shadow-2" src={data.picture} alt={data.picture} width="50" />} />
                        <Column field="productName" header="Ürün Adı" sortable body={(e) => e.productName} style={{ width: '35%' }} />
                        <Column field="unitPrice" header="Satış Fiyatı" sortable style={{ width: '35%' }} body={(data) => formatCurrency(data.unitPrice)} />
                        <Column field="quantityPerUnit" header="Stok Sayısı" sortable body={(e) => e.quantityPerUnit} style={{ width: '15%' }} />
                        <Column field="productDay" header="Günün Ürünü" body={(productDayTemplate)}></Column>

                    </DataTable>
                </div>
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-5">
                        <h5>Stok Durumu</h5>
                    </div>
                    <div className="datascroller-demo">
                        <DataScroller size="normal" value={azalanStok} itemTemplate={stokTemplate} rows={5} inline scrollHeight="500px" emptyMessage="Kayıt Bulunamamıştır. " header="Stok Sayısı 5 ve Altı Ürünler" />
                    </div>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Satış/İade Grafiği</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>

                <div className="card">
                    <div className="flex align-items-center justify-content-between mb-4">
                        <h5>En Çok Satan Ürünler</h5>
                    </div>
                    <div className="datascroller-demo">
                        <DataScroller size="normal" value={enCokSatan} itemTemplate={enCokSatanTemplate} rows={5} inline scrollHeight="500px" emptyMessage="Kayıt Bulunamamıştır. " header="En Çok Satan Ürünler" />
                    </div>



                </div>

            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return (prevProps.location.pathname === nextProps.location.pathname) && (prevProps.colorMode === nextProps.colorMode);
};

export default React.memo(Dashboard, comparisonFn);
