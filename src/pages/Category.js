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
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';
import { ProductService } from '../service/ProductService';
import { ProgressBar } from 'primereact/progressbar';
import axios from 'axios';


const Category = () => {
    let emptyCategories = {
        categoryId: null,
        categoryName: '',
        picture: null,
        description: '',
        pictureBase64: null,
        active: 0,
    };

    const kullanimDurumu = [
        {
            code: 1,
            name: "Kullanımda"
        },
        {
            code: 2,
            name: "Kullanımda Değil"
        }
    ]

    const base214 = "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')";
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyCategories);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [durumu, setDurumu] = useState(null);
    const [category, setCategory] = useState(emptyCategories)
    const [categoryList, setCategoryList] = useState();
    const [totalSize, setTotalSize] = useState(0);
    const [convertImage, setConvertImage] = useState();
    const [base64, setBase64] = useState(null);


    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then(data => setProducts(data));
    }, []);

    useEffect(() => {
        axios.get("http://test.cengizyektas.com/Category/GetCategoryList").then((response) => {
            setCategoryList(response?.data?.data?.categories)
            console.log("res1", response);
        })
    }, [])

    console.log("categoryList", categoryList);
    const openNew = () => {
        setProduct(emptyCategories);
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
    const onTemplateSelect = (e) => {
        console.log("e4", e);
        // let _totalSize = totalSize;
        // e.files.forEach(file => {
        //     _totalSize += file.size;
        // });

        // setTotalSize(_totalSize);
    }

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        console.log("eee", event);
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            console.log("base64", base64data);
        }
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (product.categoryName !== null && product.description !== null && product.categoryId == -1) {
            let addCategory = {
                categoryName: product.categoryName,
                description: product.description,
                pictureBase64: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
                active: product.active,
                picture: "Test Picture"
            }

            axios.post("http://test.cengizyektas.com/Category/AddCategory", addCategory).then((response) => {
                // setCategoryList(response?.data?.data?.categories)
                console.log("res12", response);
            })            
        } else {

            let updateCategory = {
                categoryId : product.categoryId,
                categoryName: product.categoryName,
                description: product.description,
                pictureBase64: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
                active: product.active,
                picture: "Test Picture"
            }

            axios.post("http://test.cengizyektas.com/Category/UpadateCategory", updateCategory).then((response) => {
                // setCategoryList(response?.data?.data?.categories)
                console.log("UPDATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", response);
            })            

        }
        // setProducts(_products);
        setProductDialog(false);
        setProduct(emptyCategories);
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyCategories);
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

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Kategori Ekle" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
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
                {rowData.categoryId}
            </>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.categoryName}
            </>
        );
    }



    const imageBodyTemplate = (rowData) => {
        // var image = new Image();
        // image.src = `data:image/png;base64,${rowData.pictureBase64}`;
        // setConvertImage(image.src)
        return (
            <>

                <span className="p-column-title">Image</span>
                {/* {convertImage} */}
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
                {/* <span className="p-column-title">Status</span> */}
                {rowData.active}
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
            <h5 className="m-0">KATEGORİ İŞLEMLERİ</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Kategori Ara..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="İptal Et" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Kaydet" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    const chooseOptions = { label: 'Seç', icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { label: 'Yükle', icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { label: 'İptal Et', icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} style={{ width: '300px', height: '20px', marginLeft: 'auto' }}></ProgressBar>
            </div>
        );
    }
    const fileUploadRef = useRef(null);

    const onChangeActive = (e) => {
        console.log("e2", e);
        let durum = false;
        e.code == 1 ? durum = true : durum = false;
        let categoryState = { ...product }
        categoryState.active = durum;
        setProduct(categoryState)
    }

    console.log("product4", product);

    const customBase64Uploaders = async (event) => {
        console.log("eventtt1", event);
        // convert file to base64 encoded 
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            setBase64(reader.result);
        }
    }

    console.log("base6444", base64);

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
                    <Tooltip target=".custom-choose-btn" content="Dosya Seç" position="bottom" />
                    <Tooltip target=".custom-upload-btn" content="Dosya Yükle" position="bottom" />
                    <Tooltip target=".custom-cancel-btn" content="Dosya Sil" position="bottom" />
                    {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                    <DataTable
                        ref={dt}
                        value={categoryList}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="categoryId"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Gösterilen kategori {first} ile {last} arasında, toplam kategori sayısı {totalRecords} "
                        globalFilter={globalFilter} emptyMessage="Kategori bulunamamıştır." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="categoryId" header="KATEGORİ ID" body={codeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="categoryName" header="KATEGORİ ADI" body={nameBodyTemplate} headerStyle={{ width: '21%', minWidth: '10rem' }}></Column>
                        <Column header="RESİMİ" body={imageBodyTemplate} headerStyle={{ width: '21%', minWidth: '10rem' }}></Column>
                        <Column field="description" header="AÇIKLAMA" body={aciklamaTemplate} headerStyle={{ width: '21%', minWidth: '8rem' }}></Column>
                        {/* <Column field="category" header="Category" sortable body={categoryBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column> */}
                        <Column field="active" header="KULLANIM DURUMU" body={statusBodyTemplate} headerStyle={{ width: '21%', minWidth: '10rem' }}></Column>
                        <Column header="DÜZENLE" body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '950px' }} header="KATEGORİ DÜZENLE" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">KATEGORİ ADI</label>
                            <InputText id="name" value={product.categoryName} onChange={(e) => onInputChange(e, 'categoryName')} required className={classNames({ 'p-invalid': submitted && !product.categoryName })} />
                            {submitted && !product.name && <small className="p-invalid">Kategori Adı Zorunludur.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">AÇIKLAMASI</label>
                            <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required />
                            {submitted && !product.description && <small className="p-invalid">Kategori Açıklaması Zorunludur.</small>}

                        </div>
                        <div className="field">
                            <label htmlFor="description">RESİM EKLE</label>
                            <FileUpload
                                ref={fileUploadRef}
                                name="demo[]"
                                multiple
                                accept="image/*"
                                maxFileSize={10000000}
                                onUpload={customBase64Uploaders}
                                // onSelect={onTemplateSelect}
                                // onError={onTemplateClear}
                                // onClear={onTemplateClear}
                                headerTemplate={headerTemplate}
                                // itemTemplate={itemTemplate}
                                // emptyTemplate={emptyTemplate}
                                chooseOptions={chooseOptions}
                                uploadOptions={uploadOptions}
                                cancelOptions={cancelOptions} />

                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="active">KULLANIM DURUMU</label>
                                <Dropdown
                                    value={product?.active == true ? 1 : 2}
                                    options={kullanimDurumu}
                                    onChange={(e) => onChangeActive(e.target.value)}
                                    placeholder="Kullanım Durumu Seçiniz"
                                    optionLabel='name'

                                />
                                {console.log("product?.active", product?.active)}
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

export default React.memo(Category, comparisonFn);