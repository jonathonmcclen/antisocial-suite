import { useEffect, useState } from 'react';
import {
  Container,
  Content,
  Form,
  ButtonToolbar,
  Button,
  Panel,
  FlexboxGrid,
  Loader,
  IconButton
} from 'rsuite';
import { supabaseClient } from '../../config/supabase-client';
import { Session } from '@supabase/supabase-js';
import OffRoundIcon from '@rsuite/icons/OffRound';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [session, setSession] = useState<Session | null>()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const Login = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabaseClient.auth.signUp({ email, password })
      if (error) throw error
      navigate("/confirm-email");
    } catch (err) {
      throw err;
    } finally {
      setEmail('')
      setPassword('')
      setLoading(false);
    }
  }

  const Logout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    if (error) throw error
  }

  if (loading) return <Loader center content="loading" />

  return (
    <Container>
      <Content>
        <FlexboxGrid justify="center" style={{ marginTop: 40 }}>
          <FlexboxGrid.Item colspan={12}>
            {
              !session ? <>
                <Panel header={<h3>Sign Up</h3>} shaded bordered style={{ width: 500, margin: '0 auto' }}>
                  <Form fluid>
                    <Form.Group>
                      <Form.ControlLabel>Email address</Form.ControlLabel>
                      <Form.Control name="name" onChange={(e) => setEmail(e)} />
                    </Form.Group>
                    <Form.Group>
                      <Form.ControlLabel>Password</Form.ControlLabel>
                      <Form.Control onChange={(e) => setPassword(e)} name="password" type="password" autoComplete="off" />
                    </Form.Group>
                    <Form.Group>
                      <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                      <Form.Control onChange={(e) => setPassword(e)} name="password" type="password" autoComplete="off" />
                    </Form.Group>
                    <Form.Group>
                      <ButtonToolbar>
                        <Button appearance="primary" onClick={Login}>Sign Up</Button>
                        <Button appearance="link" onClick={() => { navigate("/login") }}>Already Have an Account? Click Here</Button>
                      </ButtonToolbar>
                    </Form.Group>
                  </Form>
                </Panel>
              </> : <>
                <p>Welcome back {session.user.email}</p>
                <IconButton size='sm' onClick={Logout} appearance='primary' icon={<OffRoundIcon />}>Logout</IconButton>
              </>
            }
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
}

export default Signup;
