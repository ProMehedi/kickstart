import { Campaign, Layout } from '../components'
import { factoryInstance } from '../ethereum/instance'

const Home = ({ campaigns }) => {
  return (
    <Layout title='Created Campaigns:'>
      <h2>Created Campaigns</h2>
      {campaigns.map((campaign, index) => (
        <Campaign key={index} data={campaign} />
      ))}
    </Layout>
  )
}

export default Home

export const getServerSideProps = async () => {
  const campaigns = await factoryInstance.methods.getDeployedCampaigns().call()

  return {
    props: {
      campaigns,
    },
  }
}
