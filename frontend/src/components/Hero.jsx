import { Container, Card, Button,Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';


const Hero = () => {
  const {userInfo}= useSelector((state)=>state.auth);

  return (
    <div className=' py-5'>
      
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          {userInfo ? (<>
               <h1 className='text-center mb-4'>{`Hey ${userInfo.name}`} </h1>
             
               <Image
                src='data:image/jpeg;base64,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'
                alt={`${userInfo.images}'s Profile`}
              />
              <p>{`"Hey there! I'm ${userInfo.name}, a digital nomad and travel enthusiast originally from Seattle. With a background in graphic design and a passion for storytelling, `} </p>
               <div className='d-flex'>
                 <LinkContainer to='/profile'>
                 <Button variant='primary'  className='me-3'>
                   Profile
                 </Button>
                 </LinkContainer>
                
               </div>
          </>
          ):(
            <>
            <h1 className='text-center mb-4'>Hey Buddy!</h1>
            <p className='text-center mb-4'>
              This is a boilerplate for MERN authentication that stores a JWT in
              an HTTP-Only cookie. It also uses Redux Toolkit and the React
              Bootstrap library
            </p>
            <div className='d-flex'>
              <LinkContainer to='/login'>
              <Button variant='primary'  className='me-3'>
                Sign In
              </Button>
              </LinkContainer>
              <LinkContainer to='register'>
              <Button variant='secondary'>
                Sign Up
              </Button>
              </LinkContainer>
            </div>
            </>
          )
          }
        </Card>
      </Container>
    </div>
  );
};

export default Hero;