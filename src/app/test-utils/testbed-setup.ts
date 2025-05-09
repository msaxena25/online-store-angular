import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

export async function configureTestBed<T>(
    component: Type<T>,
    options: {
        declarations?: any[],
        providers?: any[],
        imports?: any[],
        schemas?: any[]
    } = {}
): Promise<{ fixture: ComponentFixture<T>, component: T }> {

    await TestBed.configureTestingModule({
        declarations: [component, ...(options.declarations || [])],
        providers: options.providers || [],
        imports: options.imports || [],
        schemas: options.schemas || [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    const fixture = TestBed.createComponent(component);
    const componentInstance = fixture.componentInstance;
    fixture.detectChanges();

    return { fixture, component: componentInstance };
}
