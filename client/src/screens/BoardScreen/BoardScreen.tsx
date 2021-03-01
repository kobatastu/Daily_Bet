import { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { useQueryBoard } from '../../hooks/fetcher/useQueryBoard';
import { useMutationBoard } from '../../hooks/fetcher/useMutationBoard';
import type { BoardData } from '../../serverTypes/boardTypes';

export const BoardScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<BoardData[] | null>(null);
  const { querying, data } = useQueryBoard();
  const { mutate } = useMutationBoard();

  useEffect(() => {
    setMessages(data);
  }, [data]);

  if (querying || !messages) return <div>Loading..</div>;

  return (
    <div>
      <Card
        style={{
          maxWidth: 1000,
          margin: '50px auto',
          backgroundColor: 'white',
        }}
      >
        <CardContent>
          <div style={{ paddingBottom: '10px' }}>
            <h2>Board</h2>
            <p>みんなで情報を共有しましょう</p>
          </div>
          <div id="box" style={{ height: '500px', overflow: 'scroll' }}>
            {messages.map((message) => {
              return (
                <div
                  key={message.id}
                  style={{
                    padding: '20px',
                    borderTop: 'solid 1px rgb(189, 186, 186)',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      <img
                        alt="プロフィール画像"
                        src={`${process.env.PUBLIC_URL}/mypic/` + message.picture}
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          margin: '20px 20px 20px 20px',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1">
                            {message.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom color="textSecondary">
                            {message.board_content}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">{message.created_at.toString()}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', padding: '20px 0 20px 0' }}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={(ev) => {
                ev.preventDefault();
                mutate({
                  user_id: '1',
                  board_content: message,
                });
                setMessage('');
              }}
            >
              <TextField
                type="text"
                label="メッセージを入力してください"
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
                style={{ width: '70%' }}
              />
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
