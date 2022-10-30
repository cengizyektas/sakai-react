import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';



const Category = () => {
    let emptyCategories = {
        categoryId: null,
        categoryName: '',
        picture: null,
        description: '',
        pictureBase64: null,
        active: null,
    };

    const kullanimDurumu = [
        {
            code: "Kullanımda",
            name: "Kullanımda"
        },
        {
            code: "Kullanımda Değil",
            name: "Kullanımda Değil"
        }
    ]

    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyCategories);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [categoryList, setCategoryList] = useState();
    const [base64, setBase64] = useState(null);
    const [editCategory, setEditCategory] = useState(false);




    const toast = useRef(null);
    const dt = useRef(null);

    
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

    

    const saveCategory = () => {
        setSubmitted(true);
        console.log("category id ne ", product.categoryId);
        if (product.categoryName !== null && product.description !== null && product.categoryId == -1 || product.categoryId == null) {
            console.log("geldi add");
            let addCategory = {
                categoryName: product.categoryName,
                description: product.description,
                pictureBase64: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
                active: true,
                picture: "Test Picture"
            }

            axios.post("http://test.cengizyektas.com/Category/AddCategory", addCategory).then((response) => {
                // setCategoryList(response?.data?.data?.categories)
                console.log("res12r4", response);
                if(response.status == 200){
                    toast.current.show({ severity: 'success', summary: 'BAŞARILI', detail: 'Kategori Eklendi', life: 3000 });
                }
            })
        } else {

            let updateCategory = {
                categoryId: product.categoryId,
                categoryName: product.categoryName,
                description: product.description,
                pictureBase64: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
                active: product.active,
                picture: "Test Picture"
            }

            axios.post("http://test.cengizyektas.com/Category/UpadateCategory", updateCategory).then((response) => {
                // setCategoryList(response?.data?.data?.categories)
                console.log("UPDATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", response);
                if(response.status == 200){
                    toast.current.show({ severity: 'success', summary: 'BAŞARILI', detail: 'Kategori Güncellendi', life: 3000 });
                }
            })
            setProductDialog(false)

        }
        // setProducts(_products);
        // setProductDialog(false);
        // setProduct(emptyCategories);
    }

    const editProduct = (product) => {
        console.log("prod1", product);
        setProduct({ ...product });

        setProductDialog(true);
        setEditCategory(true)

    }

  

   

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
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



    // const imageBodyTemplate = (rowData) => {
    //     // var image = new Image();
    //     // image.src = `data:image/png;base64,${rowData.pictureBase64}`;
    //     // setConvertImage(image.src)
    //     return (
    //         <>
    //             <img src={rowData.picture} className="shadow-2" width="100" />

    //         </>
    //     )
    // }

    const aciklamaTemplate = (rowData) => {
        return (
            <>
                {rowData.description}
            </>
        );
    }



    const statusBodyTemplate = (rowData) => {
        return (
            <>
                {/* <span className="p-column-title">Status</span> */}
                {rowData.active == true ? "Kullanımda" : "Kullanımda Değil"}
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
            <Button label="Kaydet" icon="pi pi-check" className="p-button-text" onClick={saveCategory} />
        </>
    );
   

    

   
    const fileUploadRef = useRef(null);

    const onChangeActive = (e) => {
        console.log("e2", e);
        let durum = false;
        e == "Kullanımda" ? durum = true : durum = false;
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
                        <Column field="categoryId" header="Kategori Id" body={codeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="categoryName" header="Kategori Adı" body={nameBodyTemplate} headerStyle={{ width: '21%', minWidth: '10rem' }}></Column>
                        {/* <Column header="Resim" body={imageBodyTemplate} headerStyle={{ width: '21%', minWidth: '10rem' }}></Column> */}
                        <Column field="description" header="Açıklama" body={aciklamaTemplate} headerStyle={{ width: '21%', minWidth: '8rem' }}></Column>
                        {/* <Column field="category" header="Category" sortable body={categoryBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column> */}
                        <Column field="active" header="Kullanım Durumu" body={statusBodyTemplate} headerStyle={{ width: '21%', minWidth: '10rem' }}></Column>
                        <Column header="Güncelle" body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '950px' }} header="KATEGORİ DÜZENLE" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Kategori Adı</label>
                            <InputText id="name" value={product.categoryName} onChange={(e) => onInputChange(e, 'categoryName')} required className={classNames({ 'p-invalid': submitted && !product.categoryName })} />
                            {submitted && !product.name && <small className="p-invalid">Kategori Adı Zorunludur.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Kategori Açıklaması</label>
                            <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required />
                            {submitted && !product.description && <small className="p-invalid">Kategori Açıklaması Zorunludur.</small>}

                        </div>
                        
                        {
                            editCategory ? (
                                <>
                                    <div className="formgrid grid">
                                        <div className="field col">
                                            <label htmlFor="active">KULLANIM DURUMU</label>
                                            <Dropdown
                                                value={product?.active ? "Kullanımda" : product?.active == false ? "Kullanımda Değil" : ""}
                                                options={kullanimDurumu}
                                                onChange={(e) => onChangeActive(e.target.value)}
                                                placeholder="Kullanım Durumu Seçiniz"
                                                optionLabel='name'
                                                optionValue='code'

                                            />
                                            {console.log("product?.active", product?.active)}
                                        </div>

                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }



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