import web3 from './web3'
import Factory from './abis/Factory.json'

const factoryInstance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  '0x16288c9c1EF6ceacA1A1D0d308Ce3b90EF59ffCF'
)

export { factoryInstance }
