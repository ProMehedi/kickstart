const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/abis/Factory.json')
const compiledCampaign = require('../ethereum/abis/Campaign.json')

// Define variables
let accounts, factory, campaignAddress, campaign

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // Use one of those accounts to deploy the contract
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  // Deploy the contract
  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000',
  })

  // Get the address of the contract
  const addresses = await factory.methods.getDeployedCampaigns().call()
  campaignAddress = addresses[0]

  // Get the contract
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  )
})

describe('Campaigns', () => {
  it('Deploys a factory and a campaign', () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })

  it('Marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call()
    assert.equal(accounts[0], manager)
  })

  it('Allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1],
    })

    const isContributor = await campaign.methods.approvers(accounts[1]).call()
    assert(isContributor)
  })

  it('Requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        value: '5',
        from: accounts[1],
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })

  // it('Allows a manager to make a payment request', async () => {
  //   await campaign.methods
  //     .createRequest('Buy Batteries', '100', accounts[1])
  //     .send({
  //       from: accounts[0],
  //       gas: '1000000',
  //     })

  //   const request = await campaign.methods.requests(0).call()
  //   assert.equal('100', request.value)
  // })

  it('Processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether'),
    })

    await campaign.methods
      .createRequest(
        'Buy Batteries',
        web3.utils.toWei('5', 'ether'),
        accounts[1]
      )
      .send({ from: accounts[0], gas: '1000000' })

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    })

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    })

    let balance = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)
    assert(balance > 104)
  })
})
