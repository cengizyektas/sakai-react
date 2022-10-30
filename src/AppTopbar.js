import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import classNames from 'classnames';
import Category from './pages/Category';
import { Badge } from 'primereact/badge';
import { Tooltip } from 'primereact/tooltip';

import './App.scss';




export const AppTopbar = (props) => {



    return (
        <div className="layout-topbar">
            <Tooltip target=".custom-target-icon" />
            

            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-4.png' : 'assets/layout/images/logo-4.png'} alt="logo" />
            </Link>
            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>
            {/* <div className="flex align-items-center flex-wrap">
            <Link to="/" className="p-link  layout-menu-button layout-topbar-button">
                <i className="custom-target-icon pi pi-home p-text-secondary p-overlay-badge" data-pr-tooltip="Anasayfa" data-pr-position="left+2 top " data-pr-my="top" style={{ fontSize: '2rem', cursor: 'pointer' }}>
                </i>
            </Link>
            <div className="flex align-items-center">
                <Link to="/category" className="p-link  layout-menu-button layout-topbar-button">
                    <i className="custom-target-icon pi pi-home p-text-secondary p-overlay-badge" data-pr-tooltip="Kategori İşlemleri" data-pr-position="left+2 top "  data-pr-my="top" style={{ fontSize: '2rem', cursor: 'pointer' }}>
                    </i>
                </Link>
            </div>
            </div>
            <Link to="/products" className="p-link  layout-menu-button layout-topbar-button">
                <i className="custom-target-icon pi pi-home p-text-secondary p-overlay-badge" data-pr-tooltip="Ürün İşlemleri" data-pr-position="left+2 top "  data-pr-my="top" style={{ fontSize: '2rem', cursor: 'pointer' }}>
                </i>

            </Link>
            <Link to="/login" className="p-link  layout-menu-button layout-topbar-button">
                <i className="pi pi-shopping-bag p-text-secondary p-overlay-badge" data-pr-tooltip="Sipariş İşlemleri" data-pr-position="left+2 top "  data-pr-my="top" style={{ fontSize: '2rem', cursor: 'pointer' }}>
                </i>

            </Link> */}



            {/* <ul className={classNames("layout-topbar-menu lg:flex origin-top", { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-calendar" />
                        <span>Kategori İşlemleri</span>
                    </button>
                </li>
                <li>

                    <Link to="/" className="layout-topbar-logo">

                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-cog" />
                            <span>Settings</span>
                        </button>
                    </Link>


                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-home" />
                        <span>Anasayfa</span>
                    </button>
                </li>
            </ul> */}
        </div>
    );
}
