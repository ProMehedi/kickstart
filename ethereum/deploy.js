const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('../ethereum/abis/Factory.json')

const provider = new HDWalletProvider(
  'brain grain actress clip slim lab quick connect modify demand cook always',
  'https://rinkeby.infura.io/v3/614a14a6d4e04d8ca53d19558ac779f2'
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  console.log('Contract deployed to', result.options.address)
}

deploy()
