import web3 from './web3'
import Factory from './abis/Factory.json'

const factoryInstance = (address) =>
  new web3.eth.Contract(JSON.parse(Factory.interface), address)

export { factoryInstance }
