export const productServiceSpy = {
    loadProducts: jasmine.createSpy('loadProducts'),
    setProducts: jasmine.createSpy('setProducts'),
    getProductDetail: jasmine.createSpy('getProductDetail')
};

import { Subject } from 'rxjs';

export const filterChangedSubject$ = new Subject<any>();

export const productFilterServiceSpy = {
    filterChanged$: filterChangedSubject$,
    applyFilters: jasmine.createSpy('applyFilters').and.callFake((filters, products) => products),
    updateFilter: jasmine.createSpy('updateFilter'),
    resetFilters: jasmine.createSpy('resetFilters')
};

export const activatedRouteSpy = {
    snapshot: {
        paramMap: {
            get: jasmine.createSpy('get').and.callFake((param: string) => {
                const params: { [key: string]: string } = {
                    id: '123',
                    search: 'test-search'
                };
                return params[param] || null;
            })
        }
    }
};


export const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
