import { Container, Grid } from 'semantic-ui-react'
import Header from './Header'

const Layout = ({ children, title }) => {
  return (
    <>
      <Header />
      <Container>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={10}>
              <h2>{title}</h2>
              {children}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  )
}

export default Layout
