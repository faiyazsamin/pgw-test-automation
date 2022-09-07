/// <reference types="Cypress" />

import * as checkout from "../../functions/checkout_tokenized"


describe('Tokenized Checkout Agreement Wallet Page', () => {


    before(() => {
        cy.request('POST', 'https://pgwdemosite.com/create', {"payerReference":"01770618575","callbackURL":"https://pgwdemosite.com/callback","mode":"0000"}).then((response) => {
            checkout.navigate(checkout.parseURL(JSON.stringify(response.body.PGWURL)))
        }
)

    })

    it('Check if URL has proper parameters', () => {
        cy.url().should('include', 'paymentID=')
        .and('include', 'hash=')
        .and('include', 'mode=')
        .and('include', 'apiVersion=')
    });
})
