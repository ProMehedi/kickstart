import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && window.web3) {
  web3 = new Web3(window.web3.currentProvider)
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/f23ddff1bbda4af3a4e09b48474d058b'
  )
  web3 = new Web3(provider)
}

export default web3
