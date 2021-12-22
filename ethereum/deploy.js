const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('../ethereum/build/Factory.json')

const provider = new HDWalletProvider(
  'view jeans chuckle fuel thing middle gift shallow private nose reject garbage',
  'https://rinkeby.infura.io/v3/f23ddff1bbda4af3a4e09b48474d058b'
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
