import web3 from './web3'
import Factory from './abis/Factory.json'

const factoryInstance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  '0x486BD3f3De6200794426bfF401cDd4810aC31531'
)

export { factoryInstance }
