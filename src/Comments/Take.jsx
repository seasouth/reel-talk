import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import './Comments.css';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

const Take = ({
    auth,
    username,
    parentId,
    openReply,
    itemId,
    onSubmit
}) => {
    const [text, setText] = useState("");
    const [readOnly, setReadOnly] = useState(false);

    console.log(openReply);

    const submitComment = () => {
        let comment = {
            commenter: username,
            commentText: text,
            threadId: itemId,
            parentId: parentId
        }
        console.log(comment);
        axios.post("http://localhost:8080/comment/save", comment)
            .then((response) => {
                console.log(response);
                setReadOnly(true);
                onSubmit();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>{
            openReply ? 
            <div>
                <div
                    style={{display: 'flex', paddingLeft: '1rem'}}
                >
                    <TextField
                        sx={{width: '100%'}}
                        id="new-take"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        multiline
                        placeholder="Be the first to comment"
                        variant="filled"
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <div
                                        className="send-button"
                                    >
                                        <IconButton
                                            onClick={submitComment}
                                            edge="end"
                                        >
                                            <Avatar
                                                sx={{ width: 32, height: 32 }}
                                            >
                                                <SendIcon
                                                    color="primary"
                                                />
                                            </Avatar>
                                        </IconButton>
                                    </div>
                                </InputAdornment>
                        }}
                    />
                </div>
            </div> : 
            <></>
        }</div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Take);