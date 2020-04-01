import React from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const HomePage = () => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Renata
        </Header>
        <Header as='h2' inverted content='Welcome to Renata' />
        <Button as={Link} to='/products' size='huge' inverted>
          Take me to  products page!
        </Button>
      </Container>
    </Segment>
  );
};
export default observer(HomePage);
