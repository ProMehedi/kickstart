import Link from 'next/link'
import { Button, Card, Container, Icon, Menu } from 'semantic-ui-react'

const Header = () => {
  return (
    <Card fluid>
      <Container>
        <Menu secondary>
          <Menu.Item header>
            <h2>
              <Link href='/'>CroudCoin</Link>
            </h2>
          </Menu.Item>
          <Menu.Item name='home'>
            <Link href='/'>Home</Link>
          </Menu.Item>
          <Menu.Item name='campaigns'>
            <Link href='/campaigns'>Campaigns</Link>
          </Menu.Item>
          <Menu.Item name='requests'>
            <Link href='/requests'>Requests</Link>
          </Menu.Item>
          <Menu.Item name='profile'>
            <Link href='/profile'>Profile</Link>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Link href='/campaigns/new' passHref>
                <Button basic icon labelPosition='right' color='blue'>
                  Create Campaign
                  <Icon name='plus' />
                </Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    </Card>
  )
}

export default Header
