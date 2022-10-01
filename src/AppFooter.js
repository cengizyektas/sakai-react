import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-4.png' : 'assets/layout/images/logo-4.png'} alt="Logo" height="20" className="mr-2" />
            
            <span className="font-medium ml-2"></span>
        </div>
    );
}
