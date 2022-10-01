import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProductService } from '../service/ProductService';
import { PhotoService } from '../service/PhotoService';
import { Galleria } from 'primereact/galleria';
import { LogarithmicScale } from 'chart.js';
import { Checkbox } from 'primereact/checkbox';
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
        sizeId: 1,
        colorId: 1,
        discount: 0,
        discountAvailable: true,
        currentOrder: true,
        quantityPerUnit: 0,
        purchasePrice: 0,
        basePrice: 0,
        productDay: true
    };

    const kullanimDurumu = [
        {
            code: 1,
            aciklama: "Kullanımda"
        },
        {
            code: 2,
            aciklama: "Kullanımda Değil"
        }
    ]

    const evetHayir = [
        {
            code: 1,
            descrp: "EVET"
        },
        {
            code: 2,
            descrp: "HAYIR"
        }
    ]
    const fileUploadRef = useRef(null);
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [durumu, setDurumu] = useState(null);
    const [renk, setRenk] = useState(null);
    const [olcu, setOlcu] = useState(null);
    const [value6, setValue6] = useState(null);
    const [images, setImages] = useState(null);
    const [productList, setProductList] = useState(null);
    const [categoryList, setCategoryList] = useState(null);
    const [checked, setChecked] = useState(false);
    const [editProducts, setEditProducts] = useState(false);
    const [kayitSonuc, setKayitSonuc] = useState(false);
    const [productID, setProductID] = useState(null);
    console.log("kayitSonuc", kayitSonuc);

    const galleriaService = new PhotoService();

    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        axios.get("http://test.cengizyektas.com/Category/GetCategoryList").then((response) => {
            setCategoryList(response?.data?.data?.categories)
            console.log("res1222", response);
        })
    }, [])

    useEffect(() => {
        axios.get("http://test.cengizyektas.com/Product/GetProductList").then((response) => {
            setProductList(response?.data?.data)
            console.log("res1222", response);
        })
    }, [])


    console.log("productList", productList);
    console.log("categoryList", categoryList);


    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];


    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ width: '100%' }} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} />
    }
    // <img src={`assets/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />


    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);
        console.log("prod12", product);
        if (editProducts !== true) {
            const addProduct = {
                productName: product.productName,
                productDescription: product.productDescription,
                supplierId: 1,
                categoryId: product.categoryId,
                unitPrice: product.unitPrice,
                sizeId: 1,
                colorId: 1,
                discount: product.discount,
                discountAvailable: product.discountAvailable == 1 ? true : false,
                currentOrder: product.currentOrder,
                quantityPerUnit: product.quantityPerUnit,
                purchasePrice: product.purchasePrice,
                basePrice: "3242",
                productDay: product.productDay == 1 ? true : false,

            }

            if (product.productId > -1) {

                axios.post("http://test.cengizyektas.com/Product/UpdateProduct", product).then((response) => {
                    // setProductList(response?.data?.data)

                })
            }
            else {
                axios.post("http://test.cengizyektas.com/Product/AddProduct", addProduct).then((response) => {
                    // setProductList(response?.data?.data.productId)
                    if (response.status == 200) {
                        console.log("respons222e",response);
                        // setKayitSonuc(true)
                        setProductID(response?.data?.data.productId)
                    }

                })


            }

            // setProductDialog(false);
            // setProduct(emptyProduct);
        }
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
        setProductID(product.productId)
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    

    

    const onCategoryChange = (e, name) => {
        console.log("category change", e);
        let _product = { ...product };
        _product[name] = e.value;
        setProduct(_product);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let baseprice = val.toString();
        let _product = { ...product };
        _product[`${name}`] = baseprice;

        setProduct(_product);
    }
    //discount ve productday seçim
    const discountChange = (e, name) => {
        console.log("eee2", e);
        console.log("name", name);
        let secim = e.value;
        // let _durum = secim.code == 1 ? true : false;
        let urunler = { ...product }
        urunler[`${name}`] = secim;
        setProduct(urunler);
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

    // const rightToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
    //             <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
    //         </React.Fragment>
    //     )
    // }

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.id}
            </>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.productName}
            </>
        );
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
            <Button label="Kaydet" icon="pi pi-check" className="p-button-text" disabled={kayitSonuc} onClick={saveProduct} />
        </>
    );
    
    
    { console.log("product.basePrice", product) }


    console.log("product STATE", product);

    // const _dosyaYukle = (event) => {
    //     console.log("event _dosyaYukle",event);
    //     setBarYukleniyor(true) // yükleniyor barı aktif olsun
    //     setNumberofTry(numberofTry + 1)

    //     const [file] = event.files;
    //     const fileReader = new FileReader();

    //     fileReader.onload = async (e) => {
    //         console.log("e onload", e);
    //         let fileBase64 = await e.target.result.split("base64,");
    //         fileBase64 = fileBase64[fileBase64.length - 1]
    //         let fileType = await file.type;
    //         let fileName = await file.name;
    //         let fileExtension = fileName.split(".");
    //         fileExtension = await fileExtension[fileExtension.length - 1];



    //         const dosyaYukleniyor = {

    //             tblid: tblid, // props tan gelen
    //             tblno: tblno, // propstan gelen
    //             dsyad: fileName,
    //             dsyuzn: fileExtension,
    //             contentType: fileType,
    //             dosyaBase64: fileBase64,
    //             dsytnm: dosyaTanimi

    //         }

    //         console.log("dosya//", dosyaYukleniyor)

    //     //     dispatch(addDosya(dosyaYukleniyor))
    //     //         .then(() => {
    //     //             setBarYukleniyor(false) // yükleniyor barı kapatma
    //     //             _dosyaListele(); // dosya listele fonksiyonunu yeniden yükle
    //     //             setTotalSize(0);
    //     //             setSilindi(false);

    //     //             fileUploadRef.current.clear();


    //     //         });


    //      };
    //     fileReader.readAsDataURL(file);


    // };
    // const onTemplateUpload = (e) => {
    //     console.log("e onTemplateUpload", e);
    //     let _totalSize = 0;
    //     e.files.forEach(file => {
    //         _totalSize += (file.size || 0);
    //     });


    //     setTotalSize(_totalSize);
    //     onUpload();
    // }
    // const onTemplateSelect = (e) => {
    //     console.log("e onTemplateSelect",e);
    //     let _totalSize = totalSize;


    //     for (const file of e.files) {
    //         _totalSize += file.size;
    //     }

    //     setTotalSize(_totalSize);

    // }
    // const onTemplateClear = () => {
    //     setTotalSize(0);
    // }

    {console.log("product.id",product.id)}

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
                    {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                    <DataTable ref={dt} value={productList} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Gösterilen ürün {first} ile {last} arasında, toplam ürün sayısı : {totalRecords} "
                        globalFilter={globalFilter} emptyMessage="Ürün bulunamamıştır." header={header} responsiveLayout="scroll">
                        <Column field="productName" header="ÜRÜN ADI" body={nameBodyTemplate}></Column>
                        <Column header="RESMİ" body={imageBodyTemplate}></Column>
                        <Column field="basePrice" header="FİYATI" body={(e) => e.basePrice}></Column>
                        <Column field="quantityPerUnit" header="STOK" body={(e) => e.quantityPerUnit}></Column>
                        <Column field="productDescription" header="AÇIKLAMASI" body={(e) => e.productDescription}></Column>
                        <Column header="KULLANIM DURUMU" body={(statusBodyTemplate)}></Column>
                        <Column header="GÜNCELLE" body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '1400px', height: '1000px' }} header="ÜRÜN EKLE" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="card">
                            <div className="p-fluid grid formgrid">

                                <div className="field col-12 md:col-12 ">
                                    <span htmlFor="name">Ürün Adı Giriniz</span>
                                    <InputText
                                        id="name"
                                        maxLength={200}
                                        value={product.productName}
                                        onChange={(e) => onInputChange(e, 'productName')}
                                        required
                                        autoFocus
                                        disabled={kayitSonuc}
                                        className={classNames({ 'p-invalid': submitted && !product.productName })} />
                                    {submitted && !product.productName && <small className="p-invalid">Ürün Adı Zorunludur.</small>}
                                </div>


                                <div className="field col-12 md:col-12">
                                    <span htmlFor="description">Açıklama Giriniz</span>
                                    <InputTextarea
                                        id="description"
                                        maxLength={300}
                                        value={product.productDescription}
                                        onChange={(e) => onInputChange(e, 'productDescription')}
                                        required rows={3} cols={20}
                                        disabled={kayitSonuc}
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
                                            disabled={kayitSonuc}
                                        />
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
                                            disabled={kayitSonuc}
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
                                            disabled={kayitSonuc}
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
                                            disabled={kayitSonuc}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="stok">Stok Miktarı Giriniz</span>
                                        <InputNumber
                                            inputId="stok"
                                            value={product.quantityPerUnit}
                                            onValueChange={(e) => onInputChange(e, "quantityPerUnit")}
                                            disabled={kayitSonuc}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <span htmlFor="stok">İndirim Miktarı Giriniz (TL)</span>
                                        <InputNumber
                                            inputId="stok"
                                            value={product.discount}
                                            disabled={kayitSonuc}
                                            onValueChange={(e) => onInputChange(e, "discount")} />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <Dropdown
                                            value={product.discountAvailable}
                                            options={evetHayir}
                                            onChange={(e) => discountChange(e, "discountAvailable")}
                                            optionLabel="descrp"
                                            optionValue="code"
                                            disabled={kayitSonuc}
                                            placeholder="İndirimli Ürün Mü ?" />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <Dropdown
                                            value={product.productDay}
                                            options={evetHayir}
                                            onChange={(e) => discountChange(e, "productDay")}
                                            optionLabel="descrp"
                                            optionValue="code"
                                            disabled={kayitSonuc}
                                            placeholder="Günün Ürün Mü ?" />
                                    </div>
                                    {editProducts ? (
                                        <>
                                            <div className="field col-12 md:col-6">
                                                <br />
                                                <Dropdown value={durumu} options={kullanimDurumu} onChange={(e) => setDurumu(e.target.value)} optionLabel="aciklama" placeholder="Kullanım Durumu Seçiniz" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}

                                    {kayitSonuc !== true ? (
                                        <>
                                                <div className="field col-12 md:col-12">
                                                    <DosyaYukleme
                                                        productId={productID} // ilgili kaydın id numarası
                                                        tabloAdi="TEmriTemel" // ilgili kayıt hangi tabloda tutulmaktadır
                                                        dosyaYukle={true} // dosya yükle ekranı açık olsun
                                                        listeDosyaSil={true} // dosya silme butonu açık olsun
                                                    />
                                            </div>
                                        {console.log("productIDID",productID)}
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