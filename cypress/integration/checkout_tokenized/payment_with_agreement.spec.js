/// <reference types="Cypress" />

import * as checkout from "../../functions/checkout_tokenized"

describe('Tokenized Checkout Payment with Agreement', () => {
    before(() => {
        cy.request('POST', 'https://pgwdemosite.com/create', {"agreementID":Cypress.env('agreementID'),"amount":checkout.getAmount(1, 5),"intent":"sale","merchantAssociationInfo":null, "callbackURL": Cypress.env('callbackURL'),"mode":"0001"}).as('create_payment_resp').then((response) => {
            checkout.navigate(checkout.parseURL(JSON.stringify(response.body.PGWURL)))
        })
    })

    it('Check if proper favicon exists in the page', () => {
        cy.get('link[rel="shortcut icon"]').should('exist')
        .and('have.attr', 'type', 'image/x-icon')
        .and('have.attr', 'href', Cypress.env('favicon'))
    });

    describe('Tokenized Checkout PIN Page', () => {
        it('Check if URL has proper parameters', () => {
            cy.url().should('include', 'paymentID=')
            .and('include', 'hash=')
            .and('include', 'mode=')
            .and('include', 'apiVersion=')
        });
    
        it('Check if the page has proper title', () => {
            cy.title().should('exist')
            .and('eq', Cypress.env('page_title_0001'))
        });
    
        it('Check if the PGW Payment logo exists', () => {
            cy.get('div[class=logo]').should('exist')
            .within(() => {
                cy.get('img').should('exist')
                .and('have.attr', 'src', Cypress.env('banner_logo'))
            })
        });
    
        it('Check if the merchant logo exists', () => {
            cy.get('div[class=avatar]').should('exist')
            .within(() => {
                cy.get('img').should('exist')
                .and('have.attr', 'src', Cypress.env('merchant_logo'))
            })
        });
        
        it('Check if the grey color invoice text exists', () => {
            cy.get('div[class="flex-merchant details"]').should('exist')
            .within(() => {
                cy.get('p').contains('Invoice:')
                .and('have.css', 'color', 'rgb(185, 185, 185)')
            })
        });

        it('Check if the amount with sign exists in bold text', () => {
            cy.get('div[class=amount]').contains('৳')
            cy.get('div[class=amount]').find('b1')
        });

        it('Check if proper background image exists', () => {
            cy.get('div[id="inputHolder"]').should('exist')
            .and('have.css', 'background-image', 'url("'+Cypress.env('bg_image')+'")')
        });

        it('Check if the PIN label exists with proper text with masked number', () => {
            cy.get('label[for="password"]').should('exist')
            .and('have.class', 'infoText')
            .and('have.text', Cypress.env('pin_label')+"("+checkout.num_format(Cypress.env('wallet_no'))+")")
        });
    
        it('Check if the PIN input field is focused', () => {
            cy.get('input[id="ash"]').should('have.focus')
        });

        it('Check if the PIN input field exists with proper attributes', () => {
            cy.get('input[id="ash"]').should('exist')
                .and("have.attr", "pattern", "[0-9]*")
                .and("have.attr", "inputmode", "numeric")
                .and("have.attr", "placeholder", Cypress.env('pin_placeholder'))
                .and("have.attr", "maxlength", "5")
                .and("have.attr", "autocomplete", "one-time-code")
                .and("have.attr", "required", "required")
                .and("have.attr", "type", "password")
        });
    
        it('Check if confirm button exists with proper label', () => {
            cy.get('button[id="confirm_button"]').should('exist')
            .and('have.text', Cypress.env('confirm_btn_label'))
        });
    
        it('Check if close button exists with proper label', () => {
            cy.get('button[id="close_button"]').should('exist')
            .and('have.text', Cypress.env('close_btn_label'))
        });
    
        it('Check if PGW helpline text and logo exists', () => {
            cy.get('div[id="credit"]').should('exist')
            .within(() => {
                cy.get('img').should('exist')
                .and('have.attr', 'src', Cypress.env('footer_dial_icon'))
                cy.get('b[id="dialText"]').should('exist')
                .and('have.text', Cypress.env('helpline_no'))
            })
        });
    
        it('Check if providing correct PIN takes user to agreement confirmation page', () => {
            cy.get('input[id="ash"]').clear()
            cy.get('input[id="ash"]').type(Cypress.env('pin'))
            cy.get('button[id="confirm_button"]').click()
            cy.wait(5000)
        });
    
        it('Check if proper redirect message is given', () => {

            cy.get('div[id="loaderHolder"]').should('exist')
            .and('contain', Cypress.env('redirectSuccess'))
            .within(() => {
                cy.get('a').should('have.attr', 'href').then((href) => {
                    let successCallback = Cypress.env('callbackURL')+"?paymentID="+checkout.parseGetParam(href, 'paymentID')+"&status=success&apiVersion="+Cypress.env('apiVersion')
                    expect(href).to.equal(successCallback)
                })
            })
        });
        
        it('Check if the redirection is successful', () => {
            cy.wait(10000)
            cy.url().then(url => {
                let successCallback = Cypress.env('callbackURL')+"?paymentID="+checkout.parseGetParam(url, 'paymentID')+"&status=success&apiVersion="+Cypress.env('apiVersion')
                expect(url).to.equal(successCallback)
            })
        });
    })
})