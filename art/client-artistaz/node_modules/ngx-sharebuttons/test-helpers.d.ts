/// <reference types="jasmine" />
import { ElementRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
export declare module TestHelpers {
    const windowUrl = "http://localhost/index.html";
    /**
     * Utility method to create test components with any html
     */
    const createGenericTestComponent: <T>(html: string, detectChanges: boolean, type: new (...sArgs: any[]) => T) => ComponentFixture<T>;
    /**
     * Utility method to create mock JSON responses
     */
    const mockJsonResponse: (mockBackend: MockBackend, data: any) => void;
    /**
     * Utility method to create mock Text responses
     */
    const mockTextResponse: (mockBackend: MockBackend, data: any) => void;
    /**
     * Utility method to create mock Error responses
     */
    const mockErrorResponse: (mockBackend: MockBackend, err?: Error) => void;
    /**
     * Mock ElementRef for injection in tests
     */
    class MockElementRef extends ElementRef {
    }
    /**
     * Mock WindowService  for injection in tests
     */
    class MockWindowService {
        mockNativeWindow: {
            location: {
                href: string;
            };
            open: jasmine.Spy;
            setInterval: jasmine.Spy;
            clearInterval: jasmine.Spy;
        };
        readonly nativeWindow: {
            location: {
                href: string;
            };
            open: jasmine.Spy;
            setInterval: jasmine.Spy;
            clearInterval: jasmine.Spy;
        };
    }
}
