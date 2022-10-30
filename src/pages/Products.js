import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import DosyaYukleme from '../components/DosyaYukle';

const Products = () => {
    let emptyProduct = {
        productId: -1,
        productName: '',
        productDescription: "",
        supplierId: 1,
        categoryId: null,
        unitPrice: 0,
        picture: null,
        sizeId: 1,
        colorId: 1,
        discount: 0,
        discountAvailable: null,
        currentOrder: true,
        quantityPerUnit: 0,
        purchasePrice: 0,
        basePrice: 0,
        productDay: null,
        campaigns: null,
        stock_code: null,
        barcode: null,
        currentOrder: false,
        process_id: 0,
        status : true

    };

    const kullanimDurumu = [
        {
            code: "Kullanımda",
            aciklama: "Kullanımda"
        },
        {
            code: "Kullanımda Değil",
            aciklama: "Kullanımda Değil"
        }
    ]

    const evetHayir = [
        {
            code: "EVET",
            descrp: "EVET"
        },
        {
            code: "HAYIR",
            descrp: "HAYIR"
        }
    ]
    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [productList, setProductList] = useState(null);
    const [categoryList, setCategoryList] = useState(null);
    const [editProducts, setEditProducts] = useState(false);
    const [kayitSonuc, setKayitSonuc] = useState(false);
    const [productID, setProductID] = useState(null);
    const [yenile, setYenile] = useState(null);

    console.log("kayitSonuc", kayitSonuc);

    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        axios.get("http://test.cengizyektas.com/Category/GetCategoryList").then((response) => {
            setCategoryList(response?.data?.data?.categories)
            console.log("res1222", response);
        })
    }, [])

    useEffect(() => {
        console.log("YENİLENDİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİ");
        axios.get("http://test.cengizyektas.com/Product/GetProductList").then((response) => {
            setProductList(response?.data?.data)
            console.log("ressafa1222", response);
        })
    }, [yenile])


    console.log("productList", productList);


    const openNew = () => {
        setProduct(emptyProduct);
        setEditProducts(false)
        setSubmitted(false);
        setProductDialog(true);
        setKayitSonuc(false)

    }

    const hideDialog = () => {
        setKayitSonuc(false)
        setEditProducts(false)
        setSubmitted(false);
        setProductDialog(false);
    }



    const saveProduct = () => {
        let crrntordr = { ...product };
        crrntordr.currentOrder = false;
        setProduct(crrntordr)
        setSubmitted(true);
        console.log("prod12", product);
        console.log("editProduct444s", editProducts);
        if (product.productName !== null) {
            const addProduct = {
                productName: product.productName,
                productDescription: product.productDescription,
                supplierId: 1,
                categoryId: product.categoryId,
                unitPrice: product.unitPrice,
                sizeId: 1,
                colorId: 1,
                discount: product.discount,
                discountAvailable: product.discountAvailable,
                currentOrder: product.currentOrder,
                quantityPerUnit: product.quantityPerUnit,
                purchasePrice: product.purchasePrice,
                basePrice: product.basePrice,
                productDay: product.productDay,
                campaigns: 0,
                stock_code: product.stock_code,
                barcode: product.barcode,
                picture: null,
                process_id: 0,
                status: true,
                updated_at:new Date()


            }

            if (product.productId > -1) {
                const updateProduct = {
                    productId: product.productId,
                    productName: product.productName,
                    productDescription: product.productDescription,
                    supplierId: 1,
                    categoryId: product.categoryId,
                    unitPrice: product.unitPrice,
                    sizeId: 1,
                    colorId: 1,
                    discount: product.discount,
                    discountAvailable: product.discountAvailable,
                    currentOrder: product.currentOrder,
                    quantityPerUnit: product.quantityPerUnit,
                    purchasePrice: product.purchasePrice,
                    basePrice: product.basePrice,
                    productDay: product.productDay,
                    campaigns: product.campaigns,
                    stock_code: product.stock_code,
                    barcode: product.barcode,
                    picture: null,
                    status: product.status,
                    process_id: product.process_id,
                    updated_at:new Date()


                }
                console.log("UPDATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                axios.post("http://test.cengizyektas.com/Product/UpdateProduct", updateProduct).then((response) => {
                    // setProductList(response?.data?.data)7
                    console.log("update oldu mu ", response);
                    toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Ürün Başarılı Şekilde Güncellendi', life: 3000 });


                })
            }
            else {
                axios.post("http://test.cengizyektas.com/Product/AddProduct", addProduct).then((response) => {
                    // setProductList(response?.data?.data.productId)
                    if (response.status == 200) {
                        console.log("respons222e", response);
                        setKayitSonuc(true)
                        setProductID(response?.data?.data?.productId)
                        toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Ürün Başarılı Şekilde Eklend,', life: 3000 });

                    }

                })


            }

            // setProductDialog(false);
            setYenile(!yenile)
            // setProduct(emptyProduct);
        }
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
        setProductID(product.productId)
        setKayitSonuc(true)
        setEditProducts(true)
    }






    const onCategoryChange = (e, name) => {
        console.log("category change", e);
        let _product = { ...product };
        _product[name] = e.value;
        setProduct(_product);
    }

    const onInputChange = (e, name) => {
        console.log("eeeees", e);
        const val = (e.target && e.target.value) || '';
        console.log("val", val);
        if (name == "basePrice") {
            let price = val.toString();
            let _product = { ...product };
            _product[`${name}`] = price;

            setProduct(_product);
        } else {
            let price = val;
            let _product = { ...product };
            _product[`${name}`] = price;

            setProduct(_product);
        }

    }
    const stokChange = (e, name) => {
        console.log("eeeees", e);
        const val = e.target.value;
        console.log("val", val);
        let price = val;
        let _product = { ...product };
        _product[`${name}`] = price;

        setProduct(_product);


    }
    //discount ve productday seçim
    const discountChange = (e, name) => {
        console.log("eee2", e);
        console.log("name", name);
        if (name == "campaigns") {
            let secim = e.value;
            let _durum = secim == "EVET" ? 1 : 0
            let urunler = { ...product }
            urunler[`${name}`] = _durum;
            setProduct(urunler);
        } else {
            let secim = e.value;
            let _durum = secim == "EVET" ? true : false
            let urunler = { ...product }
            urunler[`${name}`] = _durum;
            setProduct(urunler);
        }


    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Ürün Ekle" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
                </div>
            </React.Fragment>
        )
    }




    const imageBodyTemplate = (rowData) => {
        return (
            <>
                {/* <span className="p-column-title">Image</span> */}
                <img src={rowData.picture} className="shadow-2" width="100" />
            </>
        )
    }

    const aciklamaTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {rowData.description}
            </>
        );
    }



    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status == true ? "Kullanımda" : "Kullanımda Değil"}
            </>
        )
    }
    const productDayTemplate = (rowData) => {
        return (
            <>
                {rowData.productDay == true ? "EVET" : "HAYIR"}
            </>
        )
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteProduct(rowData)} /> */}
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ÜRÜN İŞLEMLERİ</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Ürün Ara..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="İptal Et" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Kaydet" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );


    { console.log("product.basePrice", product) }


    console.log("product STATE", product);



    const onStatusChange = (e) => {
        console.log("E1", e);
        let durum = e.target.value;
        let code = durum == "Kullanımda" ? true : false;
        console.log("code1", code);
        let prdct = { ...product };
        prdct.status = code;
        setProduct(prdct)

    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
                    {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                    <DataTable
                        ref={dt}
                        value={productList}
                        selection={selectedProducts}
                        showGridlines
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Gösterilen ürün {first} ile {last} arasında, toplam ürün sayısı : {totalRecords} "
                        globalFilter={globalFilter} emptyMessage="Ürün bulunamamıştır." header={header} responsiveLayout="scroll">
                        <Column field="productId" header="Ürün Id" style={{ width: '5rem' }} body={(e) => e.productId}></Column>
                        <Column field="productName" header="Ürün Adı" style={{ minWidth: '30rem' }} body={(e) => e.productName}></Column>
                        {/* <Column field="productName" header="Kategori Adı" style={{ width: '5rem' }} body={(e) => e.categoryId}></Column> */}
                        <Column header="Resim" style={{ width: '10rem' }} body={imageBodyTemplate}></Column>
                        <Column field="basePrice" header="Alış Fiyat" style={{ width: '5rem' }} sortable body={(e) => e.basePrice}></Column>
                        <Column field="unitPrice" header="Satış Fiyat" style={{ width: '5rem' }} sortable body={(e) => e.unitPrice}></Column>
                        <Column field="purchasePrice" header="$ Karşılığı" style={{ width: '5rem' }} sortable body={(e) => e.purchasePrice}></Column>
                        <Column field="quantityPerUnit" header="Stok" style={{ width: '5rem' }} sortable body={(e) => e.quantityPerUnit}></Column>
                        {/* <Column field="stock_code" header="Stok Kodu" style={{ width: '5rem' }} body={(e) => e.stock_code}></Column> */}
                        <Column field="barcode" header="Barcode" style={{ minWiwidthdth: '5rem' }} body={(e) => e.barcode}></Column>
                        <Column field="platform" header="Platform Id" style={{ width: '5rem' }} body={(e) => e.process_id}></Column>
                        {/* <Column field="productDay" header="Günün Ürünü" style={{ width: '5rem' }} body={(productDayTemplate)}></Column> */}
                        <Column header="Aktif Durum" style={{ width: '5rem' }} body={(statusBodyTemplate)}></Column>
                        <Column header="Güncelle" style={{ width: '5rem' }} body={actionBodyTemplate} ></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '1400px', height: '1000px' }} header="ÜRÜN EKLE" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="card">
                            <div className="p-fluid grid formgrid">
                                <div className="field col-12 md:col-12 ">
                                    <span htmlFor="name">Ürün Adı Giriniz</span>
                                    <InputText
                                        id="name"
                                        maxLength={300}
                                        value={product.productName}
                                        onChange={(e) => onInputChange(e, 'productName')}
                                        required
                                        autoFocus
                                        // disabled={kayitSonuc}
                                        className={classNames({ 'p-invalid': submitted && !product.productName })} />
                                    {submitted && !product.productName && <small className="p-invalid">Ürün Adı Zorunludur.</small>}
                                </div>


                                <div className="field col-12 md:col-12">
                                    <span htmlFor="description">Açıklama Giriniz</span>
                                    <InputTextarea
                                        id="description"
                                        maxLength={1000}
                                        value={product.productDescription}
                                        onChange={(e) => onInputChange(e, 'productDescription')}
                                        required rows={3} cols={20}
                                    // disabled={kayitSonuc}
                                    />
                                </div>


                                <div className="grid p-fluid">
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="birim-fiyat">Ürün Kategorisi</span>

                                        <Dropdown
                                            value={product.categoryId}
                                            options={categoryList}
                                            onChange={(e) => onCategoryChange(e, "categoryId")}
                                            optionLabel="categoryName"
                                            optionValue="categoryId"
                                            placeholder="Ürün Kategorisi Seçiniz"
                                        // disabled={kayitSonuc}
                                        />
                                        {console.log("kategori ne ", product)}
                                        {console.log("categoryList ", categoryList)}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="birim-fiyat">Alış Fiyatı Giriniz</span>
                                        <InputNumber
                                            inputId="birim-fiyat"
                                            value={product.basePrice}
                                            onValueChange={(e) => onInputChange(e, "basePrice")}
                                            mode="decimal"
                                            locale="en-US"
                                            minFractionDigits={2}
                                        // disabled={kayitSonuc}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="indirim-tutar">Satış Fiyatı Giriniz(TL)</span>
                                        <InputNumber
                                            inputId="indirim-tutar"
                                            value={product.unitPrice}
                                            onValueChange={(e) => onInputChange(e, "unitPrice")}
                                            mode="decimal"
                                            locale="en-US"
                                            minFractionDigits={2}
                                        // disabled={kayitSonuc}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="indirim-tutar">Satış Fiyatı Giriniz($)</span>
                                        <InputNumber
                                            inputId="indirim-tutar"
                                            value={product.purchasePrice}
                                            onValueChange={(e) => onInputChange(e, "purchasePrice")}
                                            mode="decimal"
                                            locale="en-US"
                                            minFractionDigits={2}
                                        // disabled={kayitSonuc}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="stok">Stok Miktarı Giriniz</span>
                                        <InputNumber
                                            inputId="stok"
                                            value={product.quantityPerUnit}
                                            onValueChange={(e) => stokChange(e, "quantityPerUnit")}
                                        // disabled={kayitSonuc}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="stok">İndirim Miktarı Giriniz (TL)</span>
                                        <InputNumber
                                            inputId="stok"
                                            value={product.discount}
                                            // disabled={kayitSonuc}
                                            onValueChange={(e) => onInputChange(e, "discount")} />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="indirim-tutar">İndirim Durumu Seçiniz</span>

                                        <Dropdown
                                            value={product.discountAvailable ? "EVET" : product.discountAvailable == false ? "HAYIR" : ""}
                                            options={evetHayir}
                                            onChange={(e) => discountChange(e, "discountAvailable")}
                                            optionLabel="descrp"
                                            optionValue="code"
                                            // disabled={kayitSonuc}
                                            placeholder="İndirimli Ürün Mü ?" />
                                        {console.log("İndirimli", product.discountAvailable)}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="indirim-tutar">Günün Ürünü Durumu Seçiniz</span>

                                        <Dropdown
                                            value={product.productDay ? "EVET" : product.productDay == false ? "HAYIR" : ""}
                                            options={evetHayir}
                                            onChange={(e) => discountChange(e, "productDay")}
                                            optionLabel="descrp"
                                            optionValue="code"
                                            // disabled={kayitSonuc}
                                            placeholder="Günün Ürünü Mü ?" />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="process_id">Shopside Numarası</span>
                                        <InputNumber
                                            inputId="process_id"
                                            value={product.process_id}
                                            // disabled={kayitSonuc}
                                            onValueChange={(e) => onInputChange(e, "process_id")} />
                                    </div>
                                    <div className="field col-12 md:col-6 ">
                                        <span htmlFor="stock_code">Stok Kodu Giriniz</span>
                                        <InputText
                                            id="stock_code"
                                            maxLength={20}
                                            value={product.stock_code}
                                            onChange={(e) => onInputChange(e, 'stock_code')}
                                            required />
                                    </div>
                                    <div className="field col-12 md:col-6 ">
                                        <span htmlFor="barcode">Barcode Numarası Giriniz</span>
                                        <InputText
                                            id="barcode"
                                            maxLength={20}
                                            value={product.barcode}
                                            onChange={(e) => onInputChange(e, 'barcode')} />
                                    </div>
                                    {editProducts ? (
                                        <>
                                            <div className="field col-12 md:col-6">
                                                <span htmlFor="indirim-tutar">Kullanım Durumu Seçiniz</span>

                                                <Dropdown
                                                    value={product.status ? "Kullanımda" : product.status == false ? "Kullanımda Değil" : ""}
                                                    options={kullanimDurumu}
                                                    onChange={(e) => onStatusChange(e)}
                                                    optionLabel="aciklama"
                                                    optionValue='code'
                                                    placeholder="Kullanım Durumu Seçiniz" />
                                            </div>
                                            <div className="field col-12 md:col-6">
                                                <span htmlFor="indirim-tutar">Kampanyalı Ürün Mü ?</span>
                                                <Dropdown
                                                    value={product.campaigns == 1 ? "EVET" : product.campaigns == 0 ? "HAYIR" : ""}
                                                    options={evetHayir}
                                                    onChange={(e) => discountChange(e, "campaigns")}
                                                    optionLabel="descrp"
                                                    optionValue='code'
                                                    placeholder="Kampanya Durumu Seçiniz" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}

                                    {kayitSonuc !== false ? (
                                        <>
                                            <div className="field col-12 md:col-12">
                                                <span htmlFor="indirim-tutar">Resim Yükleme/Silme</span>

                                                <DosyaYukleme
                                                    productId={productID} // ilgili kaydın id numarası
                                                    dosyaYukle={true} // dosya yükle ekranı açık olsun
                                                    listeDosyaSil={true} // dosya silme butonu açık olsun
                                                />
                                            </div>
                                            {console.log("productIDID", productID)}
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}




                                </div>
                            </div>
                        </div>

                    </Dialog>


                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Products, comparisonFn)