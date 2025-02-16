@echo off
:: Generate modules with routing
call ng generate module home --routing
call ng generate module product-list --routing
call ng generate module product-details --routing
call ng generate module checkout --routing
call ng generate module acknowledgment --routing

:: Generate components
call ng generate component home/components/home-page
call ng generate component product-list/components/product-list-page
call ng generate component product-details/components/product-details-page
call ng generate component checkout/components/checkout-page
call ng generate component acknowledgment/components/acknowledgment-page

:: Generate services
call ng generate service core/services/product
call ng generate service core/services/auth

:: Generate guard
call ng generate guard core/guards/auth

@echo All components, modules, services, and guards have been successfully generated!
pause
