import React from 'react';
import {Comment, Segment, Header} from 'semantic-ui-react';


function Comments(props){
	const options = props.comments.map(r => (
    <Comment>
    <Comment.Content>
        <Comment.Author as='a'>{r.userid}</Comment.Author>
        <Comment.Metadata>
          <div>{r.rating}</div>
        </Comment.Metadata>
        <Comment.Text>{r.comment}</Comment.Text>
      </Comment.Content>
      
    </Comment>
  ))
  return (<Comment.Group>{options}</Comment.Group>)
}

function UserComments(props){
  return  (
    <div>
      <Header as='h3'>Comments from users </Header>
      <Comments comments={props.comments} />
    </div>

  )
}

export default UserComments