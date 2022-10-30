import React, { useRef, useState, useEffect } from 'react';
// import { saveAs } from "file-saver"
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useDispatch, useSelector } from "react-redux";
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog } from 'primereact/confirmdialog';
import axios from "axios";


function DosyaYukleme(props) {

    const { productId, tblno, dosyaYukle, listeDosyaSil } = props;

    // const dispatch = useDispatch();
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [barYukleniyor, setBarYukleniyor] = useState(false);
    const [dosyaTanimi, setDosyaTanimi] = useState(null);
    const [silindi, setSilindi] = useState(false);
    const [dokumanId, setDokumanId] = useState(null);

    // region DOSYA YUKLE TASARIM
    const onUpload = () => {
        toast.current.show({ severity: 'succes', summary: 'Başarılı', detail: 'Dosya Yükleme Başarılı..', life: 3000 });
    }

    const onTemplateSelect = (e) => {
        console.log("e onTemplateSelect", e);
        let _totalSize = totalSize;


        for (const file of e.files) {
            _totalSize += file.size;
        }

        setTotalSize(_totalSize);

    }

    const onTemplateUpload = (e) => {
        console.log("e onTemplateUpload", e);
        let _totalSize = 0;
        e.files.forEach(file => {
            _totalSize += (file.size || 0);
        });


        setTotalSize(_totalSize);
        onUpload();
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 20000000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className + " upload-header-template"} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {
                    value === 0
                        ? chooseButton
                        : <div className='pointer-events-none'> {chooseButton} </div>
                }
                {uploadButton}
                {cancelButton}
                {/* <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 20 MB`} style={{ width: '300px', height: '20px', marginLeft: 'auto' }} /> */}
            </div>
        );
    }

    // const itemTemplate = (file, props) => {

    //     let dosyaIcon = "";
    //     let dosyaUzantisi = file.name.split(".");
    //     dosyaUzantisi = dosyaUzantisi[dosyaUzantisi.length - 1];

    //     if (dosyaUzantisi === "pdf") {
    //         dosyaIcon = "pdf.png"
    //     } else if (dosyaUzantisi === "xls" || dosyaUzantisi === "xlsx") {
    //         dosyaIcon = "xls.png"
    //     } else if (dosyaUzantisi === "doc" || dosyaUzantisi === "docx") {
    //         dosyaIcon = "doc.png"
    //     }

    //     return (
    //         <div>
    //             {
    //                 barYukleniyor
    //                     ? <ProgressBar mode="indeterminate" style={{ height: '6px', width: '100%' }} />
    //                     : ""
    //             }


    //             <div className="p-d-flex p-ai-center p-flex-wrap">
    //                 <div className="p-d-flex p-ai-center" style={{ width: '40%' }}>
    //                     <img role="presentation" src={`/assets/layout/images/${dosyaIcon}`} width={100} />
    //                     <span className="p-d-flex p-dir-col p-text-left p-ml-3">
    //                         {file.name}
    //                     </span>
    //                 </div>
    //                 <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
    //             </div>
    //         </div>

    //     )
    // }
    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                {/* <Tag value={props.formatSize} severity="warning" className="px-3 py-2" /> */}
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="p-d-flex p-ai-center p-dir-col">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }} />
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="p-my-5" />
            </div>
        )
    }

    const chooseOptions = {  icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
    // endregion

    // region DOSYA LİSTE || DOSYA İNDİR
    const [dosyaListesi, setDosyaListesi] = React.useState([]);

    React.useEffect(() => {
        _dosyaListele()
    }, []);

    React.useEffect(() => {
        _dosyaListele()
    }, [productId]);

    const _dosyaListele = () => {
        console.log("productId _dosyaListele", productId);
        axios.get(`http://test.cengizyektas.com/Product/GetImage?ProductId=${productId}`).then((response) => {
            // setCategoryList(response?.data?.data?.categories)
            console.log("res dosya LİSTELEEEEEE", response);

            setDosyaListesi(response?.data?.data);

        })
        // dispatch(getAllDosyalar(tblno, tblid))
        //     .then((dosya) => {
        //         console.log("asda2",dosya?.payload?.data);

        //     })
    }
    // endregion
    console.log("dosya0Listesi NEDİR ", dosyaListesi);
    // region DOSYA İNDİR
    const getFileDownloadUrl = (dkmnid, dokumanAdi) => {
        // dispatch(getDosyaIndir(dkmnid)).then(async (dokuman) => {
        //     let $dokuman = await new Blob([dokuman?.payload?.data])
        //     await saveAs($dokuman, dokumanAdi)

        //     console.log("data", dokuman)

        // });
    }


    // endregion

    // region DOSYA SİL

    const _dosyaSil = (imageId) => {
        console.log("silindi dkmnid", imageId);
        // dispatch(deleteDosya(dkmnid)).then(async () => {
        //     await _dosyaListele();
        //     toast.current.show({ severity: "success", summary: 'İşlem Başarılı', detail: 'Dosya Silindi.', life: 3000 });
        // })
        axios.post(`http://test.cengizyektas.com/Product/DeleteImage?imageId=${imageId}`).then((response) => {
            console.log("response SİLLLLLLLLLLLL",response);
            _dosyaListele();
            toast.current.show({ severity: "success", summary: 'İşlem Başarılı', detail: 'Resim Silindi.', life: 3000 });

            // setProductList(response?.data?.data)

        })
    }

    // endregion

    // region DOSYA YÜKLE

    const _dosyaYukle = (event) => {
        console.log("event _dosyaYukle", event);
        setBarYukleniyor(true) // yükleniyor barı aktif olsun
        setNumberofTry(numberofTry + 1)

        const [file] = event.files;
        const fileReader = new FileReader();

        fileReader.onload = async (e) => {
            console.log("e onload", e);
            let fileBase64 = await e.target.result;
            console.log("filebase53", fileBase64);
            // fileBase64 = fileBase64[fileBase64.length - 1]
            // let fileType = await file.type;
            // let fileName = await file.name;
            // let fileExtension = fileName.split(".");
            // fileExtension = await fileExtension[fileExtension.length - 1];



            const dosyaYukleniyor = {

                productId: productId, // props tan gelen
                // dsyad: fileName,
                // dsyuzn: fileExtension,
                // contentType: fileType,
                name: fileBase64,

            }

            console.log("dosya//", dosyaYukleniyor)


            axios.post("http://test.cengizyektas.com/Product/AddImage", dosyaYukleniyor).then((response) => {
                // setCategoryList(response?.data?.data?.categories)
                console.log("res dosya yukle", response);
                _dosyaListele(); // dosya listele fonksiyonunu yeniden yükle
                setTotalSize(0);
                setBarYukleniyor(false)
                setSilindi(false);
                if (response.status == 200) {
                    toast.current.show({ severity: "success", summary: "Resim Başarılı Bir Şekilde Yüklendi", detail: "BAŞARILI", life: 3000 });
                    //  toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

                }


                fileUploadRef.current.clear();
            })


        };
        fileReader.readAsDataURL(file);


    };

    // endregion

    // <InputText placeholder='Dosyaya Bir İsim Veriniz.' value={dosyaTanimi} onChange={(e) => setDosyaTanimi(e.target.value)} />

    // region TOAST

    const [numberofTry, setNumberofTry] = useState(0)
    // const result = useSelector((state) => state.dosyaYukle.result)

    // useEffect(() => {
    //     if (result.success && result.success != null && numberofTry > 0) {

    //         toast.current.show({ severity: "success", summary: result.summary, detail: result.message, life: 3000 });


    //     } else if (result.success === false && numberofTry > 0) {
    //         toast.current.show({ severity: "error", summary: result.summary, detail: result.message, life: 3000 });
    //     }

    //     return () => {
    //         setNumberofTry(0)
    //     }

    // }, [result]);

    // console.log("silindi1", silindi);





    const accept = () => {
        console.log("silindi acc", silindi);
        if (silindi !== true) {
            console.log("silindi iff", silindi);
            setSilindi(true);

        } else {

        }
        console.log("silindi acc2", silindi);

        dosyaSil();


    }

    // const silindiDurumu = () => {
    //     setSilindi(true);
    // }

    const dosyaSil = (imageId) => {
        console.log("silindi dosyaSil dkmnid", imageId);
        setDokumanId(imageId)
        console.log("silindi ilk", silindi);
        if (silindi !== true) {
            setVisible(true)
            setSilindi(true)
        }

        else if (silindi === true) {
            console.log("silindi else if", silindi);
            console.log("silindi setDokumanId", dokumanId);
            _dosyaSil(imageId);
        }



    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'İptal Edildi', detail: 'İşleminizi İptal Ettiniz.', life: 3000 });
    }



    // endregion

    return (
        <>
            <Toast ref={toast} />
            {

                dosyaYukle
                    ?

                    <div className='dosya-yukleme' style={{ marginTop: "1rem" }}>

                        <Tooltip style={{witdh:"100rem"}} target=".custom-choose-btn" content="Dosya Seç" position="bottom" className='blue-tooltip' disabled={totalSize > 0} />
                        <Tooltip target=".custom-upload-btn" content="Dosya Yükle" position="bottom" className='blue-tooltip' />
                        <Tooltip target=".custom-cancel-btn" content="Dosya Temizle" position="bottom" className='blue-tooltip' />


                        {/* <InputText
                            id="dosya"
                            value={dosyaTanimi}
                            onChange={(e) => setDosyaTanimi(e.target.value)}
                            style={{ width: "250px" }}
                            placeholder='Dosyaya Bir İsim Veriniz.'
                            maxLength="200"
                            tooltip="UYARI : En Fazla 200 Karakter Girebilirsiniz" tooltipOptions={{ position: 'top' }}
                        /> */}

                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <ConfirmDialog
                                    visible={visible}
                                    onHide={() => setVisible(false)}
                                    message="Dosya Silme İşlemi Yapmak Üzeresiniz.Devam Etmek İstiyor Musunuz?"
                                    header="Dikkat"
                                    icon="pi pi-exclamation-triangle"
                                    accept={accept}
                                    reject={reject}
                                    acceptClassName="p-button-raised p-button-primary"
                                    rejectClassName="p-button-raised p-button-danger"
                                    acceptLabel="Evet"
                                    rejectLabel="Hayır"
                                    acceptIcon="pi pi-check"
                                    rejectIcon="pi pi-times"
                                />
                            </span>
                        </div>


                        <FileUpload
                            ref={fileUploadRef}
                            name="demo"
                            uploadHandler={_dosyaYukle}
                            maxFileSize={20000000}
                            accept=".png,.jpeg,.jpg,"
                            onUpload={onTemplateUpload}
                            onSelect={onTemplateSelect}
                            onError={onTemplateClear}
                            onClear={onTemplateClear}
                            headerTemplate={headerTemplate}
                            itemTemplate={itemTemplate}
                            emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions}
                            uploadOptions={uploadOptions}
                            cancelOptions={cancelOptions}
                            customUpload={true}
                        />

                    </div>
                    : <></>
            }


            <div className="card">
                {
                    dosyaListesi?.map((dosya) => (
                        <div className="p-fluid grid formgrid">
                            
                            {
                                listeDosyaSil
                                    ?
                                    <Button
                                        tooltip="Resimi Silmek İçin Tıklayın."
                                        tooltipOptions={{ position: 'top' }}
                                        onClick={() => _dosyaSil(dosya.imageId)}
                                        icon="pi pi-times"
                                        className="p-button-rounded p-button-danger" />
                                    : <></>
                            }



                            <span

                                // onClick={() => getFileDownloadUrl(dosya.dkmnid, dosya.dsyad, dosya.contentType)}
                                style={{ flexGrow: 0, cursor: 'pointer', padding: '5px 0' }}>
                                <img src={dosya.name} className="shadow-2" width="150"  />
                            </span>
                        </div>
                    ))
                }

            </div>
        </>

    );

}

export default DosyaYukleme;


/**
 * örnek kullanım
 * <DosyaYukleme
     kayitId={dosyaId} // ilgili kaydın id numarası
     tabloAdi="TEmriTemel" // ilgili kayıt hangi tabloda tutulmaktadır
     dosyaYukle={true} // dosya yükle ekranı açık olsun
     listeDosyaSil={true} // dosya silme butonu açık olsun
     />
 * */