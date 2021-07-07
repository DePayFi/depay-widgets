import DePayWidgets from '../../dist/cjs/index.js'
import React from 'react'
import ReactDOM from 'react-dom'

describe('Payment', () => {
  
  it('renders and opens a Payment dialog stack', () => {
  
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then(async (document)=> {

        await DePayWidgets.Payment({
          amount: '20',
          token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
          receiver: '0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02',
          document
        })
        
        // expect(
        //   document.querySelector('h1').innerHTML
        // ).to.equal('I am a dialog!')
      })
    })
  })
})
