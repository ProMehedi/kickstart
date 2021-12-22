import { CampaignForm, Layout } from '../../components'
import { factoryInstance, web3 } from '../../ethereum'

const NewCampaign = () => {
  const createCampaign = async (minContribute) => {
    const accounts = await web3.eth.getAccounts()
    await factoryInstance.methods.createCampaign(minContribute).send({
      from: accounts[0],
    })
  }

  return (
    <Layout title='Create new Campaings'>
      <CampaignForm onSubmit={createCampaign} />
    </Layout>
  )
}

export default NewCampaign
