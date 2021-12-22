import { Campaign, Layout } from '../components'
import { factoryInstance } from '../ethereum/instance'

const Home = ({ campaigns }) => {
  return (
    <Layout title='Created Campaigns:'>
      {campaigns.map((campaign, index) => (
        <Campaign key={index} data={campaign} />
      ))}
    </Layout>
  )
}

export default Home

export const getServerSideProps = async () => {
  const factory = factoryInstance(process.env.CONTRACT_ADDRESS)
  const campaigns = await factory.methods.getDeployedCampaigns().call()

  return {
    props: {
      campaigns,
    },
  }
}
