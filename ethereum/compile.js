const path = require('path')
const fs = require('fs-extra')
const solc = require('solc')

// Remove Existing abis Directory
const abidPath = path.resolve(__dirname, 'abis')
fs.removeSync(abidPath)

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
const source = fs.readFileSync(campaignPath, 'utf8')
const output = solc.compile(source, 1).contracts

// Create abis Directory
fs.ensureDirSync(abidPath)

// Write Contract Files
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(abidPath, contract.replace(':', '') + '.json'),
    output[contract]
  )
}
