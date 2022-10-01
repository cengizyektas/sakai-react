
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';



import './FormDemo.css';
const Login = () => {

    const toast = useRef(null);
    const [kullaniciAdi, setKullaniciAdi] = useState();
    const [parola, setParola] = useState();

    let kAdi = "egçteknik";
    let sifre = "Ankara06**";

    console.log("parola", parola);
    const girisControl = () => {
        if (kullaniciAdi == kAdi && parola == sifre) {
            console.log(parola, "parolaparola");
        }else {
            toast.current.show({ severity: 'error', summary: 'Kullanıcı Adı veya Parola Yanlış !', detail: 'HATA', life: 3000 });

        }
    }

    const onInputChange = (e) => {
        console.log(e, "eees");
    }


    return (
        <div className="form-demo">
            <Toast ref={toast} />

            <div className="flex justify-content-center  align-items-center">
                <div className="card p-fluid">
                    <div className="field">
                        <img src={'assets/layout/images/logo-4.png'} style={{
                            width: "160px", height: "60px", flex: 1,
                            backgroundColor: 'transparent',
                            justifyContent: 'center'
                        }} alt="logo" />
                    </div>
                    <br /><br />
                    <div className="field">
                        <span className="p-float-label">
                            <InputText value={kullaniciAdi} onChange={(e) => setKullaniciAdi(e.target.value)} />
                            <label htmlFor="name" >Kullanıcı Adı</label>
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Password value={parola} onChange={(e) => setParola(e.target.value)} feedback={false} />
                            <label htmlFor="password">Parola</label>
                        </span>
                    </div>
                    <div className="field">
                        <Button onClick={girisControl} label="Giriş Yap" className="mt-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};
export default React.memo(Login, comparisonFn);