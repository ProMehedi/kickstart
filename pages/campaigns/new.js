import { CampaignForm, Layout } from '../../components'
import { factoryInstance, web3 } from '../../ethereum'

const NewCampaign = () => {
  const createCampaign = async (values) => {
    const accounts = await web3.eth.getAccounts()
    await factoryInstance.methods.createCampaign(values.contribute).send({
      from: accounts[0],
    })
    console.log(values)
  }

  return (
    <Layout title='Create new Campaings'>
      <CampaignForm onSubmit={createCampaign} />
    </Layout>
  )
}

export default NewCampaign
